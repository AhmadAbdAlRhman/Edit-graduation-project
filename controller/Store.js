const WebSocketServer = require("ws");
const Notifications = require("../Models/notifications");
const customer = require("../Models/customer");
const wss = new WebSocketServer({ noServer: true });
const clients = new Map();
wss.on("connection", (ws, req) => {
  const userId = req.url.split("?userId=")[1];
  //    req.cookies.userId;
  if (userId) {
    ws.on("message", (message) => {
      console.log(`Received message : ${message}`);
    });
    ws.on("close", () => {
      clients.delete(userId);
    });
  } else {
    ws.close();
  }
});
module.exports.StoreNotifications = async (req, res, next) => {
  const StoreId = req.params;
  await Notifications.findAll({ where: { StoreId } })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      next(error);
    });
};
const SetNotification = async (
  userId,
  StoreId,
  customer_first,
  customer_second,
  product,
  address,
  phone
) => {
  await Notifications.create({
    StoreId,
    customer_first,
    customer_second,
    product,
    address,
    phone,
  }).then((result) => {
    const client = clients.get(userId);
    if(client && client.readyState === WebSocket.OPEN){
        client.send(JSON.stringify(result));
    }
    return result;
  });
};
