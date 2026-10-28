const express = require('express');
const path = require('path');
const crypto = require('crypto');
const app = express();

app.use(express.json());

// index.html ဖိုင်ကို Root directory မှ အသေအချာ ဖတ်ရှုရန်
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Auto-Withdraw API Endpoint
app.post('/api/withdraw', async (req, res) => {
    const { coin, amount, address } = req.body;
    const apiKey = process.env.BINANCE_API_KEY;
    const apiSecret = process.env.BINANCE_SECRET_KEY;
    
    if (!apiKey || !apiSecret) {
        return res.json({ success: false, message: "Binance API Key or Secret Key not found in environment variables!" });
    }

    if (!address) {
        return res.json({ success: false, message: "Please enter your Binance Deposit Address!" });
    }

    try {
        const timestamp = Date.now();
        const queryString = `coin=${coin}&address=${address}&amount=${amount}&timestamp=${timestamp}`;
        
        const signature = crypto
            .createHmac('sha256', apiSecret)
            .update(queryString)
            .digest('hex');

        const url = `https://api.binance.com/sapi/v1/capital/withdraw/apply?${queryString}&signature=${signature}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-MBX-APIKEY': apiKey,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            res.json({ success: true, message: `Successfully requested withdrawal of ${amount} ${coin} to Binance!`, data });
        } else {
            res.json({ success: false, message: data.msg || "Binance withdrawal failed! Check API permissions or balance." });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Server withdrawal error!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



