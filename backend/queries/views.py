import json, time
import sqlite3
import pandas as pd

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .utils import sqliteQueryByFilter, buildMemoryDB

setFilter = None
conn_memoryDB = None

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def setQuery(request):
    """set query API entrypoin"""
    # fetch the global variables
    global setFilter, conn_memoryDB

    # get the filter from the request body
    filter = json.loads(request.body)

    # fetch the result and time
    queryStartTime = time.time()
    conn = sqlite3.connect('test.db')
    sqliteQueryResult = sqliteQueryByFilter(conn, [filter])
    conn.close()
    queryEndTime = time.time()

    # build in-memory database
    if conn_memoryDB is not None:
        conn_memoryDB.close()
    conn_memoryDB = sqlite3.connect(":memory:")
    buildMemoryDB(conn_memoryDB, sqliteQueryResult)
    setFilter = filter

    # create the return json
    size = sqliteQueryResult.shape[0]
    resultDict = {}
    resultDict['diskTime'] = queryEndTime - queryStartTime
    resultDict['memTime'] = queryEndTime - queryStartTime
    resultDict['first10Result'] = sqliteQueryResult[:min(10, size)].to_dict('records')
    return JsonResponse(resultDict)
    
def subsetQuery(request):
    """subset query API entrypoint"""
    # fetch the globle variables
    global setFilter, conn_memoryDB
    
    # get the subset filter from the request body
    subsetFilter = json.loads(request.body)

    # fetch the result from disk and time
    queryDiskStartTime = time.time()
    conn = sqlite3.connect('test.db')
    sqliteQueryResult = sqliteQueryByFilter(conn, [setFilter, subsetFilter])
    conn.close()
    queryDistEndTime = time.time()

    # fetch the result from memory and time
    queryMemStartTime = time.time()
    subsetdf = sqliteQueryByFilter(conn_memoryDB, [subsetFilter])
    queryMemEndTime = time.time()

    # create the return json
    size = sqliteQueryResult.shape[0]
    resultDict = {}
    resultDict['diskTime'] = queryDistEndTime - queryDiskStartTime
    resultDict['memTime'] = queryMemEndTime - queryMemStartTime
    resultDict['first10Result'] = sqliteQueryResult[:min(10, size)].to_dict('records')
    return JsonResponse(resultDict)
