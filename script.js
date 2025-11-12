// Jalankan skrip setelah halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function () {
    const jamBuka = {
        'Minggu': { buka: null, tutup: null },
        'Senin': { buka: 8, tutup: 14 },
        'Selasa': { buka: 8, tutup: 14 },
        'Rabu': { buka: 8, tutup: 14 },
        'Kamis': { buka: 8, tutup: 14 },
        'Jumat': { buka: 8, tutup: 14 },
        'Sabtu': { buka: 8, tutup: 14 }
    };

    function cekStatusToko() {
        const now = new Date();

        const options = {
            timeZone: 'Asia/Jakarta',
            hour12: false,
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit'
        };

        const formatter = new Intl.DateTimeFormat('id-ID', options);
        const parts = formatter.formatToParts(now);

        let hariIni, jam, menit;
        parts.forEach(part => {
            if (part.type === 'weekday') hariIni = part.value;
            if (part.type === 'hour') jam = parseInt(part.value);
            if (part.type === 'minute') menit = parseInt(part.value);
        });

        const waktuSekarang = jam + (menit / 60);

        const jadwalHariIni = jamBuka[hariIni];

        console.log('jadwal hari ini:', jadwalHariIni);

        let statusBuka = false;

        if (jadwalHariIni && jadwalHariIni.buka !== null &&
            waktuSekarang >= jadwalHariIni.buka &&
            waktuSekarang < jadwalHariIni.tutup) {
            statusBuka = true;
        }

        const elStatus = document.getElementById('status-toko');
        const elWaktu = document.getElementById('waktu-sekarang');

        if (!elStatus || !elWaktu) {
            console.error("Elemen 'status-toko' atau 'waktu-sekarang' tidak ditemukan.");
            return;
        }

        const waktuString = `${String(jam).padStart(2, '0')}:${String(menit).padStart(2, '0')} WIB`;
        elWaktu.textContent = waktuString;

        if (statusBuka) {
            elStatus.textContent = 'Buka';
            elStatus.classList.remove('text-red-600', 'font-bold');
            elStatus.classList.add('text-green-600', 'font-bold');
        } else {
            elStatus.textContent = 'Tutup';
            elStatus.classList.remove('text-green-600', 'font-bold');
            elStatus.classList.add('text-red-600', 'font-bold');
        }
    }

    cekStatusToko();

    setInterval(cekStatusToko, 30000);

});