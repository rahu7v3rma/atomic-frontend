// import WebsocketHeartbeatJs from "websocket-heartbeat-js";

// const getWebSocket = (function () {
//   let ws;

//   function createWebSocket(url) {
//     const options = {
//       url: url,
//       pingTimeout: 540000, // every 9 min, 10 min is a limit heartbeat
//       pongTimeout: 60000,
//       reconnectTimeout: 2000,
//       pingMsg: JSON.stringify({ heartbeat: true }),
//     };
//     return new WebsocketHeartbeatJs(options);
//   }

//   // Close previous connection if it exists
//   return {
//     getInstance: function (url) {
//       if (ws) {
//         ws.close();
//       }
//       ws = createWebSocket(url);
//       return ws;
//     },
//   };
// })();

// export default getWebSocket;
