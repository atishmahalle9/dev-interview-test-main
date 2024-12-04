import { database } from "./database";
import axios from "axios";
import { CSRNG_URL, SYMBOL, PRICE_COLLECTION } from './constants';
// GET /prices - Fetch all records from the prices collection
export const getAllPrice = async (req, res) => {
    try {
        const pricesCollection = database.dbHandle.collection(PRICE_COLLECTION);
        const prices = await pricesCollection.find({}).toArray();
        res.status(200).json(prices);
    } catch (error) {
        console.error("Error fetching prices:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


async function getRandomPrice(min, max) {
    try {
        const response = await axios.get(CSRNG_URL, { params: { min, max } });
        return response.data[0].random; // Returns the random number from the API
    } catch (error) {
        console.error("Error fetching random price:", error);
        return null; // Return null or some fallback value if the API call fails
    }
}
// Helper to delay API calls for rate limiting
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export const averagePrices = async (req, res) => {
    try {
        const { page = 1 } = req.query; // Optional query parameter for pagination
        const pageSize = 4; // Fixed number of documents per page

        const pricesCollection = database.dbHandle.collection(PRICE_COLLECTION);

        // MongoDB Aggregation
        const pipeline = [
            {
                $group: {
                    _id: SYMBOL,
                    averagePrice: { $avg: "$price" },
                },
            },
            {
                $sort: { _id: 1 }, // Sort by symbol
            },
            {
                $skip: (Number(page) - 1) * pageSize, // Pagination
            },
            {
                $limit: pageSize, // Limit results per page
            },
        ];

        const results = await pricesCollection.aggregate(pipeline).toArray();

        // Fetch current prices using CSRNG API
        const enhancedResults = [];
        for (const result of results) {
            const min = Math.floor(result.averagePrice - 5);
            const max = Math.ceil(result.averagePrice + 5);

            // Respect rate limit of 1 call per second
            await sleep(1000);
            const currentPrice = await getRandomPrice(min, max);

            enhancedResults.push({
                symbol: result._id,
                averagePrice: result.averagePrice,
                currentPrice,
            });
        }

        res.status(200).json(enhancedResults);
    } catch (error) {
        console.error("Error in /averagePrices API:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

