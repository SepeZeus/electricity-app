import { Link, useNavigate } from "react-router-dom";
import {useState} from 'react'
            
function Register () { 
        const [email, setEmail] = useState("")
        const [salis, setSalis] = useState("")
        const [vahvistus, setVahvistus] = useState("")
        const navigate = useNavigate();

        //send form data to backend and attempt account creation
        const onRegister = async (e) => {
            e.preventDefault()
            const response = await fetch('http://localhost:3001/register', {
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    salis: salis,
                    vahvistus: vahvistus
                }) 
            })
            //navigate upon successful registration
            const registerStatus = await response.json();
            if (registerStatus.success){
                navigate("/login")
            }
        }
        return (
        <div className="ultimate-container">
            <div className="login-container">
                <div className="login-header">
                    <h2>Tilin luominen</h2>
                </div>
                <form onSubmit={onRegister} className="login-form" id="login-form">
                    <div className="login-form-control">
                        <label>Anna sähköpostiosoitteesi</label>
                        <input onChange={e => setEmail(e.target.value)} type="email" placeholder="example@email.com" id="username" required/>
                    </div>
                    <div className="login-form-control">
                        <label>Salasana</label>
                        <input onChange={e => setSalis(e.target.value)} type="password" placeholder="password" id="password" required/>
                    </div>
                    <div className="login-form-control">
                        <label>Salasana uudelleen</label>
                        <input onChange={e => setVahvistus(e.target.value)} type="password" placeholder="password" id="password" required/>
                    </div>
                    <div className="formButton">
                        <button type="submit">Luo tili</button>
                    </div>
                    <div className="registerButton">
                        <Link to="/login">
                            <button>Kirjaudu</button>
                        </Link>
                    </div>
                </form>
            </div>       
        </div>
    )
}

export default Register;