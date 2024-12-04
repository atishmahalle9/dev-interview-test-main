import { PRICE_COLLECTION } from "./constants";
import { database } from "./database";
import { quotes } from './quotes'

// Collection Name
const collectionName = PRICE_COLLECTION;


// Check whether data is already in the collection
const isDataExist = async () => {
    const collection = database.dbHandle.collection(collectionName);
    // Check if there are any documents in the collection
    const count = await collection.countDocuments();
    return count > 0; // Returns true if there are existing records
};

// Insert Data into MongoDB
const insertData = async (data) => {
    try {
        const dataExists = await isDataExist();

        if (dataExists) {
            console.log('Documents already exist in the database. Skipping insertion.');
        } else {
            const collection = database.dbHandle.collection(collectionName);
            const result = await collection.insertMany(data);
            console.log(`${result.insertedCount} documents were inserted`);
        }
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
    }
};

// Main Function
export const main = async () => {
    const data = quotes

    if (Array.isArray(data) && data.length > 0) {
        await insertData(data);
    } else {
        console.error('No valid data found in the source file');
    }
};


