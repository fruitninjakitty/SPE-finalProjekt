const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/payment', paymentRoutes);

const PORT =  8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
