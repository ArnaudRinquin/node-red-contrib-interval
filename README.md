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

## Testing flow

You can import the following flow and use it to test and experiment with the node.

```json
[{"id":"3c4d92e1.2b913e","type":"interval","z":"1e902005.2bfcf","name":"interval","interval":"3","onstart":false,"do_enable":false,"msg":"ping","showstatus":true,"unit":"seconds","statusformat":"YYYY-MM-D HH:mm:ss","x":620,"y":420,"wires":[["b13a469a.cd0a18"]]},{"id":"b13a469a.cd0a18","type":"function","z":"1e902005.2bfcf","name":"ModifyOutput","func":"\nvar mssInitial = flow.get(\"dbgtimer\");\nvar mss = Date.now() / 1000.0;\n\nmsg.payload = mss - mssInitial;\n\nreturn msg;","outputs":1,"noerr":0,"x":890,"y":540,"wires":[["e9501edb.945e9"]]},{"id":"253f6afd.115846","type":"inject","z":"1e902005.2bfcf","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":true,"onceDelay":0.1,"x":270,"y":340,"wires":[["9f75b47a.c24c08"]]},{"id":"9f75b47a.c24c08","type":"function","z":"1e902005.2bfcf","name":"InitialSeconds","func":"msg.payload = msg.payload / 1000.0;\nreturn msg;","outputs":1,"noerr":0,"x":380,"y":280,"wires":[["1856674b.d09889"]]},{"id":"1856674b.d09889","type":"change","z":"1e902005.2bfcf","name":"SetFlowInitial","rules":[{"t":"set","p":"dbgtimer","pt":"flow","to":"payload","tot":"msg"},{"t":"set","p":"payload","pt":"msg","to":"enabled","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":450,"y":220,"wires":[["3c4d92e1.2b913e"]]},{"id":"e9501edb.945e9","type":"debug","z":"1e902005.2bfcf","name":"FireTime","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":900,"y":660,"wires":[]},{"id":"d02524b4.f14068","type":"change","z":"1e902005.2bfcf","name":"_18s","rules":[{"t":"set","p":"payload","pt":"msg","to":"interval","tot":"str"},{"t":"set","p":"interval_value","pt":"msg","to":"18","tot":"str"},{"t":"set","p":"interval_unit","pt":"msg","to":"seconds","tot":"str"},{"t":"set","p":"interval_activeInstantly","pt":"msg","to":"false","tot":"bool"},{"t":"set","p":"interval_fireInstantly","pt":"msg","to":"false","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":370,"y":500,"wires":[["3c4d92e1.2b913e"]]},{"id":"10104ccc.afcce3","type":"inject","z":"1e902005.2bfcf","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":180,"y":540,"wires":[["d02524b4.f14068"]]},{"id":"50196a4a.00a204","type":"inject","z":"1e902005.2bfcf","name":"stahp","topic":"","payload":"disabled","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":230,"y":680,"wires":[["3c4d92e1.2b913e"]]},{"id":"50497b91.4d1584","type":"inject","z":"1e902005.2bfcf","name":"power","topic":"","payload":"enabled","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":230,"y":760,"wires":[["3c4d92e1.2b913e"]]},{"id":"969bcc2a.8f903","type":"change","z":"1e902005.2bfcf","name":"override_1.2s_insta","rules":[{"t":"set","p":"payload","pt":"msg","to":"interval","tot":"str"},{"t":"set","p":"interval_value","pt":"msg","to":"1150","tot":"str"},{"t":"set","p":"interval_unit","pt":"msg","to":"ms","tot":"str"},{"t":"set","p":"interval_activeInstantly","pt":"msg","to":"true","tot":"bool"},{"t":"set","p":"interval_fireInstantly","pt":"msg","to":"false","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":390,"y":560,"wires":[["3c4d92e1.2b913e"]]},{"id":"c3f5f5db.e912f8","type":"inject","z":"1e902005.2bfcf","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":180,"y":620,"wires":[["969bcc2a.8f903"]]},{"id":"2e5d8028.72c97","type":"change","z":"1e902005.2bfcf","name":"FIRE_set_3s","rules":[{"t":"set","p":"payload","pt":"msg","to":"interval","tot":"str"},{"t":"set","p":"interval_value","pt":"msg","to":"3","tot":"str"},{"t":"set","p":"interval_unit","pt":"msg","to":"s","tot":"str"},{"t":"set","p":"interval_activeInstantly","pt":"msg","to":"true","tot":"bool"},{"t":"set","p":"interval_fireInstantly","pt":"msg","to":"true","tot":"bool"}],"action":"","property":"","from":"","to":"","reg":false,"x":390,"y":860,"wires":[["3c4d92e1.2b913e"]]},{"id":"4cd99549.3c5adc","type":"inject","z":"1e902005.2bfcf","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":180,"y":900,"wires":[["2e5d8028.72c97"]]}]
```