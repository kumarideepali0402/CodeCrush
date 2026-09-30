const express = require("express")
const {userAuth } = require("../middlewares/userAuth")
const {validateIsEditable}= require("../../utils/validation")
const User = require("../models/user")
const bcrypt = require("bcrypt")

const profileRouter = express.Router()


profileRouter.get('/profile/view', userAuth,async(req, res) => {
    try {
        const user = req.user;
        res.send(user)
           
    } catch (error) {
        res.status(400).json({
            msg: error.message,
            
        })  
        
    }    
})

profileRouter.patch('/profile/edit/:userId', userAuth, async(req, res)=> {
    try {

        validateIsEditable(req);
        const { userId } = req.params;

        const user = await User.findOne({_id: userId});
        if(!user) {
            return res.status(404).send("User doesnt exist")
        }
        Object.keys(req.body).forEach((k)=>(user[k] = req.body[k]))
        await user.save();


        res.status(200).json({
                    msg: "User updated successfully!",
                    user: user
                });        
    } catch (error) {
        res.status(400).json({
            msg: error.message,
            
        })  
        
    }
})

profileRouter.patch('/profile/edit/:userId/password', userAuth, async(req, res)=> {
    try {

        const { userId } = req.params
        const user = await User.findOne({_id:userId})
         if(!user) {
            return res.status(404).send("User doesnt exist")
        }
        
        const {oldPassword, newPassword} = req.body;
        const compareOldPassword = await bcrypt.compare(oldPassword, user.password);
        if (!compareOldPassword) {
           return  res.status(403).send("Wrong password")

        }
        const encrypedPassword = await bcrypt.hash(newPassword,10);
        user.password = encrypedPassword;
        user.save()

        res.status(200).json({
            msg: "Password saved successfully",
            user

        })



        
    } catch (error) {
        res.status(400).json({
            msg: error.message,
            
        })  
        
    }
})

module.exports = profileRouter