import { Db, MongoClient } from "mongodb";

const MONGODB_URI = `mongodb://localhost:${process.env.MONGODB_PORT ?? 27017}`;
const DATABASE_NAME = "interview";

export let database: {
    dbClient: MongoClient;
    dbHandle: Db;
};

export async function connectToMongoDB() {
    try {
        const dbClient = await MongoClient.connect(MONGODB_URI);
        console.log("Successfully connected to server " + MONGODB_URI);
        database = {
            dbClient,
            dbHandle: dbClient.db(DATABASE_NAME)
        };
    } catch (error) {
        console.log("Error creating database connection: " + error);
        throw error;
    }
}
