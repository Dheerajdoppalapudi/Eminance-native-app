const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require("./src/routes/authRoutes"); 
const postRoutes = require("./src/routes/postRoutes");
require('dotenv').config();
const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use("/api/", authRoutes);
app.use("/drone/", postRoutes);


app.get('/', (req, res) => {
    res.send('Node.js API is running...');
});

// app.get('/test-db', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT NOW()');
//         res.json({ message: 'Database connected!', time: result.rows[0].now });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));