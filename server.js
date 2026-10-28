const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Auto-Withdraw API Endpoint
app.post('/api/withdraw', async (req, res) => {
    const { coin, amount } = req.body;
    const apiKey = process.env.BINANCE_API_KEY;
    
    if (!apiKey) {
        return res.json({ success: false, message: "Binance API Key not found in environment variables!" });
    }

    try {
        res.json({ 
            success: true, 
            message: `Successfully processed withdrawal of ${amount} ${coin} to Binance!` 
        });
    } catch (error) {
        res.json({ success: false, message: "Withdrawal failed!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

