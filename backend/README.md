# Queries API Documentation

## Environment Built-up

- Install `pandas`, `django` on python

  ```shell
  $ pip3 install pandas django nltk
  ```

- Download `test.db` from [test.db - Google 雲端硬碟](https://drive.google.com/file/d/1_hkucDY6Z0nqH9V0PfWkxBR911mAVPHN/view) and place under `backend` directory

  ```shell
  - /TweeterDashboard
  	- /backend
  		- /backend
  		- /queries
  		- test.db <<<< copy to here
  		- db_init.py
  		- manage.py
      - /public
      - /src
      - ...
  ```

- Run the backend service

  ```shell
  $ python manage.py runserver
  ```

- Download Postman agent from here [Postman Agent: For Mac, Windows, & Linux](https://www.postman.com/downloads/postman-agent/) and install

- Go to the Postman collection @[New Collection - OSU AU22 CSE 5242 Twitter Dashboard Backend API (postman.co)](https://osu-cse-5242-team2.postman.co/workspace/OSU-AU22-CSE-5242-Twitter-Dashb~9ee1e8ed-1024-408a-a932-1aa0dc93f3c6/collection/24176168-ba69b131-694f-47e2-bd3f-75c5a6f654f8?ctx=documentation)

- Use the HTTP request I created in the collection to test

## API Entry Points

- `HTTP.GET('/queries/setQuery')`
  - First query should use this API

- `HTTP.GET('/queries/subsetQuery')`
  - The following advanced queries should use this API

## Request Body and Response Body

- Request Body

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

