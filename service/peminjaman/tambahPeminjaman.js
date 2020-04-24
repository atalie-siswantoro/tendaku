const cekStok = require("./cekStok");
const gantiStok = require("./gantiStok");
const cekPetugas = require("../petugas/cekPetugas");
const cekUser = require("../user/cekUser");

module.exports = tambahPeminjaman = async (conn, data, cb) => {
  const validation = [];
  if (!data.kd_petugas) {
    validation.push({
      error: "Petugas diperlukan"
    });
  }
  if (!data.kd_user) {
    validation.push({
      error: "User diperlukan"
    });
  }
  if (!data.kd_tenda) {
    validation.push({
      error: "Tenda diperlukan"
    });
  }
  if (!data.jumlah) {
    validation.push({
      error: "Jumlah tenda diperlukan"
    });
  }
  if (validation.length > 0) {
    cb(validation);
  } else {
    await cekStok(conn, data.kd_tenda, (err, stok) => {
      if (err) {
        cb(err);
      } else {
        cekUser(conn, data.kd_user, (err, user) => {
          if (err) {
            cb({
              msg: "Gagal melakukan peminjaman",
              error: err
            });
          } else {
            cekPetugas(conn, data.kd_petugas, (err, petugas) => {
              if (err) {
                cb({
                  msg: "Gagal melakukan peminjaman",
                  error: err
                });
              } else {
                conn.query(
                  "INSERT INTO peminjam (kd_petugas,kd_user,tgl_pinjam) VALUES (?,?,NOW())",
                  [data.kd_petugas, data.kd_user],
                  (err, inserted) => {
                    if (err) {
                      cb(err);
                    } else if (inserted) {
                      conn.query(
                        "INSERT INTO di_pinjam (no_pinjam,kd_tenda,status) VALUES (?,?,1)",
                        [inserted.insertId, data.kd_tenda],
                        (err, pinjam) => {
                          if (err) {
                            cb(err);
                          } else if (pinjam) {
                            gantiStok(
                              conn,
                              data.kd_tenda,
                              data.jumlah,
                              (err, ganti) => {
                                if (err) {
                                  cb(err);
                                } else {
                                  cb(null, {
                                    status: 200,
                                    peminjaman: true,
                                    msg: "Berhasil melakukan peminjaman",
                                    data: pinjam
                                  });
                                }
                              }
                            );
                          } else {
                            cb("Gagal melakukan peminjaman");
                          }
                        }
                      );
                    } else {
                      cb("Gagal melakukan peminjaman");
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
  }
};
