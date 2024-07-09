const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
const socket = require('socket.io');
const path = require('path');

const app = express();

// Dodajte cors middleware
app.use(cors());
app.use(express.static('public'));

let data1 = []; // Inicijalno prazan niz za podatke
let data2 = [];
let data3 = [];
let data4 = [];
// Funkcija za učitavanje podataka iz CSV fajla
function loadCSVData() {
    data1 = []; // Resetujemo niz podataka
    fs.createReadStream('podaci1.csv')
        .pipe(csv())
        .on('data', (row) => {
            data1.push(row);
        })
        .on('end', () => {
            console.log('Podaci seta 1 učitani');
            // Emitujemo novi niz podataka kada se podaci ažuriraju
            io.emit('podaciAzurirani', data1);
        })
        .on('error', (error) => {
            console.error('Greška prilikom učitavanja podataka:', error.message);
        });

        data2 = []; // Resetujemo niz podataka
        fs.createReadStream('podaci1.csv')
            .pipe(csv())
            .on('data', (row) => {
                data2.push(row);
            })
            .on('end', () => {
                console.log('Podaci seta 2 učitani');
                // Emitujemo novi niz podataka kada se podaci ažuriraju
                io.emit('podaciAzurirani', data2);
            })
            .on('error', (error) => {
                console.error('Greška prilikom učitavanja podataka:', error.message);
            });


            data3 = []; // Resetujemo niz podataka
            fs.createReadStream('podaci_za_ljubuski.csv')
                .pipe(csv())
                .on('data', (row) => {
                    data3.push(row);
                })
                .on('end', () => {
                    console.log('Podaci seta 3 učitani');
                    // Emitujemo novi niz podataka kada se podaci ažuriraju
                    io.emit('podaciAzurirani', data3);
                })
                .on('error', (error) => {
                    console.error('Greška prilikom učitavanja podataka:', error.message);
                });


                data4 = []; // Resetujemo niz podataka
                fs.createReadStream('podaci2.csv')
                    .pipe(csv())
                    .on('data', (row) => {
                        data4.push(row);
                    })
                    .on('end', () => {
                        console.log('Podaci seta 4 učitani');
                        // Emitujemo novi niz podataka kada se podaci ažuriraju
                        io.emit('podaciAzurirani', data4);
                    })
                    .on('error', (error) => {
                        console.error('Greška prilikom učitavanja podataka:', error.message);
                    });
}

// Socket.io za emitovanje podataka klijentskoj strani
const server = app.listen(3001, () => {
    console.log('Server pokrenut na portu 3001');
});

const io = socket(server);

// API za dohvat podataka
app.get('/podaci', (req, res) => {
    const csvSelect = req.query.csvSelect;

    if (csvSelect === '1') {
        res.json(data1);
    } else if (csvSelect === '2') {
        res.json(data2);
    } else if (csvSelect === '3') {
        res.json(data3);
    } else if (csvSelect === '4') {
        res.json(data4);
    } else {
        res.status(400).json({ error: 'Invalid csvSelect value' });
    }
});

app.get('/', (req, res) => {
    // Resolve the path to selection.html
    const filePath = path.join(__dirname, 'index.html');

    // Send the HTML file as the response
    res.sendFile(filePath);
});

app.get('/graph', (req, res) => {
    // Resolve the path to selection.html
    const filePath = path.join(__dirname, 'data.html');

    // Send the HTML file as the response
    res.sendFile(filePath);
});

// Prati izmjene u CSV fajlu
fs.watch('podaci1.csv', (eventType, filename) => {
    if (eventType === 'change') {
        console.log(`Fajl ${filename} je ažuriran`);
        // Učitaj nove podatke iz CSV fajla
        loadCSVData();
    }
});

fs.watch('podaci2.csv', (eventType, filename) => {
    if (eventType === 'change') {
        console.log(`Fajl ${filename} je ažuriran`);
        // Učitaj nove podatke iz CSV fajla
        loadCSVData();
    }
});

fs.watch('podaci_za_ljubuski.csv', (eventType, filename) => {
    if (eventType === 'change') {
        console.log(`Fajl ${filename} je ažuriran`);
        // Učitaj nove podatke iz CSV fajla
        loadCSVData();
    }
});


// Pozivamo funkciju za učitavanje podataka kada se server pokrene
loadCSVData();