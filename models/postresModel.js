var pool = require('./bd');

async function getPostres() {
    var query = 'select * from postres'
    var rows = await pool.query(query);
    return rows;
}
async function deleteNovedadesById(id) {
    var query = 'delete from postres where id = ?'
    var rows = await pool.query(query, [id])
    return rows;
}

async function insertNovedad(obj) {
    try {
        var query = 'insert into postres set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function getNovedadesById(id) {
    var query = 'select * from postres where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarNovedadById(obj, id) {
    try {
        var query = 'update postres set ? where id = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getPostres, deleteNovedadesById, insertNovedad, getNovedadesById, modificarNovedadById };