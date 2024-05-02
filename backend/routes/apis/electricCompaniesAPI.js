import * as fs from 'fs';

// Local file path for test data
const LATEST_PRICES_ENDPOINT = "routes/apis/testData.json";

// Function to read JSON data from file
function readJSONFromFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// Parse the JSON data and select desired fields
function parseJSON(jsonData) {
    return jsonData.map(entry => {
        return {
            addvertisedName: entry.Name,
            CompanyName: entry.Company.Name,
            PostalArea: entry.Company.PostalName,
            CompanyUrl: entry.Company.CompanyUrl,
            ContractType: entry.Details.ContractType,
            FixedTimeRange: entry.Details.FixedTimeRange,
            Metering: entry.Details.Metering,
            Price: entry.Details.Pricing,
            AvailabilityArea: entry.Details.AvailabilityArea,
            ConsumptionLimitation: entry.Details.ConsumptionLimitation,
            ExtraInformation: entry.Details.ExtraInformation.FI
        };
    });
}

// Fetch electric prices data, parse it, and filter it based on types and consumption limit
export async function getCompanies() {
    try {
        const data = await readJSONFromFile(LATEST_PRICES_ENDPOINT); // Read JSON data from file
        const parsedData = parseJSON(data); // Parse the JSON data

        return parsedData;
    } catch (error) {
        console.error("Error occurred while fetching:", error);
        throw error; // Propagate error to the caller
    }
}

// Fetch electric prices data, parse it, and filter it based on types and consumption limit
export async function filterType(types, consumptionLimit, postalCode) {
    try {
        const data = await readJSONFromFile(LATEST_PRICES_ENDPOINT); // Read JSON data from file
        const parsedData = parseJSON(data); // Parse the JSON data

        const filteredContracts = {};
        types.forEach(type => {
            filteredContracts[type] = parsedData.filter(contract => {
                const isMatchingType = contract.ContractType === type;
                const isAboveConsumptionLimit = contract.ConsumptionLimitation.MaxXKWhPerY >= consumptionLimit;
                var matchingPostalCode = false;
                if(!postalCode)
                {
                    return isMatchingType && isAboveConsumptionLimit;
                }
                matchingPostalCode = contract.AvailabilityArea.PostalCodes.includes(postalCode)                
                return isMatchingType && isAboveConsumptionLimit && matchingPostalCode;
            });
        });

        return filteredContracts;
    } catch (error) {
        console.error("Error occurred while fetching or filtering data:", error);
        throw error; // Propagate error to the caller
    }
}
