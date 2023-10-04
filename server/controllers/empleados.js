//Cuando importas esto en tu controlador, deberías acceder a la propiedad db:
const { db } = require("../database/index");

const crearEmpleado = (req, res) => {
    const { nombre, edad, pais, cargo, anios } = req.body;
    //simplemente estoy prometiendo que voy a mandar esos valores
    db.query('INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)', [nombre, edad, pais, cargo, anios], (error, resultado) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al crear empleado' });
        }else{
            res.send(resultado)
        }
    });
};

const traerEmpleados = (req, res) => {
 
    db.query('SELECT * FROM empleados', (error, resultado) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al crear empleado' });
        }else{
            res.send(resultado)
        }
    });
};

const modificarEmpleado = (req, res) =>{
    const { idempleados, nombre, edad, pais, cargo, anios } = req.body;

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE idempleados=?' , [nombre, edad, pais, cargo, anios, idempleados], (error, resultado) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al crear empleado' });
        }else{
            res.send(resultado)
        }
    });

}

const borrarEmpleado = (req, res) => {
    const { idempleados } = req.params;

    db.query('DELETE FROM empleados WHERE idempleados = ?', [idempleados], (error, resultado) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al eliminar empleado' });
        } else {
            // Verifica si se eliminó alguna fila
            if (resultado.affectedRows > 0) {
                // Se eliminó al menos una fila, enviar respuesta de éxito
                res.send('Empleado eliminado con éxito');
            } else {
                // No se encontró el empleado con el ID dado
                res.status(404).json({ error: 'Empleado no encontrado' });
            }
        }
    });
};

module.exports ={
    crearEmpleado,
    traerEmpleados,
    modificarEmpleado,
    borrarEmpleado,   
}
