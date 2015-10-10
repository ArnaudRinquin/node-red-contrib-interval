# node-red-contrib-interval

A simple [node-red](http://nodered.org/) node that sends a message at regular intervals.

## Options

`interval`: the duration between calls

`unit`: the duration unit

`name`: simply rename your node

`msg`: the text to be sent as payload

`onstart`: Wether or not to send a message on start

`showstatus`: show the last and next trigger times

`statusformat`: A [`momentjs` date format](http://momentjs.com/docs/#/displaying/format/) used to display status

## Message

```json
{
  "payload": "<config.msg>"
}
```
