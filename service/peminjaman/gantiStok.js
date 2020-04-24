const cekStok = require("./cekStok");

module.exports = gantiStok = async (conn, id, stok, cb) => {
  await cekStok(conn, id, (err, result) => {
    if (err) {
      cb(err);
    } else {
      const tenda = result.tenda;
      const newStok = tenda.stok - stok;
      if (newStok < 0) {
        cb("Jumlah tenda tidak valid");
      } else {
        conn.query(
          "UPDATE tenda SET stok = ? WHERE kd_tenda = ? ",
          [newStok, id],
          (err, ganti) => {
            if (err) {
              cb(err);
            } else if (ganti) {
              cb(null, {
                msg: "Stok tenda berhasil diupdate"
              });
            } else {
              cb("Gagal memperbarui stok tenda");
            }
          }
        );
      }
    }
  });
};