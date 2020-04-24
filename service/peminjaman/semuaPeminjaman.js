const moment = require('moment');

const allPinjam = (conn, id, cb) => {
  conn.query(
    'SELECT * FROM di_pinjam INNER JOIN tenda ON di_pinjam.kd_tenda=tenda.tenda INNER JOIN peminjam ON di_pinjam.no_pinjam=peminjam.no_pinjam INNER JOIN user ON peminjam.kd_user=user.kd_user INNER JOIN petugas ON peminjam.kd_petugas=petugas.kd_petugas WHERE id_peminjaman = ?',
    id,
    (err, pinjam) => {
      if (err) {
        cb(err);
      } else if (pinjam.length > 0) {
        let peminjaman = pinjam[0];
        // cek status
        let status = '';
        if (peminjaman.status === 0) {
          status = 'Dikembalikan';
        } else if (peminjaman.status === 1) {
          status = 'Dipinjam';
        } else if (peminjaman.status === 2) {
          status = 'Terlambat';
        } else {
          cb({
            status: 500,
            msg: 'Internal server error',
          });
        }
        // filter data
        let data = pinjam.map((p) => ({
          status: status,
          user: p.nm_user,
          petugas: p.nm_petugas,
          tenda: p.nm_tenda,
          durasi: p.durasi,
          tarif: p.tarif,
          tgl_pinjam: p.tgl_pinjam,
          tgl_kembali: moment(p.tgl_pinjam).add(p.durasi, 'd').format(),
        }));
        cb(null, data[0]);
      } else {
        cb({
          peminjaman: null,
        });
      }
    }
  );
};

const pinjamData = (conn, data, cb) => {
  let pinjam = [];
  data.map((p, i) => {
    allPinjam(conn, p.id_peminjaman, (err, peminjaman) => {
      if (err) {
        return cb(err);
      } else {
        pinjam.push(peminjaman);
        if (pinjam.length === data.length) {
          return cb(null, pinjam);
        }
      }
    });
  });
};

module.exports = semuaPeminjaman = async (conn, cb) => {
  await conn.query('SELECT * FROM di_pinjam', (err, pinjam) => {
    if (err) {
      cb(err);
    } else if (pinjam.length > 0) {
      pinjamData(conn, pinjam, (err, data) => {
        if (err) {
          cb(err);
        } else {
          cb(null, data);
        }
      });
    } else {
      cb({
        status: 404,
        msg: 'Data peminjaman kosong',
      });
    }
  });
};
