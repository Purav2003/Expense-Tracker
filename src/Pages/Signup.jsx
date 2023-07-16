import axios from "axios"
const Signup = () => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = document.querySelector('.email').value
    const password = document.querySelector('.password').value
    const name = document.querySelector('.name').value
    const phone = document.querySelector('.mobile').value
    const repassword = document.querySelector('.repassword').value
    const phonearray = Array.from(phone)
    repassword===password && phonearray.length===10?<>
    try {
      await axios.post('http://localhost:5000/api/v1/auth/signup', { name, email, password ,phone})        
    } catch (error) {
      
    }</>:<div>
      <h1 style={{background:'yellow',textAlign:'center'}}>Password to sarkho nakh be</h1>    
        {document.querySelector('.repassword').value=''}
    
    </div>
  }
  return (
    <form onSubmit={handleSubmit}>
      Name:<input type="name" name="name" className="name" required></input><br></br>
      Email:<input type="email" name="email" className="email" required></input><br></br>
      Phone:<input type="number" name="mobile" className="mobile" required></input><br></br>
      Password:<input type="password" name="password" className="password" required></input><br></br>
      Retype-Password:<input type="password" name="repassword" className="repassword font-bold" required></input><br></br>
      <button type="submit">Submit</button>
    </form>
  )
}
export default Signup