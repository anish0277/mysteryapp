import { getServerSession } from "next-auth";
import { authOptions } from '../../api/auth/[...nextauth]/options'
import connectDb from '@/lib/dbConnect'
import UserModel from '@/model/User'
import { User } from "next-auth";

export async function POST(request: Request) {
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
        
        const userId = user._id
        const { AcceptingMessage } = await request.json()

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: AcceptingMessage },
            { new: true }
        )

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "Failed to update user"
            }, {
                status: 404
            })
        }
        
        return Response.json({
            success: true,
            message: "User updated successfully",
            isAcceptingMessage: updatedUser.isAcceptingMessage
        })
    } catch (error) {
        console.error("Error updating message acceptance:", error)
        return Response.json({
            success: false,
            message: "Error updating message acceptance"
        }, {
            status: 500
        })
    }
}

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
        
        const userId = user._id
        const findUser = await UserModel.findById(userId)
        
        if (!findUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            })
        }
        
        return Response.json({
            success: true,
            isAcceptingMessage: findUser.isAcceptingMessage
        })
    } catch (error) {
        console.error("Error fetching message acceptance status:", error)
        return Response.json({
            success: false,
            message: "Error fetching message acceptance status"
        }, {
            status: 500
        })
    }
}