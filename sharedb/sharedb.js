var Sharedb = require('sharedb');
var WebSocket = require('ws');
var WebSocketJsonStream = require('websocket-json-stream');



module.exports.initialize = function (server) {
    var share = new Sharedb({

    });

    // Connect any incoming WebSocket connection to ShareDB
    var wss = new WebSocket.Server({server: server});
    wss.on('connection', function(ws, req) {
        var stream = new WebSocketJsonStream(ws);
        //var id = ws.upgradeReq.headers['sec-websocket-key'];
        //console.log("websocket id : "  + id);
        ws.on('message',function (data) {
            var obj = JSON.parse(data);
        });
        ws.on('close',function () {
            console.log("client : " + id + " is disconnected");
        });
        share.listen(stream);
    });


    return share ;
}

module.exports.createDoc = function (backend) {
    var connection = backend.connect();
    var doc = connection.get('examples', 'textarea');
    doc.fetch(function(err) {
        if (err) throw err;
        if (doc.type === null) {
            doc.create('');
            return;
        }
        //callback();
    });
}