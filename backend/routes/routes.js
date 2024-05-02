import express from "express";
import {User} from "../database/schemas.js";
import { fetchLatestPriceData, getCurrentData, getAllData, getNextSixHoursData} from './apis/porssisahkoAPI.js';
import { filterType, getCompanies } from "./apis/electricCompaniesAPI.js";
import * as registrationController from "./controllers/registrationController.js";
import * as electricityController from "./controllers/electricityController.js";
import { loginUser } from "./controllers/loginController.js";
import { updateProfile } from "./controllers/profileController.js";
const router = express.Router();

router.post('/register', registrationController.createUser);


router.post('/login', loginUser);
  
router.get('/', async(req, res) => {
    //electricityController.getPriceTest();
    res.render("index");
})

router.post("/profile", updateProfile);

//send Get request to http://localhost:3001/currentData to get current price
router.get('/currentData', async(req, res) => {
    try{
        var data = await getCurrentData();
        res.send(data);
    }catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send('Error retrieving data');
    }
})
//send Get request to http://localhost:3001/allData to get current price
router.get('/allData', async(req, res) => {
    try{
        fetchLatestPriceData();
        var data = await getAllData();
        res.send(data);
    }catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send('Error retrieving data');
    }
})

router.get('/api/companies', async(req, res) => {
    try {
        const data = await getCompanies();
        res.send(data);
    } catch (error) {
        console.error(error);
    }
})

router.get('/api/companies/filter', async(req, res) => {
    var { types, consumptionLimit, postalCode } = req.query;
    
    // Convert types from string to array if provided as a string
    if (types && typeof types === 'string') {
        types = JSON.parse(types);
    }

    // Convert consumptionLimit from string to number if provided as a string
    if (consumptionLimit && typeof consumptionLimit === 'string') {
        consumptionLimit = parseFloat(consumptionLimit);
    }

    // Ensure postalCode is a string
    if (!postalCode || typeof postalCode !== 'string') {
    }

    try {
        const data = await filterType(types, consumptionLimit, postalCode);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
