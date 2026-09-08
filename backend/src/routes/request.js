const express = require("express")
const requestRouter = express.Router()
const { userAuth } = require("../middlewares/userAuth")
const User = require("../models/user")
const ConnectionRequest = require("../models/connectionRequest")
const {acceptedConnectionStatus} = require("../../utils/validation")



requestRouter.post('/request/:status/:id', userAuth,async(req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.id;
        const status = req.params.status;

        acceptedConnectionStatus(status);

        const destinationUser = await User.findById(toUserId);
        if(!destinationUser) {
            return res.status(404).json({
                msg: "Destination User not found"
            })
        }

        const connectionAlreadyExists = await ConnectionRequest.findOne({
            $or : [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })

        if (connectionAlreadyExists) {
            return res.status(403).json({
                msg: "Connection already exists"
            })
        }
        
        const newConnection = new ConnectionRequest({fromUserId, toUserId, status});

        await newConnection.save()

        res.status(200).json({
            msg: `${req.user.name} sent ${status}${destinationUser.name}`,
            connection: newConnection
        })

       

        
    } catch (error) {
          res.status(400).json({
            msg: error.message,
            
        })   
        
    }

})

requestRouter.post('/request/review/:status/:requestId', userAuth, async(req, res) => {
        try {
            const {requestId, status} = req.params;
            const isValidStatus = ["accepted", "rejected"].includes(status);
            if(!isValidStatus){
                return res.status(400).send("Invalid status")
            }
            const connectionExists = await ConnectionRequest.findOne({
                _id:requestId,
                toUserId:req.user.id,
                status:"interested"

            })

           

            if (!connectionExists) {
                return req.send(400).send("Connection doesnt exist")
            }

            connectionExists.status = status
             await connectionExists.save()
            res.status(200).json({
                msg:`User status changed to ${status} successfully!`,
                connection:connectionExists
            })

            
        } catch (error) {
                res.status(400).json({
                msg: error.message,
                
            })   
            
        }


})

module.exports = requestRouter