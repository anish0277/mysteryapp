import {z} from 'zod'
import UserModel from '../../../model/User'
import {usernameValidation}from '../../../schemas/signUpSchema'
import connectDb from '@/lib/dbConnect'

const usernameQuerySchema=z.object({
    username:usernameValidation
})

export async function GET(request:Request){
    await connectDb()
    try{
        const {searchParams}=new URL(request.url)
        const queryParams={
            username:searchParams.get('username')
        }
        const result=usernameQuerySchema.safeParse(queryParams)
        if(!result.success){
            const usernameError=result.error.format().username?._errors||[]
            return Response.json({
                success:false,
                message: usernameError.length > 0 ? usernameError[0] : "Invalid username format"
            },{
                status:400
            })
        }
        const {username}=result.data
        const existingUsername=await UserModel.findOne({
            username,
            isVerified:true
        })
        if(existingUsername){
            return Response.json({
                success:false,
                message:"Username is Already Taken"
            },{
                status:400
            })
        }
        return Response.json({
            success:true,
            message:'username is unique'
        },{
            status:200
        })

    }catch(error){
        console.error("error while checking username-unique",error)
        return Response.json({
            success:false,
            message:"error checking Username"
        },{
            status:500
        })

    }
}
