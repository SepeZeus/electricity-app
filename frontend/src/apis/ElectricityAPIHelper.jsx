import { getCurrentData, getNextSixHoursData} from '../utils/utils.jsx';
import { useState, useEffect } from "react";

//component for current electricity price
function CurrentPrice() {
  const [price, setPrice] = useState(0);//price updates every 15 min

  useEffect(() => {
    const fetchCurrentPrice = async () => {//fetches current price from API
      try {
        const curPrice = await getCurrentData()
        setPrice(curPrice);
      } catch (error) {
        console.error('Error fetching current price:', error);
      }
    };
    fetchCurrentPrice();
    
    //update price every 15 minutes
    const INTERVAL = 15*60000; // 15 minutes in milliseconds
    const priceUpdateInterval = setInterval(fetchCurrentPrice, INTERVAL);
    return () => clearInterval(priceUpdateInterval); // Clean up the interval when the component unmounts
  }, []); // Empty dependency array ensures this runs only once on component mount
  
  if (price)
    return <div className="priceText">{price}</div>; // Display the price
  else
    return <div className="priceText">0</div>;
}

function SixHourData() {
  const [price, setPrice] = useState(0);//price updates every 15 min

  useEffect(() => {
    const fetchAllData = async () => {//fetches current price from API
      try {
        const curPrice = await getNextSixHoursData();
        console.log(curPrice)
        setPrice(curPrice);
      } catch (error) {
        console.error('Error fetching current price:', error);
      }
    };
    fetchAllData();
    //update price every 15 minutes
    const INTERVAL = 15*60000; // 15 minutes in milliseconds
    const priceUpdateInterval = setInterval(fetchAllData, INTERVAL);
    return () => clearInterval(priceUpdateInterval); // Clean up the interval when the component unmounts
  }, []); // Empty dependency array ensures this runs only once on component mount

  if (price){
    const now = new Date();
    const structuredDate = now.getHours();
    return (
      <div>
        {price.map((item, index)=>
        (<div key={index}><p className="sixHourTimeText">{structuredDate+index+1+':00' +' '}</p><p className="sixHourText"> {item} snt/kWh</p></div>))}
      </div>
    )
    } // Display the price
  else
    return <div className="priceText">0</div>;
}


function ElectricityCompanies() {
  const [companies, setCompanies] = useState();

  useEffect(() => {
    const fetchCompanies = async () => {//fetches companies from API
      try {
        const response = await fetch('http://localhost:3001/api/companies');//backend routing path
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const companiesData = await response.json()
        setCompanies(companiesData);
        //console.log(companiesData);
      } catch (error) {
        console.error('Error fetching current price:', error);
      }
    };
    fetchCompanies();
    //console.log(companies);
  }, [companies]); // Empty dependency array ensures this runs only once on component mount

  if (companies){
    return (
      <div>
        {companies.map((item, index) => (
          <div className="CompanyListItem" key={index}>
            <div className="companyDiv">
              {item.addvertisedName && <p className="companiesText">Mainostus nimi: {item.addvertisedName}</p>}
              {item.CompanyName && <p className="companiesText">Yrityksen nimi: {item.CompanyName}</p>}
              {item.PostalArea && <p className="companiesText">Postipaikkakunta: {item.PostalArea}</p>}
              {item.CompanyUrl && <p className="companiesText">yrityksen verkkosivu: {item.CompanyUrl}</p>}
              {item.ContractType && <p className="companiesText">Sopimustyyppi: {item.ContractType}</p>}
              {item.FixedTimeRange && <p className="companiesText">Aikaväli: {item.FixedTimeRange}</p>}
              {item.Metering && <p className="companiesText">Metering: {item.Metering}</p>}
              {/*Make this not stupid way*/}
              {item.Price && item.Price.PriceComponents && item.Price.PriceComponents.length > 0 && (
                <div>
                  <p className="companiesText">Hinta-1: {item.Price.PriceComponents[0].OriginalPayment.Price} {item.Price.PriceComponents[0].OriginalPayment.PaymentUnit}</p>
                  {item.Price.PriceComponents.length > 1 && (
                    <p className="companiesText">Hinta-2: {item.Price.PriceComponents[1].OriginalPayment.Price} {item.Price.PriceComponents[1].OriginalPayment.PaymentUnit}</p>
                  )}
                </div>
              )}
              {item.ConsumptionLimitation && <p className="companiesText">Maksimi kulutus: {item.ConsumptionLimitation.MaxXKWhPerY}</p>}
              {item.ExtraInformation && <p className="companiesText">Extra tietoa: {item.ExtraInformation}</p>}
              </div>
          </div>
        ))}
      </div>
    )
    } // Display the price
  else
    return <div></div>;
}

export { CurrentPrice, SixHourData, ElectricityCompanies};