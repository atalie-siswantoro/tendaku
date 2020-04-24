module.exports = async function tambahUser(conn, data, cb) {
    const validation = [];
    if (!data.nm_user) {
      validation.push({
        error: "Nama user diperlukan"
      });
    }
    if (!data.alamat) {
      validation.push({
        error: "Alamat diperlukan"
      });
    }
    if (!data.tlpn) {
     validation.push({
        error: "Telepon diperlukan"
     });
    }
    if (validation.length > 0) {
      cb(validation);
    } else {
      await conn.query(
        "INSERT INTO user (nm_user,alamat,tlpn) VALUES (?,?,?)",
        [data.nm_user, data.alamat, data.tlpn],
        (err, inserted) => {
          if (err) {
            cb(err);
          } else if (inserted) {
            cb(null, {
              status: 200,
              inserted: true,
              msg: "User telah ditambahkan",
              data: inserted
            });
          } else {
            cb("Gagal menambahkan user");
          }
        }
      );
    }
  };