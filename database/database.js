const mongoose = require("mongoose");

// Enternal File
// Functions (Connections)
// Make a unique function name
// Export

const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://test:test@cluster0.4anrkbj.mongodb.net/project")
    .then(() => {
      console.log("Database Connected!");
    });
};

// Exporting the function
module.exports = connectDatabase