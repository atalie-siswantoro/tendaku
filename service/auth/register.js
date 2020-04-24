const bcryptjs = require("bcryptjs");

const tambahUser = require("../user/tambahUser");
const tambahPetugas = require("../petugas/tambahPetugas");

const service = {};

const checkEmail = (conn, email, cb) => {
  conn.query("SELECT * FROM auth WHERE email=?", email, (err, auth) => {
    if (err) {
      cb(err);
    } else if (auth.length > 0) {
      cb("Email telah digunakan");
    } else {
      cb(null, "Email siap digunakan");
    }
  });
};

service.registerUser = async (conn, data, cb) => {
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
  if (data.password !== data.password2) {
    validation.push({
      error: "Password harus sama"
    });
  }
  if (validation.length > 0) {
    cb(validation);
  } else {
    await checkEmail(conn, data.email, (err, result) => {
      if (err) {
        cb(err);
      } else {
        tambahUser(conn, data, (err, result) => {
          if (err) {
            cb(err);
          } else {
            let id = result.data.insertId;
            bcryptjs.hash(data.password, 10, (err, hashed) => {
              if (err) {
                cb(err);
              } else if (hashed) {
                conn.query(
                  "INSERT INTO auth (email,password,role,detail) VALUES (?,?,0,?)",
                  [data.email, hashed, id],
                  (err, inserted) => {
                    if (err) {
                      cb(err);
                    } else if (inserted) {
                      cb(null, {
                        status: 200,
                        registered: true,
                        msg: "Berhasil mendaftarkan user"
                      });
                    } else {
                      cb({
                        status: 400,
                        registered: false,
                        msg: "Gagal mendaftarkan user"
                      });
                    }
                  }
                );
              } else {
                cb("Gagal mendapatkan password");
              }
            });
          }
        });
      }
    });
  }
};

service.registerPetugas = async (conn, data, cb) => {
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
  if (data.password !== data.password2) {
    validation.push({
      error: "Password harus sama"
    });
  }
  if (validation.length > 0) {
    cb(validation);
  } else {
    await checkEmail(conn, data.email, (err, result) => {
      if (err) {
        cb(err);
      } else {
        tambahPetugas(conn, data, (err, result) => {
          if (err) {
            cb(err);
          } else {
            let id = result.data.insertId;
            bcryptjs.hash(data.password, 10, (err, hashed) => {
              if (err) {
                cb(err);
              } else if (hashed) {
                conn.query(
                  "INSERT INTO auth (email,password,role,detail) VALUES (?,?,1,?)",
                  [data.email, hashed, id],
                  (err, inserted) => {
                    if (err) {
                      cb(err);
                    } else if (inserted) {
                      cb(null, {
                        status: 200,
                        registered: true,
                        msg: "Berhasil mendaftarkan Petugas"
                      });
                    } else {
                      cb({
                        status: 400,
                        registered: false,
                        msg: "Gagal mendaftarkan Petugas"
                      });
                    }
                  }
                );
              } else {
                cb("Gagal mendapatkan password");
              }
            });
          }
        });
      }
    });
  }
};

module.exports = service;
