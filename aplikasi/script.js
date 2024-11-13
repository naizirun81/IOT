// Fungsi untuk mengambil data dari server
function fetchData() {
    fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(data => {
            updateCurrentData(data); // Update data suhu
            updateSuhuHumidityMax(data.nilai_suhu_max_humid_max); // Update data suhu dan kelembaban
            updateMonthYearData(data.month_year_max); // Update data bulan dan tahun
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('currentData').innerHTML = '<p>Error loading data.</p>';
        });
}

// Fungsi untuk memperbarui data suhu dan kelembaban
function updateCurrentData(data) {
    document.getElementById('temp-max').textContent = `${data.suhumax} °C`;
    document.getElementById('temp-min').textContent = `${data.suhumin} °C`;
    document.getElementById('temp-avg').textContent = `${data.suhurata} °C`;
}

// Fungsi untuk memperbarui detail suhu max & humidity max
function updateSuhuHumidityMax(data) {
    const suhuHumidityMaxDiv = document.getElementById('suhuHumidityMax');
    suhuHumidityMaxDiv.innerHTML = ''; // Kosongkan div terlebih dahulu

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h4>IDX: ${item.idx}</h4>
            <p>Suhu: ${item.suhu}°C</p>
            <p>Kelembaban: ${item.humid}%</p>
            <p>Kecerahan: ${item.kecerahan}%</p>
            <p class="timestamp">Timestamp: ${item.timestamp}</p>
        `;
        suhuHumidityMaxDiv.appendChild(card);
    });
}

// Fungsi untuk memperbarui data bulan & tahun
function updateMonthYearData(data) {
    const monthYearDataDiv = document.getElementById('monthYearData');
    monthYearDataDiv.innerHTML = ''; // Kosongkan div terlebih dahulu

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h4>Bulan-Tahun: ${item.month_year}</h4>
        `;
        monthYearDataDiv.appendChild(card);
    });
}

// Update data setiap 2 detik
setInterval(fetchData, 2000);

// Ambil data pertama kali ketika halaman dimuat
window.onload = fetchData;
