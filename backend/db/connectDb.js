import mongoose from "mongoose"


const connect = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to mongoDB", conn.connection.host)
    } catch (error) {
        console.log("not connected", error)
        process.exit(1);
    }
}

export default connect;