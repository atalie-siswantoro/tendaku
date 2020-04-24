const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const cekAuth = require("./cekAuth");

module.exports = login = async (conn, data, cb) => {
  const validation = [];
  if (!data.email) {
    validation.push({
      error: "Email tidak boleh kosong"
    });
  }
  if (!data.password) {
    validation.push({
      error: "Password tidak boleh kosong"
    });
  }
  if (validation.length > 0) {
    cb(validation);
  } else {
    await cekAuth(conn, data.email, (err, datas) => {
      if (err) {
        cb(err);
      } else {
        bcryptjs.compare(data.password, datas.password, (err, match) => {
          if (err) {
            cb(err);
          } else if (match) {
            if (datas.role === 1) {
              conn.query(
                "SELECT * FROM auth INNER JOIN petugas ON auth.detail=petugas.kd_petugas WHERE id_auth = ? ",
                datas.id_auth,
                (err, petugas) => {
                  if (err) {
                    cb(err);
                  } else if (petugas.length > 0) {
                    let token = jwt.sign(
                      {
                        email: petugas[0].email,
                        role: petugas[0].role,
                        nm_petugas: petugas[0].nm_petugas,
                        jabatan: petugas[0].jabatan,
                        tlpn_petugas: petugas[0].tlpn_petugas
                      },
                      "tendaku"
                    );
                    cb(null, {
                      status: 200,
                      login: true,
                      data: {
                        token: token
                      },
                      msg: "Login berhasil"
                    });
                  } else {
                    cb("Detail petugas tidak ditemukan");
                  }
                }
              );
            } else {
              conn.query(
                "SELECT * FROM auth INNER JOIN user ON auth.detail=user.kd_user WHERE id_auth=?",
                datas.id_auth,
                (err, user) => {
                  if (err) {
                    cb(err);
                  } else if (user.length > 0) {
                    let token = jwt.sign(
                      {
                        email: user[0].email,
                        role: user[0].role,
                        nm_user: user[0].nm_user,
                        alamat: user[0].alamat,
                        tlpn: user[0].tlpn
                      },
                      "tendaku"
                    );
                    cb(null, {
                      status: 200,
                      login: true,
                      data: {
                        token: token
                      },
                      msg: "Login berhasil"
                    });
                  } else {
                    cb("Detail user tidak ditemukan");
                  }
                }
              );
            }
          } else {
            cb("Password tidak sama");
          }
        });
      }
    });
  }
};
