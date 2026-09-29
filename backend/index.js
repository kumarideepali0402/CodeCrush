const express = require("express")
const dbConnect = require("./src/config/database")
const User = require("./src/models/user")
const validator = require("validator")
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const app = express()
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const {userAuth} = require("./src/middlewares/userAuth")
const authRouter = require("./src/routes/auth")
const profileRouter = require("./src/routes/profile")
const requestRouter = require("./src/routes/request")
const cors = require("cors")








dbConnect().then(
        () => {
            console.log("DB connected successfully")
            app.listen(7777, ()=>{
                console.log("Server connected at port 7777");
            })
        }
        )
        .catch((err) => console.log("Error creating DB", err)
    )

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)




















