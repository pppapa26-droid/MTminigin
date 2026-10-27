
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Health Check Endpoint
app.get('/', (req, res) => {
    res.send('MTminigin Backend Server is running (Notification Mode Active)');
});

// Withdrawal Request Endpoint
app.post('/api/withdraw', async (req, res) => {
    try {
        const { userId, amount, address, coin = 'USDT', network = 'TRX' } = req.body;
        
        console.log(`Withdraw Request Received - User: ${userId}, Amount: ${amount}, Address: ${address}, Coin: ${coin}`);

        // Successfully receives the withdrawal request without IP restriction errors
        return res.json({
            success: true,
            message: 'Withdrawal request submitted successfully! Admin will review and process your payout.'
        });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error during withdrawal.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
