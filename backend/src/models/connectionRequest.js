const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:"User"

    },
    status: {
        type: "String",
        enum:{ 
            values: ["accepted", "rejected", "interested", "uninterested"],
            message: '{VALUE} is invalid'
        },
        required: true
    }
},{
    timestamps: true
})

connectionRequestSchema.index({fromUserId : 1, toUserId : 1})

connectionRequestSchema.pre("save", function() {
    if(this.fromUserId.equals(this.toUserId)) throw new Error("Can't send request to yourself");
    

})


module.exports =mongoose.model("ConnectionRequest", connectionRequestSchema)


