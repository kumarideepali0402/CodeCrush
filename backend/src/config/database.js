const mongoose = require("mongoose")


 async function dbConnect() {
    await mongoose.connect("mongodb+srv://deepalikumari62004_db_user:ssPqP2v0nGJDtPAa@cluster0.1uumpwy.mongodb.net/devTinder")

}

module.exports = dbConnect



