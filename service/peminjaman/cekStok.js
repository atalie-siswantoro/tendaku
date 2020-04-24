module.exports = cekStok = async (conn, id, cb) => {
    if (!id) {
      cb("Kode tenda tidak valid");
    }
    await conn.query("SELECT * FROM tenda WHERE kd_tenda = ?", id, (err, tenda) => {
      if (err) {
        cb(err);
      } else if (tenda.length > 0) {
        if (tenda[0].stok < 0) {
          cb("Stok tenda tidak memadai");
        } else {
          cb(null, {
            msg: "Stok tenda memadai",
            tenda: tenda[0]
          });
        }
      } else {
        cb("Tenda tidak ditemukan");
      }
    });
  };