import {mongoose} from "../src/deps.js";

const CONNECTION = 'mongodb+srv://admin:admin@sahkovahdin.ryidws7.mongodb.net/sahkodb'

const connectToDatabase = async () => {
    try {
        await mongoose.connect(CONNECTION);
        console.log('Connected to MongoDB');
        return true
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        return false
    }
};

const disconnectFromDatabase = async () =>{
    try {
        await mongoose.disconnect(CONNECTION);
        console.log('Disconnect From MongoDB');
        return false
    } catch (error) {
        console.error('Failed to disconnect from MongoDB:', error);
        return true
    }
};

export { connectToDatabase, disconnectFromDatabase };
