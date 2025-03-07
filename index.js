const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data, name, dob, email, rollNumber } = req.body;
        const userId = `${name}_${dob}`;

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const highestAlphabet = alphabets.sort((a, b) => b.localeCompare(a))[0] || "";

        res.status(200).json({
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highestAlphabet ? [highestAlphabet] : []
        });
    } catch (error) {
        res.status(500).json({ is_success: false, error: 'Internal Server Error' });
    }
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
    try {
        res.status(200).json({ "operation_code": 1 });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
