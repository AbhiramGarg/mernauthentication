import { useState } from "react"
import axios from "axios"
import { useNavigate,Link } from "react-router-dom";
import "./auth.css"

const Signup = () => {
    const [data,setData] = useState({
        Firstname:"",
        Lastname:"",
        email:"",
        Password:""
    })
    const [error,setError] = useState("")
    const navigate = useNavigate();
    const handleChange = ({currentTarget:input}) => {
        setData({...data,[input.name]:input.value})
    }
    const handleSubmit = async() => {
        try {
            const url = "http://localhost:8080/user";
            const {data:res} = await axios.post(url,data);
            navigate("/login")
            console.log(res.message)
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
            <h1>Signup</h1>
            <div className="input_container">
                <input className="input" type="email" placeholder="email"
                    value={data.email}
                    name="email"
                    required
                    onChange={handleChange}
                
                />
            </div>
            <div className="input_container">
                <input className="input" type="text" placeholder="First name"
                    value={data.Firstname}
                    name="Firstname"
                    required
                    onChange={handleChange}
                
                />
            </div>
            <div className="input_container">
                <input className="input" type="text" placeholder="Last name"
                    value={data.Lastname}
                    name="Lastname"
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
            <button  onClick={handleSubmit} className="btn">Signup</button>
            
            <div className="change">
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </div>
        </div>

    </div>
  )
}

export default Signup