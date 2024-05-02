import { Link, useNavigate } from "react-router-dom";
import {useState} from 'react'


const Login = ({ onLogin }) => { 
    const [email, setEmail] = useState("")
    const [salis, setSalis] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3001/login', {
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                salis: salis
            }) 
        })
        //navigate upon successful login
        const sessionData = await response.json();
        if (sessionData.authenticated){
            localStorage.setItem("authenticated", sessionData.authenticated);
            localStorage.setItem("email", sessionData.email);
            onLogin();
            navigate("/comparing")
        }
    }

    return (
        <div>
            <div className="login-container">
                <div className="login-header">
                    <h2>Kirjaudu sisään</h2>
                </div>
                <form onSubmit={handleLogin} className="login-form" id="login-form">
                    <div className="login-form-control">
                        <label>Käyttäjätunnus</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="example@email.com" id="username" required/>
                    </div>
                    <div className="login-form-control">
                        <label>Salasana</label>
                        <input  onChange={(e) => setSalis(e.target.value)} type="password" placeholder="password" id="password" required/>
                    </div>
                    <div className="login-checkbox">
                        <input type="checkbox" id="login-check-check"></input>
                        <label htmlFor ="login-checkbox-check">Muista minut</label>
                    </div>
                    <div className="formButton">
                        <button type="submit">Kirjaudu</button>
                    </div>
                    <hr></hr>
                    <div className="registerButton">    
                        <Link to="/register">
                            <button>Luo tili</button>
                        </Link>
                    </div>
                </form>
            </div>       
        </div>
              
    )   
}

export default Login;