import axios from "axios"
import Signup from "./Signup"

const Login = () => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value
    try {
      await axios.post('http://localhost:3001/api/v1/auth/signin', { email, password })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit}>
      Name:<input type="email" name="email" className="email" ></input><br></br>
      Password:<input type="password" name="password" className="password"></input><br></br>
      <button type="submit" >Submit</button>
    </form>
          <a href={Signup}>Signup</a>
</>
  )
}
export default Login

