const express = require('express');
const cors = require('cors');

const sequelize = require('./config/database');
const Lead = require('./models/Lead');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Lead Management API is running!');
});



app.post('/leads', async (req, res) => {

    const { name, email, phone } = req.body;

    try {

        const lead = await Lead.create({
            name,
            email,
            phone
        });

        res.status(201).json({
            message: 'Lead created successfully',
            data: lead
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error creating lead'
        });

    }
});



app.get('/leads', async (req, res) => {

    try {

        const leads = await Lead.findAll({
            order: [['id', 'ASC']]
        });

        res.status(200).json(leads);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error fetching leads'
        });

    }

});


const startServer = async () => {

    try {

        await sequelize.authenticate();

        console.log('PostgreSQL connected successfully!');

        await sequelize.sync();

        console.log('Database tables synchronized!');

        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });

    } catch (error) {

        console.error('Unable to connect to database:', error);

    }

};

startServer();