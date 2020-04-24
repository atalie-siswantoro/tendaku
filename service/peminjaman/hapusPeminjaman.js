const getPeminjaman = (conn, id, cb) => {
    conn.query('SELECT * FROM di_pinjam WHERE id_peminjaman = ?', id, (err, pinjam) => {
      if (err) {
        cb(err);
      } else if (pinjam.length) {
        cb(null, pinjam[0]);
      } else {
        cb({
          status: 404,
          msg: 'Data tidak ditemukan',
        });
      }
    });
  };
  
  const hapusDiPinjam = (conn, id, cb) => {
    conn.query('DELETE FROM di_pinjam WHERE id_peminjaman = ?', id, (err, deleted) => {
      if (err) {
        cb(err);
      } else if (deleted) {
        cb(null, {
          status: 200,
          msg: 'Berhasil menghapus peminjaman',
        });
      } else {
        cb({
          status: 500,
          msg: 'Internal server error',
        });
      }
    });
  };
  
  const hapusPinjam = (conn, no_pinjam, cb) => {
    conn.query('DELETE FROM peminjam WHERE no_pinjam = ?', no_pinjam,( err, deleted) => {
      if (err) {
        cb(err);
      } else if (deleted) {
        cb(null, true);
      } else {
        cb({
          status: 500,
          msg: 'Internal server error',
        });
      }
    });
  };
  
  module.exports = hapusPeminjaman = async (conn, id, cb) => {
    await getPeminjaman(conn, id, (err, pinjam) => {
      if (err) {
        cb(err);
      } else {
        hapusPinjam(conn, pinjam.no_pinjam, (err, del) => {
          if (err) {
            cb(err);
          } else {
            hapusDiPinjam(conn, pinjam.id_peminjaman, (err, deleted) => {
              if (err) {
                cb(err);
              } else {
                cb(null, deleted);
              }
            });
          }
        });
      }
    });
  };
  