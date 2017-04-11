# winston-istrace

[npm version](https://badge.fury.io/js/winston-istrace.svg)](https://badge.fury.io/js/winston-istrace)
[npm dependencies](https://david-dm.org/toinane/winston-istrace.svg)

```
npm i -S winston-istrace
```

## Configuration

You need to pass host and service's name, the others params are optional.
Others params will be global informations.

- level param : this param from winston allow you to send only level of logs :
by default, it send only error, warn and info logs.

```json
{
  "host": "localhost:6031/log",
  "service": "my service name",
  "level": "debug",
  "message": "my generic message",
  "action": "my global action",
  "scope": "my global scope",
  "details": "if you have some globals objects"
}
```

## Example

```javascript
const logger = require('winston');
const IsTraceLogger = require('winston-istrace');

logger.configure({
  transports: [
    new IsTraceLogger({
      host: "http://requestb.in/1bx09nv1",
      service: "my service name"
    })
  ]
});

logger.debug("Stream initialized");

logger.info("Create new stream", {
  details: {
    name: "MyStream",
    timestamp: new Date()
  }
});

logger.warn("Stream in batch", {
  code: 400
});

logger.error("Error on main stream", {
  code: 300,
  action: "get stream",
  scope: "stream"
});
```
