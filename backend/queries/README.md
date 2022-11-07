# Queries API Documentation

## API Entrypoints

- `HTTP.GET('/queries/setQuery')`
  - First query should use this API

- `HTTP.GET('/queries/subsetQuery')`
  - The following advanced queries should use this API

## Request Body and Response Body

- Reqest Body

```json
{
    "keywords": ["keyword1", "keyword2"],				// array of strings
    "startTime": "Wed Nov 09 2022 21:37:30 GMT-0500",	// javascript time format
    "endTime": "Wed Nov 09 2022 21:37:30 GMT-0500",		// javascript time format
    "source": 1,										// integer, 
}
```

- The following is an unconditional search

```json
{
    "keywords": [],
    "startTime": "",
    "endTime": "",
    "source": 0,
}
```

---

- Response Body

```json
{
    "diskTime": 3.141,	//float
    "memTime": 2.718,	//float
    "first10Result":[
        {
            "text": "hello1",
            "time": "Wed Nov 09 2022 21:37:30 GMT-0500",
            "source": 1
        },
        {
            "text": "hello2",
            "time": "Wed Nov 09 2022 21:37:30 GMT-0500",
            "source": 2
        },
        ...
        {
            "text": "hello10",
            "time": "Wed Nov 09 2022 21:37:30 GMT-0500",
            "source": 10
        },
    ]
}
```

