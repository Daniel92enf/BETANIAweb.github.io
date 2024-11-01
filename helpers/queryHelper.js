const pool = require('../libs/db'); // Importa el pool de conexiones

async function executeQuery(sql, params) {
  try {
    // Sanitizar parámetros
    const sanitizedParams = params.map(param => (param === undefined ? null : param));
    console.log('Parámetros:', sanitizedParams);
    
    const [results] = await pool.execute(sql, sanitizedParams);
    return results;
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error.message);
    throw error;
  }
}

module.exports = executeQuery;
