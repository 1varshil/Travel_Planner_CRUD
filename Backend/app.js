const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");
const body_parser = require("body-parser");
const userController = require('./controllers/userController');

app.use(cors());    
app.use(body_parser.json())
app.use(express.urlencoded({extended:false}));

app.post('/add',userController.addData)

app.get("/data",userController.getData);

app.put("/data/:id",userController.updateData)

app.delete("/data/:id",userController.deleteData)

app.get("/data/:id",userController.getDataById)
app.listen(5000, () => {
    console.log("server is running at 5000 ");
});
