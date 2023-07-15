import axios from "axios"
const Form = () => {

  const handleSubmit = async (e) => {
    e.preventDefault()
  const username = document.querySelector('.username').value
  const password = document.querySelector('.password').value

  try {
    await axios.post('http://localhost:5000/api/v1/expresstracker', { username,password })   
  } catch (error) {
    console.log(error)
  }
}
  return (


    <form onSubmit={handleSubmit}>
      Name:<input type="text" name="userame" className="username" ></input><br></br>
      Password:<input type="password" name="password" className="password"></input><br></br>
      <button type="submit" >Submit</button>
    </form>
  )
}
export default Form

