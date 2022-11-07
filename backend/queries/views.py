import json, time
import pandas as pd

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .utils import sqliteQueryByFilter, dataframeFilter

setDF = None
setFilter = None

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def setQuery(request):
    """set query API entrypoin"""
    # fetch the global variables
    global setDF, setFilter

    # get the filter from the request body
    filter = json.loads(request.body)

    # fetch the result and time
    sqliteQueryResult = None
    queryStartTime = time.time()
    sqliteQueryResult = sqliteQueryByFilter(sqliteQueryResult, filter)
    queryEndTime = time.time()
    print('set disk filter time: ', queryStartTime, queryEndTime)

    # store (1)set result and (2)filter map to global variable
    setDF = pd.DataFrame(list(sqliteQueryResult.values('text','time','source')))
    setFilter = filter

    # create the return json
    size = sqliteQueryResult.count()
    resultDict = {}
    resultDict['diskTime'] = queryEndTime - queryStartTime
    resultDict['memTime'] = queryEndTime - queryStartTime
    resultDict['first10Result'] = list(sqliteQueryResult.values()[:min(10, size)])
    return JsonResponse(resultDict)
    
def subsetQuery(request):
    """subset query API entrypoint"""
    # fetch the globle variables
    global setDF, setFilter
    
    # get the subset filter from the request body
    subsetFilter = json.loads(request.body)

    # fetch the result from disk and time
    sqliteQueryResult = None
    queryDiskStartTime = time.time()
    sqliteQueryResult = sqliteQueryByFilter(sqliteQueryResult, setFilter)
    sqliteQueryResult = sqliteQueryByFilter(sqliteQueryResult, subsetFilter)
    queryDistEndTime = time.time()
    print('subset disk filter time: ', queryDiskStartTime, queryDistEndTime)

    # fetch the result from memory and time
    queryMemStartTime = time.time()
    subsetdf = dataframeFilter(setDF, subsetFilter)
    queryMemEndTime = time.time()
    print('subset memory filter time: ', queryDiskStartTime, queryDistEndTime)

    # create the return json
    size = sqliteQueryResult.count()
    resultDict = {}
    resultDict['diskTime'] = queryDistEndTime - queryDiskStartTime
    resultDict['memTime'] = queryMemEndTime - queryMemStartTime
    resultDict['first10Result'] = list(sqliteQueryResult.values()[:min(10, size)])
    return JsonResponse(resultDict)
