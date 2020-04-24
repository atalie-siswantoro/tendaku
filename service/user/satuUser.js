module.exports = async function satuUser(conn, id, cb) {
    if (!id) {
      cb("kode user tidak ditemukan");
    } else {
      await conn.query(
        "SELECT * FROM user WHERE kd_user = ?",
        id,
        (err, user) => {
          if (err) {
            cb(err);
          } else if (user.length > 0) {
            cb(null, {
              status: 200,
              data: user.map(doc => ({
                kode_user: "UR" + doc.kd_user,
                nama_user: doc.nm_user,
                alamat: doc.alamat,
                tlpn: doc.tlpn
              }))
            });
          } else {
            cb({
              status: 404,
              data: null,
              msg: "Data user tidak ditemukan"
            });
          }
        }
      );
    }
};