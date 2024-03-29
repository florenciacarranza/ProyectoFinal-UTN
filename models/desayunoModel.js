var pool = require('./bd');

async function getDesayuno() {
    var query = 'select * from desayuno'
    var rows = await pool.query(query)
    return rows;;
}
async function deleteNovedadesById(id) {
    var query = 'delete from desayuno where id = ?'
    var rows = await pool.query(query, [id])
    return rows;
}
async function insertNovedad(obj) {
    try {
        var query = 'insert into desayuno set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function getNovedadesById(id) {
    var query = 'select * from desayuno where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarNovedadById(obj, id) {
    try {
        var query = 'update desayuno set ? where id = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}
async function buscarNovedad(busqueda) {
    var query = 'select * from desayuno where titulo like ? OR descripcion like ?';
    var rows = await pool.query(query, ['%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;
}

module.exports = { getDesayuno, deleteNovedadesById, insertNovedad, getNovedadesById, modificarNovedadById, buscarNovedad };