import { getServerSession } from "next-auth";
import {authOptions} from '@/app/api/auth/[...nextauth]/options'
import connectDb from '@/lib/dbConnect'
import UserModel from '@/model/User'
import { User } from "next-auth";
import mongoose from "mongoose";
import { toast } from "sonner";
import { success } from "zod/v4";

export async function DELETE(request:Request,
  { params }: { params: { messageId: string } }
){
    await connectDb() 
        try{
            const session=await getServerSession(authOptions)
           const user:User=session?.user as User
           if(!session || !session.user){
            return Response.json({
            success: false,
            message: "Unauthenticated User"
        }, {
            status:401
        })}
            const result=await UserModel.updateOne(
                {_id:user._id},
                { $pull: { messages: { _id: new mongoose.Types.ObjectId(params.messageId) } } }
            )
            if(result.modifiedCount==0){
                return Response.json({
                    success:false,
                    message:'Error While Deleting Message'
                },
                {
                    status:404
                }
                )

                
            }
                return Response.json(
                    {
                        success: true,
                        message: "Message deleted successfully",
                        result,
                    },
                    { status: 200 }
                    );
       }catch(error){
        return Response.json({
                    success:false,
                    message:'Error While Deleting Message'
                },
                {
                    status:500
                }
                )
       }

}
