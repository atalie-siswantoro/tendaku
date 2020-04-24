module.exports = async function tambahPetugas(conn, data, cb) {
    const validation = [];
    if (!data.nm_petugas) {
      validation.push({
        error: "Nama petugas diperlukan"
      });
    }
    if (!data.jabatan) {
      validation.push({
        error: "Jabatan diperlukan"
      });
    }
    if (!data.tlpn_petugas) {
     validation.push({
        error: "Telepon diperlukan"
     });
    }
    if (validation.length > 0) {
      cb(validation);
    } else {
      conn.query(
        "INSERT INTO petugas (nm_petugas,jabatan,tlpn_petugas) VALUES (?,?,?)",
        [data.nm_petugas, data.jabatan, data.tlpn_petugas],
        (err, inserted) => {
          if (err) {
            cb(err);
          } else if (inserted) {
            cb(null, {
              status: 200,
              inserted: true,
              msg: "Petugas telah ditambahkan",
              data: inserted
            });
          } else {
            cb("Gagal menambahkan petugas");
          }
        }
      );
    }
  };