const handleSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);

        // Handle new message event
        socket.on("send_message", (messageData) => {
            console.log("New message received:", messageData);
            // Broadcast the message to all connected clients
            io.emit("receive_message", messageData);
        });

        // Handle message deletion event
        socket.on("delete_message", (data) => {
            console.log("Message deleted:", data);
            // Broadcast the deletion to all connected clients
            io.emit("message_deleted", data);
        });

        // Handle message edit event
        socket.on("edit_message", (data) => {
            console.log("Message edited:", data);
            // Broadcast the edit to all connected clients
            io.emit("message_edited", data);
        });

        // Handle disconnect
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

module.exports = {
    handleSocket,
};