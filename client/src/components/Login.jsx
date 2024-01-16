import "./auth.css"
import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
const Login = () => {
    const [data,setData] = useState({
        email:"",
        Password:""
    })
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const handleChange = ({currentTarget:input}) => {
        setData({...data,[input.name]:input.value})
    }
    const handleSubmit = async() => {
        try {
            const url = "http://localhost:8080/auth";
            const {data:res} = await axios.post(url,data);
            localStorage.setItem("token",res.data);
            console.log(localStorage)
            navigate("/user")
        } catch (error) {
            if(error.response && 
               error.response.status>=400 &&
               error.response.status<=500
            ){
                setError(error.response.data.message)
            }
        }
        
    }
  return (
    <div className="page">
        <div className="content"></div>
        <div className="login_container">
            <h1>Login</h1>
            <div className="input_container">
                <input className="input" type="email" placeholder="email"
                    value={data.email}
                    name="email"
                    required
                    onChange={handleChange}
                
                />
            </div>
            <div className="input_container">
                <input className="input" type="password" placeholder="password"
                    value={data.Password}
                    name="Password"
                    required
                    onChange={handleChange}
                
                />
            </div>
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" onClick={handleSubmit} className="btn">Login</button>
            
            <div className="change">
                <span>Dont have  an account? <Link to="/signup">Signup</Link></span>
            </div>
        </div>

    </div>
  )
}

export default Login