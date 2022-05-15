const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lg4wy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('doctors_portal').collection('services');
        const bookingCollection = client.db('doctors_portal').collection('bookings')

        app.get('/service', async (req, res) => {
            //console.log(services);
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            console.log(services);
            res.send(services)

        });
        app.post('/booking', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
            res.send(result)
        })

    }
    finally {

    }
}

app.get('/', (req, res) => {
    res.send('Bismillah')
})
run().catch(console.dir)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})