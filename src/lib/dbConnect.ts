import mongoose from "mongoose";

type connectionObj={
     isconnected?:number
}

const connection:connectionObj={}

 const  connectDb=async():Promise<void>=>{
    if(connection.isconnected){
        console.log('Already Connected to the database')
        return
    }
    try{
        const db=await mongoose.connect(process.env.MONGO_URL || '')

        connection.isconnected=db.connections[0].readyState

        console.log("Db connected succssfully")

    }catch(error){
        console.log('Error while Connecting to database',error)
        process.exit(1)

    }
}
export default connectDb




