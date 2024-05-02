import {mongoose} from "../src/deps.js";

//contains user account information
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false},
    kWh: {type: Number, default: 0}
});

//contains spot and fixed electricity prices
const electricitySchema = new mongoose.Schema({
    price: {type: Number, required: true},
    date: {type: Date, required: true},
    spot: {type: Boolean, required: true},
    seller: {type: String, default: ""}
});


const User = mongoose.model('User', userSchema);
const Electricity = mongoose.model('Electricity', electricitySchema);


export {User, Electricity};