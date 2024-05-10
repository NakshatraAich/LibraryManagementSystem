const express = require("express");
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

// initialising express
const app = express();

const scannerRoute = require("./routes/Scanner");
app.use(express.json());
app.use(cors());
app.use("/books", scannerRoute);

// connect to db
mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log("Connected to DB")
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at PORT ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(error)
    })


