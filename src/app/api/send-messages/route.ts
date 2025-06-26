import connectDb from '@/lib/dbConnect'
import UserModel from '@/model/User'
import { Message } from '@/model/User'

export async function POST(request:Request){
        await connectDb()
        try{
            const {username,content}=await request.json()

            const user=await UserModel.findOne({username})
            if(!user){
                    return Response.json({
                     success: false,
                     message: "User not found"
                    }, {
                       status:404
                    })
            }
            if(!user.isAcceptingMessage){
                 return Response.json({
                     success: false,
                     message: "User not Accepting messages"
                    }, {
                       status:401
                    })
            }
            const newmessage={content,createdAt:new Date()}
            user.messages.push(newmessage as Message)
            await user.save()

            return Response.json({
                success:true,
                message:'message sent successfully'
            },{
                status:200
            })
        }catch(error){
            return Response.json({
            success: false,
            message: "Error Sending message"
        }, {
            status: 500
        })

        }
    
}