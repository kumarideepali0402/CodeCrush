const express = require("express")
const userRouter = express.Router()
const User = require("../models/user")


const { userAuth } = require("../middlewares/userAuth")
const ConnectionRequest  = require("../models/connectionRequest")

userRouter.get("/user/requests/received", userAuth, async(req, res) => {
   try {
         const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "name skills about photoUrl")

        res.json({
            message: "Data fetched successfully!",
            data:connectionRequests
        })
    
   } catch (error) {
    res.status(400).send("ERROR: " + error.message)
    
   }
} )

userRouter.get("/user/connections", userAuth, async(req, res) => {
    try {

        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status:"accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", ["name", "skills", "about", "photoUrl"]).populate("toUserId",["name", "skills", "about", "photoUrl"] )

        const data = connectionRequests.map((m) => (m.fromUserId._id.toString() == loggedInUser._id.toString()) ?m.toUserId: m.fromUserId)
        res.json({data})
        
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})


userRouter.get("/feed", userAuth, async(req, res) => {
   try {
     const loggedInUser = req.user;

     const page = parseInt(req.query.page) || 1;
     let limit = parseInt(req.query.limit) || 10;
     limit = limit > 50? 50: limit;

     const skip = (Math.max(page, 1) - 1) *  limit;

     const connectionRequests = await ConnectionRequest.find({
        $or:[
            {fromUserId: loggedInUser._id},
            {toUserId: loggedInUser._id}
        ]
     }).select("fromUserId toUserId")
     const hideUsers = new Set()
     connectionRequests.forEach((u) =>{
        hideUsers.add(u.fromUserId._id)
        hideUsers.add(u.toUserId._id)

     } )

     const data = await User.find({
        $and:[
           {_id: {"$nin" : Array.from(hideUsers) }},
           {_id: {"$ne" : loggedInUser._id}}
        ]
     }).select("name photoUrl about skills").skip(skip).limit(limit);


     res.status(200).send(data)

    
   } catch (error) {
    res.status(400).json({message: error.message})
    
   }

})


module.exports = userRouter;

