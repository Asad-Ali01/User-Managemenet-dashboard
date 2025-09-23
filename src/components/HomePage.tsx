import { useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
function HomePage() {
  const navigate = useNavigate();
  const isAdmin = useOutletContext<boolean>()
  useEffect(() => {
      if(isAdmin){
        navigate('/dashboard',{replace:true});
      }
  },[])

   if(isAdmin){
   
    return(
      <div className="text-3xl font-bold grid  h-full place-items-center">
        <h1>Hello Admin</h1>
              
      </div>
    )
  }
  return (
    <div className="text-3xl font-bold grid  h-full place-items-center">
    Login to view content
    </div>
  )
}

export default HomePage