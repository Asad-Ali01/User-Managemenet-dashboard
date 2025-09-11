import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
const fetchUser = async (id:string) => {
    const res = await axios.get(`http://localhost:3000/users/${id}`)        
    return res.data
}
function UserDetails(id?:string) {
    
  return(
    useQuery({
      queryKey:["user",id],
      queryFn: () => fetchUser(id!),
      enabled:!!id
    })
  ) 
}

export default UserDetails