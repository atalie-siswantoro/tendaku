const express = require('express');
const app = express();
const userController = require('../controller/userController');
const petugasController = require('../controller/petugasController');
const tendaController = require('../controller/tendaController');
const authController = require('../controller/authController');
const cekToken = require('../middleware/cekToken');
const cekAdmin = require('../middleware/cekAdmin');
const peminjamanController = require('../controller/peminjamanController');

app.post('/user', [cekToken, cekAdmin], userController.tambahUser);
app.get('/user', [cekToken, cekAdmin], userController.semuaUser);
app.get('/user/:kode', [cekToken, cekAdmin], userController.satuUser);
app.put('/user/:kode', [cekToken, cekAdmin], userController.editUser);
app.delete('/user/:kode', [cekToken, cekAdmin], userController.hapusUser);

app.post('/petugas', [cekToken, cekAdmin], petugasController.tambahPetugas);
app.get('/petugas', [cekToken, cekAdmin], petugasController.semuaPetugas);
app.get('/petugas/:kode', [cekToken, cekAdmin], petugasController.satuPetugas);
app.put('/petugas/:kode', [cekToken, cekAdmin], petugasController.editPetugas);
app.delete('/petugas/:kode', [cekToken, cekAdmin], petugasController.hapusPetugas);

app.post('/tenda', [cekToken, cekAdmin], tendaController.tambahTenda); 
app.get('/tenda', [cekToken], tendaController.semuaTenda);
app.get('/tenda/:kode', [cekToken], tendaController.satuTenda);
app.put('/tenda/:kode', [cekToken, cekAdmin], tendaController.editTenda);
app.delete('/tenda/:kode', [cekToken, cekAdmin], tendaController.hapusTenda); 

app.post('/register/user', authController.registerUser);
app.post('/register/petugas', authController.registerPetugas);
app.post('/login', authController.login);

app.get('/pinjam', [cekToken], peminjamanController.semuaPeminjaman);
app.get('/pinjam/:kode', [cekToken], peminjamanController.cekPinjam);
app.put('/pinjam/:kode/:status', [cekToken, cekAdmin], peminjamanController.editPeminjaman); 
app.delete('/pinjam/:kode', [cekToken, cekAdmin], peminjamanController.hapusPeminjaman);

app.get('/', (req, res) => res.send('Hello World!'));

module.exports = app;
