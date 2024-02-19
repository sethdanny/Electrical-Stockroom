import express from 'express';
import 'dotenv/config';

const app = express();

const PORT = process.env.port || 4001;

app.get('/', (req, res) => {
    res.send({message: 'welcome'})
});

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})
