import { Link } from "react-router-dom";
import {useState} from 'react'
            
function Profile () { 
        const [kWh, setkWh] = useState(0.0)
        const [email, _] = useState(localStorage.getItem("email")) || ""

        //send form data to backend and attempt account creation
        const onProfile = async (e) => {
            e.preventDefault()
            const response = await fetch('http://localhost:3001/Profile', {
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    kWh: kWh,
                    email: email,
                }) 
            })

            if (response.ok){
                console.log("Saved changes");
            }
        }

        return (
        <div className="ultimate-container">
            <div className="login-container">
                <div className="login-header">
                    <h2>Profiili</h2>
                </div>
                <form onSubmit={onProfile} className="login-form" id="login-form">
                    <div className="login-form-control">
                        <label>Vuosittainen sähkönkulutus (kWh)</label>
                        <input onChange={e => setkWh(e.target.value)} type="number" placeholder="0.0" id="vuosikulutus" required/>
                    </div>
                    <div className="formButton">
                        <button type="submit">Tallenna</button>
                    </div>
                </form>
            </div>       
        </div>
    )
}

export default Profile;