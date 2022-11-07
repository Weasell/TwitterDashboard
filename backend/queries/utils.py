from dateutil import parser
from queries.models import Tweet

def sqliteQueryByFilter(sqliteQueryResult, filter):
    """
        Using django SQLite integration to filter the result
        parameters:
            sqliteQueryResult: django QuerySet or None
            filter: map with 4 rules:
                                    {
                                        'keywords': [str1, str2],
                                        'startTime': datetime.datetime(),
                                        'endTime': datetime.datetime(),
                                        'source': integer
                                    }
        return:
            sqliteQueryResult: django QuerySet
    """
    if len(filter['keywords']) > 0:
        for keyword in filter['keywords']:
            if sqliteQueryResult is None:
                sqliteQueryResult = Tweet.objects.filter(text__contains=keyword)
            else:
                sqliteQueryResult = sqliteQueryResult.filter(text__contains=keyword)
    if len(filter['startTime']) > 0:
        if sqliteQueryResult is None:
            sqliteQueryResult = Tweet.objects.filter(time__gte=parser.parse(filter['startTime']))
        else:
            sqliteQueryResult = sqliteQueryResult.filter(time__gte=parser.parse(filter['startTime']))
    if len(filter['endTime']) > 0:
        if sqliteQueryResult is None:
            sqliteQueryResult = Tweet.objects.filter(time__lte=parser.parse(filter['endTime']))
        else:
            sqliteQueryResult = sqliteQueryResult.filter(time__lte=parser.parse(filter['endTime']))
    if filter['source'] != 0:
        if sqliteQueryResult is None:
            sqliteQueryResult = Tweet.objects.filter(source__exact=filter['source'])
        else:
            sqliteQueryResult = sqliteQueryResult.filter(source__exact=filter['source'])
    if sqliteQueryResult is None:
        sqliteQueryResult = Tweet.objects.all()
    return sqliteQueryResult

def dataframeFilter(df, filter):
    """
        Using pandas dataframe to filter the result
        parameters:
            df: dataframe
            filter: map with 4 rules:
                                    {
                                        'keywords': [str1, str2],
                                        'startTime': datetime.datetime(),
                                        'endTime': datetime.datetime(),
                                        'source': integer
                                    }
        return:
            df: dataframe
    """
    if len(filter['keywords']) > 0:
        for keyword in filter['keywords']:
            df = df.loc[df['text'].str.contains(keyword)]
    if len(filter['startTime']) > 0:
        df = df.loc[df['time'] > parser.parse(filter['startTime'])]
    if len(filter['endTime']) > 0:
        df = df.loc[df['time'] > parser.parse(filter['endTime'])]
    if filter['source'] != 0:
        df = df.loc[df['source'] == filter['source']]
    return df