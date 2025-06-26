import connectDb from '../../../lib/dbConnect'
import UserModel from '../../../model/User'
import bcrypt from 'bcryptjs'
import sendVerification from '../../../helpers/verificationEmail'

export async function POST(request: Request) {
    await connectDb()
    try {
        const { username, email, password } = await request.json()
        
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })
        
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "User Already Exists"
            }, { status: 400 }) 
        }
        
        const existingUserByemail = await UserModel.findOne({ email })
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        if (existingUserByemail) {
            if (existingUserByemail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User Already Exists"
                }, { status: 400 }) 
            } else {
                const gensalt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, gensalt)
                existingUserByemail.username = username
                existingUserByemail.password = hashedPassword
                existingUserByemail.verifyCode = verifyCode
                existingUserByemail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByemail.save()
            }
        } else {
            const gensalt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, gensalt)
            const verifyCodeExpiry = new Date()
            verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1)
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save()
        }
        
        
        console.log('Attempting to send verification email to:', email)
        const emailResponse = await sendVerification(
            email,    
            username,
            verifyCode
        )
        
        console.log('Email response:', emailResponse)
        
        if (!emailResponse.success) {
            console.error('Email sending failed:', emailResponse.message)
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 })
        }
        
        return Response.json({
            success: true,
            message: "User Created Successfully. Please Verify Your email"
        }, {
            status: 201
        })
        
    } catch (error) {
        console.error("Error while registering User", error)
        return Response.json({
            success: false,
            message: "Error while registering User"
        }, {
            status: 500
        })
    }
}