const express = require("express");
// Server: // route  -> request -> response/file 

const app = express();

// to accept json in post request
app.use(express.json());

let user = {};

// Get request at / 
app.get("/", function (req, res) {
    console.log("Hello from Home Page"); // developer console p show hoga
    res.send("<h1>Hello from Backend</h1>"); // as a response jaega to client
})

// Get request at /user
app.get("/user", function (req, res) {
    console.log("Hello from Users Page");
    res.json(user); // send json response
})

// post request at /user
app.post("/user", function (req, res) {
    console.log("Request data : ", req.body);
    user = req.body;
    res.status(200).send("Data recieved and user added "); // send successful response with the msg
})

//update request at /user
app.patch("/user", function (req, res) {
    let obj = req.body;
    for (let key in obj) {
        user[key] = obj[key];
    }
    res.status(200).send("Sucessfully updated");
})

//delete request at /user
app.delete("/user", function (req, res) {
    user = {}
    res.status(200).send("Sucessfully deleted");
})

//template routes for a specific user id
app.get("/user/:id", function (req, res) {
    console.log(req.params.id);
    res.status(200).send("Hello from user "+req.params.id);
})

//localhost:8080 url pe server started
app.listen(8080, function () {
    console.log("Listening on Port 8080");
})
