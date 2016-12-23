const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path')
//self files import
const drivesRoutes = require("./routes/drives");
const userRoutes = require("./routes/users");

require("dotenv").config();

const app = express();

//middleware
app.use(cors());
app.use(express.json()); //parse json

app.use("/drives", drivesRoutes);
app.use("/users", userRoutes);

const uri = process.env.DB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB Atlas Connected");
});


//serve for heroku
if(process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
