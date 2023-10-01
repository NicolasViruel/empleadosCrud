const express = require("express");
const controllerEmp = require("../controllers/empleados");
const router = express.Router();


router.post("/create", controllerEmp.crearEmpleado);

router.get("/empleados", controllerEmp.traerEmpleados);  

router.put("/actualizar", controllerEmp.modificarEmpleado);  


module.exports = router;