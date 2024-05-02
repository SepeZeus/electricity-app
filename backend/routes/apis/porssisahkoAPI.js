import fs from 'fs/promises';
const jsonFile = './src/apiData.json';

const LATEST_PRICES_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json';
var lastCallTime = 0;

export async function fetchLatestPriceData() {
  if(await shouldCallAPI()) {
    try {
      saveLastCallTime(Date.now());
      const response = await fetch(LATEST_PRICES_ENDPOINT);
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
      const jsonData = await response.json();
      saveToJson(jsonData);
    } catch (error) {
      console.error("Error:", error);
    }
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
  // Note that it's enough to call fetchLatestPriceData() once in 12 hours
  const { prices } = await parsedJson();
  var data = ""

  try {
    const now = new Date();
    const price = getPriceForDate(now, prices);
    data = (`${price}`);
  } catch (e) {
    data = (`Hinnan haku epäonnistui, syy: ${e}`);
  }

  return data;
}

export async function getNextSixHoursData() {
  const { prices } = await parsedJson();
  const data = [];
  try{
    const now = new Date();
    for(let i = 1; i < 6; i++){
      const price = getPriceForDate((now.getTime() + i*60*60*1000), prices);
      data.push(price);
    }
  }catch (e) {
    data = (`Hinnan haku epäonnistui, syy: ${e}`);
  }
  return data;
}

/*
"Palauttaa uusimmat 48 tunnin hintatiedot. Kello 14 lähtien sisältää seuraavan päivän hintatiedot, 
olettaen että Nord Poolin hintojen julkistuksessa ei ole ollut viivettä. Ennen kello kahta sisältää hintatiedot kuluvan päivän loppuun. 
Yksikkö on snt / kWh sisältäen kyseisenä päivänä vallinneen arvonlisäveron."
*/
export async function getAllData() {
  const { prices } = await parsedJson();
  return prices;
}

function saveLastCallTime(timestamp) {
  lastCallTime = timestamp.toString();
  console.log('Saved last call time to file');
}

async function shouldCallAPI() {
  const currentTime = Date.now();
  const twelveHours = 12*60*60*1000;
  return currentTime - lastCallTime >= twelveHours;
}

async function saveToJson(data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(jsonFile, jsonData, (error) => {
      if (error) {
        console.log(error);
    }});
    console.log('Data saved to file ' + jsonFile);
  } catch (error) {
    console.error('Error saving data to file:',error);
  }
}

export async function parsedJson(){
  try {
    const json = await fs.readFile(jsonFile, 'utf8');
    const data = JSON.parse(json);
    return data;
  }catch (error) {
    console.error(error);
  }
}