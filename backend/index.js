const express = require("express")
const dbConnect = require("./src/config/database")
const User = require("./src/models/user")
const validator = require("validator")
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const app = express()
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const {userAuth} = require("./src/middlewares/auth")




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

app.post('/signup', async (req, res)=>{
    try {
        validateSignUpData(req)
        const { name, email, password } = req.body;
        const emailExists = await User.findOne({email:email});
        if(emailExists){
            return res.status(403).json({
                msg: "Email already exists, try signing in"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()
        res.status(201).json({
            msg: "User created successfully!",
            user: user
        })







        
    } catch (error) {
        res.status(400).json({
            msg : "Error creating user",
            error: error.message
        })
        
    }
    

})


app.post('/signin', async(req, res) => {
    try {
       
        const {email,password} = req.body;
        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).json({
                msg: "Invalid Credentials"
            })
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(404).send({
                msg: "Invalid Credentials"

            })
        }
        //create token
        const token = user.getJWT()
        console.log(token);
        
        res.cookie("token", token, {expires: new Date(Date.now() + 7*24*3600*1000)})

        res.status(200).json({
            msg: "User logged in successfully",
            user
        })
        
        
    } catch (error) {
        res.status(400).json({
            msg: error.message,
            error
        })   
    }

})


app.get('/profile', userAuth,async(req, res) => {


    try {
        const user = req.user;
        res.send(user)
       
        

        
        




        
    } catch (error) {
        res.status(400).json({
            msg: error.message,
            error
        })  
        
    }
    

    
})


app.post('/sendConnectionRequest', userAuth,async(req, res) => {
    try {
        const user = req.user;

        res.send("request sent by user" + user._id)

        
    } catch (error) {
          res.status(400).json({
            msg: error.message,
            
        })   
        
    }

})











