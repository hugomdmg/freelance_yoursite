import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const dataBase = process.env.DB_NAME;
const uri = process.env.DB_URL;

if (!dataBase || !uri) {
    throw new Error("Environment variables DB_NAME and DB_URL are required.");
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        maxIdleTimeMS: 300000,

    },
});

client.connect()


class DataBase {
    constructor() {}

    async connect() {
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect();
        }
    }

    async disconnect() {
        if (client.topology && client.topology.isConnected()) {
            await client.close();
        }
    }

    async getAllItems(collectionName) {
        const database = client.db(dataBase);
        const collection = database.collection(collectionName);
        const items = await collection.find().toArray();
        return items;
    }

    async getFilteredItems(collectionName, filter) {
        const database = client.db(dataBase);
        const collection = database.collection(collectionName);
        const items = await collection.find(filter).toArray();
        return items;
    }

    async addItem(collectionName, item) {
        const database = client.db(dataBase);
        const collection = database.collection(collectionName);
        const result = await collection.insertOne(item);
        return result;
    }

    async deleteItem(collectionName, filter) {
        const database = client.db(dataBase);
        const collection = database.collection(collectionName);
        const result = await collection.deleteOne(filter);
        return result;
    }

    async updateItem(collectionName, filter, update) {
        const database = client.db(dataBase);
        const collection = database.collection(collectionName);
        const result = await collection.updateOne(filter, { $set: update });
        return result;
    }
}

const db = new DataBase()

export default db;