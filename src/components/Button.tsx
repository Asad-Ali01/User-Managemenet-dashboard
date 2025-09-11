
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children:React.ReactNode
}
function Button({children,...props}:ButtonProps) {
  return (
    <button {...props} className="">
        {children}
    </button>
  )
}

export default Button