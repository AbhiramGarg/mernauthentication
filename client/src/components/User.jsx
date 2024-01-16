import { useNavigate } from "react-router-dom"


const User = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <div>
      <div>user</div>
      <button onClick={handleClick}>logout</button>
    </div>
  )
}

export default User