import { useState, useEffect, useRef  } from "react";
import Axios from "axios";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState("");
  const [idempleados, setIdEmpleados] = useState();

  //creamos la lista de empleados
  const [empleadosList, setEmpleados] = useState([]);
  const [editar, setEditar] = useState(false);
  //Focus al formulario
  const formularioRef = useRef(null);

  const add = async () => {

    // Verificar si los campos están llenos
    if (!nombre || !edad || !pais || !cargo || !anios) {
    // Mostrar un mensaje de error o realizar alguna acción adicional
    toast.error("Por favor, completa todos los campos.");
    return;
    }
    try {
      await Axios.post(`${process.env.VITE_BACKEND}/create`, {
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios,
      });
      getEmpleados();
      limpiar();
      toast.success("👾 Empleado Registrado!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error al registrar empleado:", error);
    }
  };

  const update = async () => {
    try {
      await Axios.put("http://localhost:3001/api/actualizar", {
        idempleados: idempleados,
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios,
      });
      getEmpleados();
      limpiar();
      toast.success("🌈 Cambios Realizados!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error al registrar empleado:", error);
    }
  };

  const handleEliminarUsuario = (idempleados) => {
    toast.info(
      <div>
        ¿Estás seguro de que deseas eliminar este usuario?
        <Button
          className="btn btn-danger"
          onClick={() => {
            // Lógica para eliminar el usuario aquí
            eliminarUsuario(idempleados);
            toast.dismiss(); // Cierra el mensaje de confirmación
          }}
        >
          Sí, Eliminar
        </Button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      }
    );
  };

  const eliminarUsuario = async (idempleados) => {
    try {
      await Axios.delete(`http://localhost:3001/api/borrar/${idempleados}`, {});
      getEmpleados();
      // limpiar()
      toast.error("💀Empleado Eliminado!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error al registrar empleado:", error);
    }
  };

  const limpiar = async () => {
    try {
      setNombre("");
      setEdad("");
      setPais("");
      setCargo("");
      setAnios("");
      setIdEmpleados("");
      setEditar(false);
      toast("🦄 Se limpiaron los campos!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error al registrar empleado:", error);
    }
  };

  const getEmpleados = async () => {
    try {
      const response = await Axios.get(`${process.env.VITE_BACKEND}/empleados`);
      setEmpleados(response.data);
    } catch (error) {
      // Maneja el error aquí
      console.error("Error al obtener empleados:", error);
    }
  };

  const editarEmpleado = async (value) => {
    if (formularioRef.current) {
      formularioRef.current.scrollIntoView({ behavior: "smooth" });
      formularioRef.current.focus(); // Enfoca el formulario
    }
    try {
      setEditar(true);
      setNombre(value.nombre);
      setEdad(value.edad);
      setCargo(value.cargo);
      setPais(value.pais);
      setAnios(value.anios);
      setIdEmpleados(value.idempleados);
    } catch (error) {
      console.error("Error al editar el empleado:", error);
    }
  };

  useEffect(() => {
    return () => {
      getEmpleados();
    };
  }, []);

  return (
    <div className="App" ref={formularioRef}>
      <Container className="mt-5">
        <div className="card">
          <div className="card-header">
            <h2 className="text-center">Gestion de empleados</h2>
          </div>
          <Row className="justify-content-start">
            <Col xs={12} md={6} className="mx-auto text-center">
              <Form className="card-body">
                <Form.Group controlId="formNombre">
                  <Form.Label className="text-start">Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre"
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formEdad">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese su edad"
                    value={edad}
                    onChange={(e) => {
                      setEdad(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formPais">
                  <Form.Label>País</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su país"
                    value={pais}
                    onChange={(e) => {
                      setPais(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formCargo">
                  <Form.Label>Cargo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su cargo"
                    value={cargo}
                    onChange={(e) => {
                      setCargo(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formAnios">
                  <Form.Label>Años de experiencia</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese años de experiencia"
                    value={anios}
                    onChange={(e) => {
                      setAnios(e.target.value);
                    }}
                  />
                </Form.Group>
                {editar == true ? (
                  <div>
                    <Button
                      className="my-2 mx-2 btn btn-primary"
                      onClick={update}
                    >
                      Actualizar
                    </Button>{" "}
                    <Button
                      className="my-2 mx-2 btn btn-danger"
                      onClick={limpiar}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button className="my-2 mx-3 btn btn-success" onClick={add}>
                    Registrar
                  </Button>
                )}

                {/* <Button className="my-2 btn btn-danger" onClick={getEmpleados}>
                listar
              </Button> */}
              </Form>
            </Col>
            <Col md={6} className="d-none d-xxl-block text-center">
              <img
                src="/fotoprogramador.jpg"
                alt="logo"
                width="600"
                className="my-4"
              />
            </Col>
          </Row>
        </div>
      </Container>
      <div className="table-responsive">
        <Table striped bordered hover variant="dark" className="mt-3">
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Pais</th>
              <th>Cargo</th>
              <th>Experiencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {empleadosList.map((value, key) => {
              return (
                <tr key={value.idempleados}>
                  <th>{value.idempleados}</th>
                  <td>{value.nombre}</td>
                  <td>{value.edad}</td>
                  <td>{value.pais}</td>
                  <td>{value.cargo}</td>
                  <td>{value.anios}</td>
                  <td className="text-center" width={200}>
                    <Button
                      className="my-2 btn btn-success"
                      onClick={(e) => editarEmpleado(value)}
                    >
                      Editar
                    </Button>

                    <Button
                      className="my-2 mx-2 btn btn-danger"
                      onClick={() => handleEliminarUsuario(value.idempleados)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
