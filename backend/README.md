# Queries API Documentation

## Environment Built-up

- Install `pandas`, `django` on python

  ```shell
  $ pip3 install pandas django
  ```

- Download Yi-Tang's data and copy the `data` folder under the `query` folder

  ```shell
  - /TweeterDashboard
  	- /backend
  		- /backend
  		- /queries
  		- /data    					<<<< copy to here
  			- AvengersEndgame.csv
  			- GameofThronesS8.csv
  			- squidgames.csv
  		- db_init.py
  		- manage.py
      - /public
      - /src
      - ...
  ```

- Build the sqlite3

  ```shell
  $ python manager.py migrate
  $ python manager.py makemigrations queries
  $ python db_init.py
  ```

- Run the backend service

  ```shell
  $ python manager.py runserver
  ```

- Download Postman agent from here [Postman Agent: For Mac, Windows, & Linux](https://www.postman.com/downloads/postman-agent/) and install

- Go to the Postman collection in here [New Collection - OSU AU22 CSE 5242 Twitter Dashboard Backend API (postman.co)](https://osu-cse-5242-team2.postman.co/workspace/OSU-AU22-CSE-5242-Twitter-Dashb~9ee1e8ed-1024-408a-a932-1aa0dc93f3c6/collection/24176168-ba69b131-694f-47e2-bd3f-75c5a6f654f8?ctx=documentation)

- Use the HTTP request I create in the collection to test

## API Entry Points

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

