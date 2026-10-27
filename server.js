const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(express.json());
app.use(cors());

// Health Check Endpoint
app.get('/', (req, res) => {
    res.send('MTminigin Backend Server is running (Auto-Withdrawal Active)');
});

// Real Binance Auto-Withdrawal Endpoint
app.post('/api/withdraw', async (req, res) => {
    try {
        const { userId, amount, address, coin = 'USDT', network = 'TRX' } = req.body;
        
        console.log(`Withdraw Request - User: ${userId}, Amount: ${amount}, Address: ${address}`);

        const apiKey = process.env.BINANCE_API_KEY;
        const apiSecret = process.env.BINANCE_SECRET_KEY;

        if (!apiKey || !apiSecret) {
            return res.status(500).json({ success: false, message: 'Binance API credentials not configured on server.' });
        }

        const timestamp = Date.now();
        // Binance withdraw parameters
        const queryParams = new URLSearchParams({
            coin: coin,
            address: address,
            amount: amount,
            network: network,
            timestamp: timestamp
        });

        const signature = crypto
            .createHmac('sha256', apiSecret)
            .update(queryParams.toString())
            .digest('hex');

        queryParams.append('signature', signature);

        // Call Binance SAPI Withdraw Endpoint
        const response = await fetch(`https://api.binance.com/sapi/v1/capital/withdraw/apply?${queryParams.toString()}`, {
            method: 'POST',
            headers: {
                'X-MBX-APIKEY': apiKey,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok && data.id) {
            return res.json({
                success: true,
                message: `Withdrawal successful! TxID/ID: ${data.id}`
            });
        } else {
            console.error('Binance API Error:', data);
            return res.status(400).json({
                success: false,
                message: `Binance Error: ${data.msg || 'Withdrawal failed'}`
            });
        }

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error during withdrawal.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
