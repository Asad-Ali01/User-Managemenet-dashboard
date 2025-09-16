import { useState,useEffect } from "react"

function DarkThemeBtn() {

  const [isDark,setIsDark] = useState(
    localStorage.getItem("theme") === "dark" ? true : false
  )
console.log(isDark);
//getting isDark from localStorage


// setting isDark in localstorage
 useEffect(() => {
  if(isDark){
    document.querySelector("html")?.classList.add("dark")
    localStorage.setItem("theme","dark")
  }else{
    document.querySelector("html")?.classList.remove("dark")

    localStorage.setItem("theme","light")
  }
 },[isDark])
  return (
    <button 
    onClick={() => isDark ? setIsDark(false) : setIsDark(true)}
    className={`rounded-full ${isDark ?  "h-5 w-9 rounded bg-gray-700" : "bg-white h-5 w-9 rounded"} `}
    >
        <div className={`transition-all  ${isDark ? "h-4 w-4 translate-x-5 bg-white rounded-full" : "h-4 w-4 bg-black  rounded-full"}`}></div>
    </button>
    
  )
}
export default DarkThemeBtn