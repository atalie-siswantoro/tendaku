module.exports = editPeminjaman = async (conn, id, status, cb) => {
    conn.query(
      'UPDATE di_pinjam SET status = ? WHERE id_peminjaman = ?',
      [status, id],
      (err, updated) => {
        if (err) {
          cb(err);
        } else if (updated) {
          cb(null, {
            status: 200,
            msg: 'Status berhasil diubah',
          });
        } else {
          cb({
            status: 500,
            msg: 'Internal server error',
          });
        }
      }
    );
  };
  