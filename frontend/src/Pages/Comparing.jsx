import { useState, useRef } from "react";
import List from "../../components/List";
import ProtectedRoute from "../../middleware/Authorization";

function Comparing() {
    const [openEndedChecked, setOpenEndedChecked] = useState(false);
    const [fixedChecked, setFixedChecked] = useState(false);
    const [spotChecked, setSpotChecked] = useState(false);
    const [postalCode, setPostalCode] = useState("");
    const [consumption, setConsumption] = useState("");
    const [ContractTypes, setCompanies] = useState();

    const ref = useRef(null)

    const handleSearch = async () => {
        var types = [];
        if (openEndedChecked) {
            types.push("OpenEnded");
        }
        if (fixedChecked) {
            types.push("Fixed");
        }
        if (spotChecked) {
            types.push("Spot");
        }

        try {
            const params = new URLSearchParams({
                types: JSON.stringify(types),
                consumptionLimit: consumption,
                postalCode: postalCode
            });
            // console.log(types)
            const url = `http://localhost:3001/api/companies/filter?${params}`;
    
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response error');
            }
    
            const companiesData = await response.json();
            setCompanies(companiesData);
            // console.log(companiesData);
        } catch (error) {
            console.error('Error fetching current price:', error);
        }
    };

    const handleCompareClick = () => {
        handleSearch();
        console.log("HALOOO")
        setTimeout(() => {
            ref.current?.scrollIntoView({behavior: 'smooth'})
        },500)
        console.log("HALOOO22222")
    };

    return (
        <div className="ultimate-container">
            <div className="comparing-container">
                <div className="comparing-header">
                    <h2>Kiinteähintaisen sähkön ja pörssisähkön vertailu</h2>
                </div>
                <div className="comparing-text">
                    <p>Vuosittainen sähkönkulutuksesi:</p>
                </div>
                <form className="consumption-form">
                    <div className="consumption-form-control">
                        
                        <label>
                            <p>Toistaiseksi voimassa oleva</p>
                            <input value={fixedChecked} type="checkbox" onChange={() => setFixedChecked(!fixedChecked)} />
                        </label>
                        <label>
                            <p>Määräaikainen</p>
                            <input value={openEndedChecked} type="checkbox" onChange={() => setOpenEndedChecked(!openEndedChecked)} />
                        </label>
                        <label>
                            <p>Spot</p>
                            <input value={spotChecked} type="checkbox" onChange={() => setSpotChecked(!spotChecked)} />
                        </label>
                        <label>
                            <p>Postinumero (saatavuus)</p>
                            <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        </label>
                        <label>
                            <p>Kulutus</p>
                            <input type="text" placeholder="10000" value={consumption} onChange={(e) => setConsumption(e.target.value)} />
                        </label>
                    </div>
                    <button  onClick={handleCompareClick} type="button">Vertaa</button>
                </form>
                
            </div>
                {ContractTypes && <List ref={ref} ContractTypes={ContractTypes} />}
        </div>
    );
}

export default () => (
    <ProtectedRoute>
        <Comparing />
    </ProtectedRoute>
);
