const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { connectDB } = require('../utils/index.utils') 
const app = express();
const router = require('../routers/index.router')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router)
connectDB(process.env.DB_URI).then(()=> {
    app.listen(process.env.PORT, ()=> {
        console.log("Server is listening...")
    })
}).catch((err) => {
    console.log("error connecting database!")
})