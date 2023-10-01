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
            res.send("Empleado registrado con exito")
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
    console.log(req.body.idempleados);
    console.log(req.body.id);

    db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE idempleados=?' , [nombre, edad, pais, cargo, anios, idempleados], (error, resultado) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al crear empleado' });
        }else{
            res.send("Empleado actualizado con exito")
        }
    });

}

module.exports ={
    crearEmpleado,
    traerEmpleados,
    modificarEmpleado   
}
