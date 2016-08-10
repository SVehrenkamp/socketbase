import url from 'url';

export default (wss) => {
  //Web Socket Server
  wss.on('connection', (ws) => {
    let location = url.parse(ws.upgradeReq.url, true);

    ws.on('message', (message) => {
      message = JSON.parse(message);
      //example of how we could respond to certain types of messages
      switch(true) {
        case message.type === "init":
          var payload = JSON.stringify({type: "chat", user: "admin", msg: "Welcome to socket chat!"});
          ws.send(payload);
          break;
        case message.type === "chat":
          var payload = JSON.stringify({type: "chat", user: "admin", msg: "How are you?"});
          ws.send(payload);
          break;
      }
    });

  });
}
