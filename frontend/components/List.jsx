import { forwardRef } from "react";

function List({ ContractTypes }, ref) { // Destructuring companies from props
    if (ContractTypes) {
        return (
            <div className="comparing-list-container">
                <h1 ref={ref}>Tarjoukset</h1>
                {!ContractTypes && <h1>Ei tuloksia</h1>}
                <div className="list-container">
                    
                    {ContractTypes.Fixed && 
                        <div>
                            <h3 className="card-title">Paras Määräaikainen</h3>
                            <table className="list-type-fixed">
                                <thead>
                                    <tr>
                                        <th>Yrityksen nimi</th>
                                        <th>Postipaikkakunta</th>
                                        <th>Yrityksen verkkosivu</th>
                                        <th>Akiaväli</th>
                                        <th>Mittaus</th>
                                        <th>Hinta (snt/kWh)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {ContractTypes.Fixed.map((item, index) => (
                                    <tr>
                                            {item.CompanyName && <td>{item.CompanyName} </td>}
                                            {item.PostalArea && <td>{item.PostalArea} </td>}
                                            {item.CompanyUrl && <td>{item.CompanyUrl} </td>}
                                            {item.FixedTimeRange && <td>{item.FixedTimeRange} </td>}
                                            {item.Metering && <td>{item.Metering} </td>}
                                            {item.Price && <td><b>{item.Price.PriceComponents[0].OriginalPayment.Price}</b></td>}
                                            
                                        </tr>
                                ))}
                                </tbody>
                            </table>
                            <hr></hr>
                        </div>
                    }
                    {ContractTypes.OpenEnded && 
                        <div>
                            <h3 className="card-title">Paras toistaiseksi voimassa oleva</h3>
                            <table className="list-type-OpenEnded">
                                <thead>
                                    <tr>
                                        <th>Yrityksen nimi</th>
                                        <th>Postipaikkakunta</th>
                                        <th>Yrityksen verkkosivu</th>
                                        <th>Akiaväli</th>
                                        {/* <th>Mittaus</th> */}
                                        <th>Hinta (kWh)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {ContractTypes.OpenEnded.map((item, index) => (
                                    <tr>
                                            {item.CompanyName && <td>{item.CompanyName} </td>}
                                            {item.PostalArea && <td>{item.PostalArea} </td>}
                                            {item.CompanyUrl && <td>{item.CompanyUrl} </td>}
                                            {/* {item.FixedTimeRange && <td>{item.FixedTimeRange} </td>} */}
                                            {item.Metering && <td>{item.Metering} </td>}
                                            {item.Price && <td><b>{item.Price.PriceComponents[0].OriginalPayment.Price}</b></td>}
                                        </tr>
                                ))}
                                </tbody>
                            </table>
                            <hr></hr>
                        </div>
                    }
{
    // <div className="col-sm-6">
    //     <div className="card">
    //         <div className="card-body">
    //             <h3 className="card-title">Paras toistaiseksi voimassa oleva</h3>
    //                 {!!ContractTypes.OpenEnded && ContractTypes.OpenEnded.map((item, index) => (
        //                     <div className="CompanyListItem" key={index}>
        //                         <div className="companyDiv">
        //                             {item.addvertisedName && <p className="companiesText">Mainostus nimi: {item.addvertisedName}</p>}
        //                             {item.CompanyName && <p className="companiesText">Yrityksen nimi: {item.CompanyName}</p>}
        //                             {item.PostalArea && <p className="companiesText">Postipaikkakunta: {item.PostalArea}</p>}
        //                             {item.CompanyUrl && <p className="companiesText">yrityksen verkkosivu: {item.CompanyUrl}</p>}
        //                             {item.ContractType && <p className="companiesText">Sopimustyyppi: {item.ContractType}</p>}
        //                             {item.FixedTimeRange && <p className="companiesText">Aikaväli: {item.FixedTimeRange}</p>}
        //                             {item.Metering && <p className="companiesText">Metering: {item.Metering}</p>}
        //                             {/*Make this not stupid way*/}
        //                             {item.Price && item.Price.PriceComponents && item.Price.PriceComponents.length > 0 && (
            //                                 <div>
            //                                     <p className="companiesText">Hinta-1: {item.Price.PriceComponents[0].OriginalPayment.Price} {item.Price.PriceComponents[0].OriginalPayment.PaymentUnit}</p>
            //                                     {item.Price.PriceComponents.length > 1 && (
                //                                         <p className="companiesText">Hinta-2: {item.Price.PriceComponents[1].OriginalPayment.Price} {item.Price.PriceComponents[1].OriginalPayment.PaymentUnit}</p>
                //                                     )}
                //                                 </div>
                //                             )}
                //                             {item.ConsumptionLimitation && <p className="companiesText">Maksimi kulutus: {item.ConsumptionLimitation.MaxXKWhPerY}</p>}
                //                             {/*item.ExtraInformation && <p className="companiesText">Extra tietoa: {item.ExtraInformation}</p>*/}
                //                             <button>Sivustolle</button>
                //                         </div>
                //                     </div>
                //                 ))}
                //         </div>
                //     </div>
                // </div>
                // <hr></hr>
}

                    {ContractTypes.Spot && 
                        
                        <div>
                            <h3 className="card-title">Paras Spot</h3>
                            <table className="list-type-spot">
                                <thead>

                                <tr>
                                    <th>Yrityksen nimi</th>
                                    <th>Postipaikkakunta</th>
                                    <th>Yrityksen verkkosivu</th>
                                    <th>Akiaväli</th>
                                    {/* <th>Mittaus</th> */}
                                    <th>Hinta (kWh)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {ContractTypes.Spot.map((item, index) => (
                                    
                                    <tr>
                                        {item.CompanyName && <td>{item.CompanyName} </td>}
                                        {item.PostalArea && <td>{item.PostalArea} </td>}
                                        {item.CompanyUrl && <td>{item.CompanyUrl} </td>}
                                        {/* {item.FixedTimeRange && <td>{item.FixedTimeRange} </td>} */}
                                        {item.Metering && <td>{item.Metering} </td>}
                                        {item.Price && <td><b>{item.Price.PriceComponents[0].OriginalPayment.Price}</b></td>}
                                        
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <hr></hr>
                            </div>
                    }
                    {
                        
                        // <div className="col-sm-6">
                        //     <div className="card">
                        //         <div className="card-body">
                        //             <h3 className="card-title">Paras Spot</h3>
                        //                 {!!ContractTypes.Spot && ContractTypes.Spot.map((item, index) => (
                            //                     <div className="CompanyListItem" key={index}>
                            //                         <div className="companyDiv">
                            //                             {item.addvertisedName && <p className="companiesText">Mainostus nimi: {item.addvertisedName}</p>}
                            //                             {item.CompanyName && <p className="companiesText">Yrityksen nimi: {item.CompanyName}</p>}
                            //                             {item.PostalArea && <p className="companiesText">Postipaikkakunta: {item.PostalArea}</p>}
                            //                             {item.CompanyUrl && <p className="companiesText">yrityksen verkkosivu: {item.CompanyUrl}</p>}
                            //                             {item.ContractType && <p className="companiesText">Sopimustyyppi: {item.ContractType}</p>}
                            //                             {item.FixedTimeRange && <p className="companiesText">Aikaväli: {item.FixedTimeRange}</p>}
                            //                             {item.Metering && <p className="companiesText">Metering: {item.Metering}</p>}
                            //                             {/*Make this not stupid way*/}
                            //                             {item.Price && item.Price.PriceComponents && item.Price.PriceComponents.length > 0 && (
                                //                                 <div>
                                //                                     <p className="companiesText">Hinta-1: {item.Price.PriceComponents[0].OriginalPayment.Price} {item.Price.PriceComponents[0].OriginalPayment.PaymentUnit}</p>
                                //                                     {item.Price.PriceComponents.length > 1 && (
                                    //                                         <p className="companiesText">Hinta-2: {item.Price.PriceComponents[1].OriginalPayment.Price} {item.Price.PriceComponents[1].OriginalPayment.PaymentUnit}</p>
                                    //                                     )}
                                    //                                 </div>
                                    //                             )}
                                    //                             {item.ConsumptionLimitation && <p className="companiesText">Maksimi kulutus: {item.ConsumptionLimitation.MaxXKWhPerY}</p>}
                                    //                             {/*item.ExtraInformation && <p className="companiesText">Extra tietoa: {item.ExtraInformation}</p>*/}
                                    //                             <button>Sivustolle</button>
                                    //                         </div>
                                    //                     </div>
                                    //                 ))}
                                    //         </div>
                                    //     </div>
                                    // </div>
        
                                }
                </div>
        
            </div>
        )
    } else {
        return (
            <div>
                <p>FAIL</p>
                 {console.log("found companies")}
            </div>
        )
    }
}

export default forwardRef(List);
