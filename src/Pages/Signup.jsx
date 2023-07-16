import axios from "axios"
const Signup = () => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value
    const name = document.querySelector('.name').value
    const phone = document.querySelector('.phone').value
    const repassword = document.querySelector('.repassword').value

    repassword===password?<>
    try {
      await axios.post('http://localhost:5000/api/v1/auth/signup', { name, email, password ,phone})        
    } catch (error) {
      console.log(error)
    }</>:<><h1>Password to sarkho nakh be</h1>
    {document.querySelector('.email').value=''}
        {document.querySelector('.password').value=''}
        {document.querySelector('.name').value=''        }
        {document.querySelector('.phone').value}
        {document.querySelector('.repassword').value}
    
    </>
  }
  return (
    <form onSubmit={handleSubmit}>
      Name:<input type="name" name="name" className="name" ></input><br></br>
      Email:<input type="email" name="email" className="email" ></input><br></br>
      Phone:<input type="number" name="mobile" className="mobile" ></input><br></br>
      Password:<input type="password" name="password" className="password"></input><br></br>
      Retype-Password:<input type="password" name="repassword" className="repassword"></input><br></br>
      <button type="submit" >Submit</button>
    </form>
  )
}
export default Signup

