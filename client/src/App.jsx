import { Login,Signup,User } from "./components"
import { Route, Routes,  BrowserRouter } from "react-router-dom"
const App = () => {

  return (
   <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
   
   </BrowserRouter>
  )
}

export default App