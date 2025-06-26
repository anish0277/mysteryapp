import { getServerSession } from "next-auth";
import { authOptions } from '../../api/auth/[...nextauth]/options'
import connectDb from '@/lib/dbConnect'
import UserModel from '@/model/User'
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await connectDb()
    try {
        const session = await getServerSession(authOptions)
        const user: User = session?.user as User
        
        if (!session || !session.user) {
            return Response.json({
                success: false,
                message: "Unauthenticated User"
            }, {
                status: 401
            })
        }
        
        const userId = new mongoose.Types.ObjectId(user._id)
        
        const result = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ])

        if (!result || result.length === 0) {
            return Response.json({
                success: true,
                messages: []
            })
        }

        return Response.json({
            success: true,
            messages: result[0].messages
        })
        
    } catch (error) {
        console.error("Error getting messages:", error)
        return Response.json({
            success: false,
            message: "Error getting messages"
        }, {
            status: 500
        })
    }
}