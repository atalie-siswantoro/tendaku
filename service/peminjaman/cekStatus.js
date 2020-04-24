const moment = require("moment")

module.exports = cekStatus = async (conn, peminjaman, cb) => {
    const status = peminjaman.status
    const kd_tenda = peminjaman.kd_tenda
    const kd_pinjam = peminjaman.no_pinjam
    await conn.query("SELECT durasi FROM tenda WHERE kd_tenda = ?", kd_tenda, (err, durasi) => {
        if (err) {
            cb(err)
        } else {
            conn.query("SELECT * FROM peminjaman WHERE no_pinjam = ?", kd_pinjam, (err, pinjam) => {
                if (err) {
                    cb(err)
                } else if (pinjam.length > 0) {
                    const dataPeminjaman = pinjam[0]
                    const tgl_pengembalian = moment(dataPeminjaman).add(durasi, "d").format("");
                    const today = moment().format();
                    if (tgl_pengembalian > today) {
                        cb(null, {
                            status: 1
                        });
                    } else {
                        cb(null, {
                            status: 2
                        });
                    }
                } else {
                    cb("Data peminjaman tidak ditemukan")
                }
            })
        };
    });
};