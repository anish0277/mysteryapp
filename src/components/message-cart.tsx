import { Button } from "@/components/ui/button"
import{
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Trash2 } from "lucide-react"
import {Message} from '@/model/User'
import axios from "axios"
import { toast } from "sonner"

type messageCardsProp={
    message:Message,
    onMessageDelete:(messageId:string)=>void
}

export default function   CardDemo({message,onMessageDelete}:messageCardsProp) {
  const handleDelete = async() => {
    
    try{
        const result=await axios.delete(`/api/delete-message/${message._id}`)
        toast.success('Deleted Successfully')
        onMessageDelete(message._id.toString());
    }
    catch(error){
        toast.error('Error While Deleting')
    }

  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>

        </CardTitle>
        <CardDescription>

        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
      </CardContent>
      <CardFooter className="flex justify-between">
            <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
       
      </CardFooter>
    </Card>
  )
}