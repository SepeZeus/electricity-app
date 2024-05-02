const JSON_DATA_URL = 'http://localhost:3001/allData';

async function fetchJsonData() {
    try{
        const response = await fetch(JSON_DATA_URL);
        const data = await response.json();
        return data;
    }catch(error){
        console.error(error);
    }
}

function getPriceForDate(date, prices) {
    const matchingPriceEntry = prices.find(
      (price) => new Date(price.startDate) <= date && new Date(price.endDate) > date
    );
    if (!matchingPriceEntry) {
      throw 'Price for the requested date is missing';
    }
    return matchingPriceEntry.price;
  }
  
  //"palauttaa vain tämänhetkisen hinnan"
  export async function getCurrentData() {
    try {
        const jsonData = await fetchJsonData();
        const prices = jsonData;
        var data = "";
        const now = new Date();
        const price = getPriceForDate(now, prices);
        data = (`${price}`);
    } catch (e) {
        data = (`VIRHE`);
    }
  
    return data;
}
  
  export async function getNextSixHoursData() {
    const prices = await fetchJsonData();
    var data = [];
    try{
      const now = new Date();
      for(let i = 1; i < 6; i++){
        const price = getPriceForDate((now.getTime() + i*60*60*1000), prices);
        data.push(price);
      }
    }catch (e) {
      console.log(e);
    }
    return data;
  }
  
  export async function getAllData() {
    const { prices } = await fetchJsonData();
    const formatedPrice = prices.map(({ price, startDate }) => ({ price, startDate }));
  
    return formatedPrice;
}