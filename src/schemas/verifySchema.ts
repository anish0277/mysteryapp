import { verify } from 'crypto'
import {z} from 'zod'

export const  verifySchema={
    code:z.string().min(6,'Verification code must be 6 digits')
}
