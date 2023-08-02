const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport=require("passport");
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // You can choose any port you prefer

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to MongoDB cluster
const MONGODB_URI = "mongodb+srv://prj452:prj452@cluster0.epazaa3.mongodb.net/?retryWrites=true&w=majority";

// Corrected code: Add () at the end to call the async function
(async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connection Succeeded.');
  } catch (err) {
    console.log('Error in DB connection: ' + err);
  }
})();

const connection = mongoose.connection;
connection.on('open', () => {
  console.log('MongoDB database connection established successfully');
});
connection.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

const {userRouter}=require("./routes/user.route.js");
const {homeRouter}=require("./routes/home.route.js");
app.use('/api/',userRouter);
app.use('/api/',homeRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});