
import { ElectricityCompanies } from "../apis/ElectricityAPIHelper";
import ProtectedRoute from "../../middleware/Authorization";
function ProofOfConcept () { 
    return (
        <>
            <div className="content">
            <ElectricityCompanies />
            </div>           
        </>

    )
}

export default () => (  <ProtectedRoute>
    <ProofOfConcept/>
  </ProtectedRoute>);