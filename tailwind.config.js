/** @type {import('tailwindcss').Config} */
module.exports = {
    // Baris inilah yang paling penting
    // Ini memberitahu ekstensi VS Code untuk
    // memindai SEMUA file .html di proyek Anda
    content: [
        "./**/*.html"
    ],

    // Bagian ini bisa Anda kosongkan
    // karena konfigurasi aslinya Anda atur di CDN
    theme: {
        extend: {},
    },
    plugins: [],
}