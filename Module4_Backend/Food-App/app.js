const express = require("express");
const app = express();

app.use(express.static('public'))
app.use(express.json());

const userRouter = express.Router();
const authRouter = express.Router();

// /api/user/:id
app.use('/api/user', userRouter);
app.use("/api/auth", authRouter);

userRouter
    .get(getUsers)
    // .route("/")
    // .get(getUser)
    // .post(createUser)
    // .patch(updateUser)
    // .delete(deletUser);

userRouter
    .route("/:id")
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser)

authRouter
    .post("/signup", setCreatedAt, signupUser)
    .post("/login", loginUser);

// database 
// let user = [];

// middleware 
function setCreatedAt(req, res, next) {
      // {}
      let body = req.body;
      let length = Object.keys(body).length;
      if (length == 0) {
          return res.status(400).json({
              message: "Can't create user when body is empty"
          })
      }
    req.body.createdAt = new Date().toISOString();
    // return res.json({
    //     text: "Bye bye "
    // })
    next();
}

const userModel = require("./models/userModel");

async function signupUser(req, res)  {
    try {
        let userObj = req.body;
        console.log("UserObj:", req.body);
        let user = await userModel.create(userObj);
        console.log("User: ", user);
        // put database 
        // user.push({
        //     email, name, password
        // })
        res.status(200).json({
            message: "User Created",
            createdUser: user
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

function loginUser(req, res) {

}

// find
async function getUsers(req, res) {
    console.log("Endpoint hit");
    try {
        let users = await userModel.find();
        res.status(200).json({
            "message": "list of all the users",
            users: users
        })
    } catch (err) {
        res.status(500).json({
            error: err.message,
            "message": "can't get users"
        })
    }
    // for sending key value pair
}

// function getUser(req, res) {
//     console.log("Users: ");
//     res.json(user);
// }

// function createUser(req, res) {
//     console.log("Request data : ", req.body);
//     user = req.body;
//     res.status(200).send("Data recieved and user added");
// }

// findBYIdAndUpdate ->
function updateUser(req, res) {
    let obj = req.body;
    for (let key in obj) {
        user[key] = obj[key];
    }
    res.status(200).send("Sucessfully updated");
}

function deleteUser(req, res) {
    user = {}
    res.status(200).send("Sucessfully deleted");
}

function getUserById(req, res) {
    console.log(req.params.id);
    res.status(200).send("Hello from user "+req.params.id);
}


// // mounting in express 
// const router = express.Router();

// // /api/user/:id
// app.use('/api/user', router);

// router
//     .route("/")
//     .get(getUser)
//     .post(createUser)
//     .patch(updateUser)
//     .delete(deletUser);
// router
//     .route("/:id")
//     .get(getUserById);


// app.get("/api/user", getUser);
// // get
// app.post("/api/user", createUser);
// //update
// app.patch("/api/user", updateUser);
// //delete
// app.delete("/api/user", deletUser);
//template routes 
// app.get("api/user/:id", getUserById);

app.listen(8080, function () {
    console.log("Server Started at 8080");
})
