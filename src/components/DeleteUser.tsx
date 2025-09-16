import { useState } from "react"
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import Input from "antd/es/input/Input";
import { Button } from "antd";
function DeleteUser() {
    const queryClient = useQueryClient();
      const [Id,setID] = useState<string>("")
    const Mutation = useMutation({
        mutationFn:async (id : string) => {
           const existingUsers = await axios
           .get(`http://localhost:3000/users/${id}`)
           .then(res => res.data)
           .catch(() => null)

           
           if(existingUsers){
               await axios.delete(`http://localhost:3000/users/${id}`)
           }else{
            throw new Error(`User with id ${id} does not exist.`)
            
           }
        },
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:['users']})
            setID("")
        }
        
    })
  
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Mutation.mutate(Id)
setID("")
    }
  return (
    <div >
        <form className="grid justify-center items-center" onSubmit={handleSubmit}>
          <div className="flex gap-2">

        <Input type="text" className="dark:!bg-gray-700 dark:placeholder-gray-600 dark:!text-white" name="id" value={Id} required onChange={(e) => setID(e.target.value)}   placeholder="Enter id" />
        <Button type="default"  htmlType="submit" className="dark:!bg-gray-700" loading={Mutation.isPending}>{Mutation.isPending ? "Deleting..." : "Delete"}</Button>
          </div>
         
        {Mutation.isError && <p >{Mutation.error?.message}</p>}
        {Mutation.isSuccess && <p >User deleted successfully</p>}
        </form>
    </div>
  )
}

export default DeleteUser