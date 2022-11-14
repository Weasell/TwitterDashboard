from dateutil import parser
from queries.models import Tweet
import sqlite3
import pandas as pd

def sqliteQueryByFilter(conn, filters):
    """
        Using django SQLite integration to filter the result
        parameters:
            sqliteQueryResult: django QuerySet or None
            filter: list of maps with 4 rules:
                                    {
                                        'keywords': [str1, str2],
                                        'startTime': datetime.datetime(),
                                        'endTime': datetime.datetime(),
                                        'source': integer
                                    }
        return:
            pandas dataframe
    """
    whereClauses = []
    for filter in filters:
        if len(filter['keywords']) > 0:
            for keyword in filter['keywords']:
                whereClauses.append("text LIKE \'%%%s%%\'"%(keyword))
        if len(filter['startTime']) > 0:
            whereClauses.append("time >= \'%s\'"%(filter['startTime']))
        if len(filter['endTime']) > 0:
            whereClauses.append("time <= \'%s\'"%(filter['endTime']))
        if filter['source'] != 0:
            whereClauses.append("source = \'%d\'"%(filter['source']))
    sqlCommand = 'SELECT * FROM twitter_dataset'
    if len(whereClauses) > 0:
        whereClause = " AND ".join(whereClauses)
        sqlCommand += ' WHERE ' + whereClause + ';'
    return pd.read_sql(sqlCommand, conn)


def buildMemoryDB(conn_memoryDB, sqliteQueryResult):
    sqliteQueryResult.to_sql('twitter_dataset', conn_memoryDB, if_exists='replace', index=False)