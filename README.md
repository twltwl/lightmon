# Lightmon
## Lighthouse monitor 
Monitor your projects lighthouse score

## Usage

### Setup

#### Run mamnually
```
set URL environment variable
run npm start
note the outputted ID, set ID={your-id} as environemnt var on next launch to keep history
```

#### Run in docker
```
docker build -t lightmon .
docker run -e "URL=https://google.com" -e "ID={my-id} -t lightmon"
```

#### With docker-compose
```
set URL and ID values in docker-compose.yml
docker-compose build && docker-compose up
```

### When running

#### Trigger a new test
`curl {host}:4711`

#### View results
`Open up {host}:4711/results in a browser`