import connectDb from '../../../lib/dbConnect'
import UserModel from '../../../model/User'

export async function POST(request: Request) {
    await connectDb()
    
    try {
        const { username, verifyCode } = await request.json()
        
        if (!username || !verifyCode) {
            return Response.json({
                success: false,
                message: "Username and verification code are required"
            }, {
                status: 400
            })
        }
        const user = await UserModel.findOne({ username })
        if (!user) {
            return Response.json({
                success: false,
                message: "User does not exist"
            }, {
                status: 400
            })
        }
        if (user.isVerified) {
            return Response.json({
                success: false,
                message: "User is already verified"
            }, {
                status: 400
            })
        }
        if (!user.verifyCode) {
            return Response.json({
                success: false,
                message: "No verification code found for this user"
            }, {
                status: 400
            })
        }
        const isCodeValid = String(user.verifyCode) === String(verifyCode);
        const isCodeNotExpired = user.verifyCodeExpiry ? new Date(user.verifyCodeExpiry) > new Date() : false;
        if (!isCodeValid) {
            return Response.json({
                success: false,
                message: "Invalid verification code"
            }, {
                status: 400
            });
        }
        if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "Verification code has expired. Please request a new one."
            }, {
                status: 400
            });
        }
        user.isVerified = true;
        user.verifyCode = undefined; 
        user.verifyCodeExpiry = undefined; 
        await user.save();

        return Response.json({
            success: true,
            message: "Account verified successfully",
        }, {
            status: 200,
        });
        
    } catch (error) {
        console.error("Error while verifying user:", error)
        return Response.json({
            success: false,
            message: "Error while verifying user"
        }, {
            status: 500
        })
    }
}