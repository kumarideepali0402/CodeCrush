const express = require("express")
const userRouter = express.Router()


const { userAuth } = require("../middlewares/userAuth")
const ConnectionRequest  = require("../models/connectionRequest")

userRouter.get("/user/requests/received", userAuth, async(req, res) => {
   try {
         const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "name skills")

        res.json({
            message: "Data fetched successfully!",
            data:connectionRequests
        })
    
   } catch (error) {
    req.statusCode(400).send("ERROR: " + err.message)
    
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
        }).populate("fromUserId", ["name", "skills"]).populate("toUserId",["name", "skills"] )

        const data = connectionRequests.map((m) => (m.fromUserId._id.toString() == loggedInUser._id.toString()) ?m.toUserId: m.fromUserId)
        res.json({data})
        
    } catch (error) {
        res.status(400).send({message: err.message})
    }
})


module.exports = userRouter;

