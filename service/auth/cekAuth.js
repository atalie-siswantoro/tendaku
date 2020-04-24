module.exports = async function checking(conn, email, cb) {
    conn.query("SELECT * FROM auth WHERE email=?", email, (err, auth) => {
      if (err) {
        cb(err);
      } else if (auth.length > 0) {
        cb(null, auth[0]);
      } else {
        cb("Email telah digunakan");
      }
    });
  };
  
  