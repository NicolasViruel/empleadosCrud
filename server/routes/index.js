const router = require("express").Router();

//importamos rutas
const empleadosRuta =require("../routes/empleadosRuta");

//ROUTERS

//Empleados
router.use('', empleadosRuta);



module.exports = router