const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Health Check Endpoint
app.get('/', (req, res) => {
    res.send('MTminigin Backend Server is running (Manual Withdrawal Mode)!');
});

// Manual Withdrawal API Endpoint
app.post('/api/withdraw', (req, res) => {
    const { userId, amount, address } = req.body;
    
    // Manual Mode: ငွေထုတ်တောင်းဆိုမှုကို လက်ခံပြီး Admin ဆီ အကြောင်းကြားသည်
    console.log(`Withdraw Request - User: ${userId}, Amount: ${amount}, Address: ${address}`);
    
    res.json({
        success: true,
        message: 'Withdrawal request submitted successfully! Admin will review and process manually.'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
