const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Static files များကို public folder ထဲမှ ယူရန် ချိတ်ဆက်ခြင်း
app.use(express.static(path.join(__dirname, 'public')));

// Root URL ဝင်လာပါက index.html ကို တိုက်ရိုက်ပြရန်
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Auto-Withdraw API Endpoint
app.post('/api/withdraw', async (req, res) => {
    const { coin, amount, userId } = req.body;
    // Binance API ဖြင့် Auto-Withdraw လုပ်မည့် လုပ်ငန်းစဉ်များ ဤနေရာတွင် ဆက်လက်ရေးသားနိုင်ပါသည်။
    res.json({ success: true, message: "Withdrawal request sent to Binance API successfully!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
