const express = require('express');
const useragent = require('express-useragent');
const app = express();

// Gunakan middleware express-useragent
app.use(useragent.express());

app.get('/', (req, res) => {
    // Informasi User Agent
    const userAgent = req.useragent;

    // Alamat IP Pengguna
    const ipAddress = req.ip;

    // Resolusi Layar
    const screenWidth = req.query.screenWidth;
    const screenHeight = req.query.screenHeight;

    // Cookie
    const cookies = req.cookies;

    // Informasi Browser dan Sistem Operasi
    const browser = {
        name: userAgent.browser,
        version: userAgent.version,
        os: userAgent.os,
        platform: userAgent.platform,
    };

    // Plugin dan Ekstensi Browser
    const plugins = userAgent.isChrome ? 'Chrome specific plugins' : 'Other browser plugins';

    // Geolokasi (Jika Diizinkan)
    const geolocation = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Versi JavaScript
    const jsVersion = req.headers['sec-ch-ua'];

    // Jenis Perangkat
    const deviceType = userAgent.isMobile ? 'Mobile' : 'Desktop';

    // Referer (Referensi)
    const referer = req.headers.referer;

    // Create an object with the information
    let deviceInfo = {
        'User Agent': userAgent.source,
        'IP Address': ipAddress,
        'Screen Resolution': `${screenWidth}x${screenHeight}`,
        'Cookies': cookies,
        'Browser Info': browser,
        'Browser Plugins': plugins,
        'Geolocation': geolocation,
        'JavaScript Version': jsVersion,
        'Device Type': deviceType,
        'Referer': referer
    };

    // Send the object as a JSON response
    res.json(deviceInfo);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
