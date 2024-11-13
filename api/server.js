const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // Mengizinkan akses CORS

// Fungsi DATA ACAK
function generateRandomData() {
    return {
        suhumax: Math.floor(Math.random() * 15) + 25, // Suhu max antara 25 - 40
        suhumin: Math.floor(Math.random() * 10) + 15, // Suhu min antara 15 - 25
        suhurata: (Math.random() * 10 + 20).toFixed(2), // Suhu rata-rata antara 20 - 30
        nilai_suhu_max_humid_max: [
            {
                idx: Math.floor(Math.random() * 1000),
                suhu: Math.floor(Math.random() * 15) + 25,
                humid: Math.floor(Math.random() * 50) + 50, // Humidity antara 50 - 100
                kecerahan: Math.floor(Math.random() * 100), // Kecerahan antara 0 - 100
                timestamp: new Date().toISOString()
            },
            {
                idx: Math.floor(Math.random() * 1000),
                suhu: Math.floor(Math.random() * 15) + 25,
                humid: Math.floor(Math.random() * 50) + 50,
                kecerahan: Math.floor(Math.random() * 100),
                timestamp: new Date().toISOString()
            }
        ],
        month_year_max: [
            { month_year: `${new Date().getMonth() + 1}-${new Date().getFullYear()}` },
            { month_year: `${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 5) + 2018}` }
        ]
    };
}

let currentData = generateRandomData();

// Mengupdate data setiap 2 detik
setInterval(() => {
    currentData = generateRandomData();
    console.log("Data updated:", currentData);
}, 2000);

// Endpoint untuk mendapatkan data
app.get('/data', (req, res) => {
    res.json(currentData);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
