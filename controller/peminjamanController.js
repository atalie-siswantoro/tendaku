const controller = {};

const tambahPeminjaman = require('../service/peminjaman/tambahPeminjaman');
const cek = require('../service/peminjaman/cekPeminjaman');
const semuaPeminjaman = require('../service/peminjaman/semuaPeminjaman');
const editPeminjaman = require('../service/peminjaman/editPeminjaman');
const hapusPeminjaman = require('../service/peminjaman/hapusPeminjaman');

controller.tambahPeminjaman = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let data = req.body;
      tambahPeminjaman(conn, data, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.cekPinjam = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      cek(conn, id, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.semuaPeminjaman = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      semuaPeminjaman(conn, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.editPeminjaman = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      let status = req.params.status;
      editPeminjaman(conn, id, status, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

controller.hapusPeminjaman = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.send(err);
    } else {
      let id = req.params.kode;
      hapusPeminjaman(conn, id, (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
    }
  });
};

module.exports = controller;
