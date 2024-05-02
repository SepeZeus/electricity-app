import * as electricityService from "../../services/electricityService.js";


const dummydata = {price: 2.69, date: new Date(), spot: true, seller: "John Smith"};

const getPriceTest = async() =>{//change to use form
    const price = await electricityService.getPriceByDate(dummydata.date);
    const priceRange = await electricityService.getPriceInRange(new Date("2024-02-16T06:49:40"), dummydata.date);
    
    if(!price){
        await electricityService.addPrice(dummydata.price, dummydata.date, dummydata.spot, dummydata.seller);
    }
    else{
        console.log("LMAO AGAIN"+price);
    }
};

export {getPriceTest};
