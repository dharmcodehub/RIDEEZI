const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      try {
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, {
            socketId: socket.id
          });
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (error) {
        console.error(`Error updating socketId for ${userType}:`, error);
      }
    });

    socket.on("update-location-captain", async(data)=>{
      const { userId, location } = data;
      if (!location || !location.ltd  || !location.lng) {
        console.error(`Invalid location data: ${JSON.stringify(location)}`);
        return;
      }
      try {
          const response = await captainModel.findByIdAndUpdate(userId, {
        location: {
          type: "Point",
          coordinates: [location.ltd, location.lng]
        }
          });
          console.log(`Location updated for captain with ID ${userId}`);
          console.log("Captain after location update: ", response);
        }catch (error) {
        console.error(`Error updating location for captain:`, error);
      }
    });

    socket.on("join-room", (data) => {
      const { roomId } = data;
      if (roomId) {
        socket.join(roomId);
        const allRooms = io.sockets.adapter.rooms;
        console.log(`Socket ${socket.id} joined room: ${roomId}`);
        console.log("All rooms:", allRooms);
      } else {
        console.error("Room ID is missing in join-room event.");
      }
    });

    socket.on("payment-done", (data) => {
      const { roomId } = data;
      if (roomId) {
        const roomSockets = io.sockets.adapter.rooms.get(roomId);
        console.log(`Sockets in room ${roomId}:`, roomSockets);
        io.to(roomId).emit("payment-done", data);
      } else {
        console.error("Room ID is missing in payment-done event.");
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    socket.on("error", (err) => {
      console.error(`Socket error: ${err}`);
    });
  });
};

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log("I am here : socketId and messageObjet is :  ", socketId, messageObject);
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data); // Ensure the event name is "new-ride"
  } else {
    console.error("Socket.io is not initialized.");
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
