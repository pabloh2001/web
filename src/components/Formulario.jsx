import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const Formulario = () => {
    const dataPersonas = [
        { id: 1, nombre: "Pablo", apellido: "Hoyos" },
        { id: 2, nombre: "Carlos", apellido: "Castro" },
        { id: 3, nombre: "Carlos", apellido: "Ilias" },
        { id: 4, nombre: "Andrés", apellido: "Vega" },
        { id: 5, nombre: "Luisa", apellido: "Ruiz" },
        { id: 6, nombre: "Jenaro", apellido: "Jimenez" },
        { id: 7, nombre: "Dylan", apellido: "Aponte" }
    ];

    const [data, setData] = useState(dataPersonas);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);

    const [persona, setPersona] = useState({
        id: '',
        nombre: '',
        apellido: ''
    });

    const seleccionarPersona = (elemento, caso) => {
        setPersona(elemento);
        (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setPersona((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const editar = () => {
        var dataNueva = data;
        dataNueva.map(p => {
            if (p.id === persona.id) {
                p.apellido = persona.apellido;
                p.nombre = persona.nombre;
            }
        });
        setData(dataNueva);
        setModalEditar(false);
    }

    const eliminar = () => {
        setData(data.filter(pais => pais.id !== persona.id));
        setModalEliminar(false);
    }

    const abrirModalInsertar = () => {
        setPersona(null);
        setModalInsertar(true);
    }

    const insertar = () => {
        var valorInsertar = persona;
        valorInsertar.id = data[data.length - 1].id + 1;
        var dataNueva = data;
        dataNueva.push(valorInsertar);
        setData(dataNueva);
        setModalInsertar(false);
    }

    return (
        <div className="App">
            <h2>Registro de Personas</h2>
            <br />
            <button className="btn btn-success btn-insertar" onClick={() => abrirModalInsertar()}>Insertar</button>
            <br /><br />
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(elemento => (
                        <tr>
                            <td>{elemento.id}</td>
                            <td>{elemento.nombre}</td>
                            <td>{elemento.apellido}</td>
                            <td><button className="btn btn-primary" onClick={() => seleccionarPersona(elemento, 'Editar')}>Editar</button> {"   "}
                                <button className="btn btn-danger" onClick={() => seleccionarPersona(elemento, 'Eliminar')}>Eliminar</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>

            <Modal isOpen={modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Editar País</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID</label>
                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            name="id"
                            value={persona && persona.id}
                        />
                        <br />

                        <label>País</label>
                        <input
                            className="form-control"
                            type="text"
                            name="nombre"
                            value={persona && persona.nombre}
                            onChange={handleChange}
                        />
                        <br />

                        <label>Apellido</label>
                        <input
                            className="form-control"
                            type="text"
                            name="apellido"
                            value={persona && persona.apellido}
                            onChange={handleChange}
                        />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => editar()}>
                        Actualizar
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => setModalEditar(false)}
                    >
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    Estás Seguro que deseas eliminar la persona {persona && persona.nombre}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => eliminar()}>
                        Sí
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setModalEliminar(false)}
                    >
                        No
                    </button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={modalInsertar}>
                <ModalHeader>
                    <div>
                        <h3>Insertar País</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID</label>
                        <input
                            className="form-control"
                            readOnly
                            type="text"
                            name="id"
                            value={data[data.length - 1].id + 1}
                        />
                        <br />

                        <label>País</label>
                        <input
                            className="form-control"
                            type="text"
                            name="nombre"
                            value={persona ? persona.nombre : ''}
                            onChange={handleChange}
                        />
                        <br />

                        <label>Apellido</label>
                        <input
                            className="form-control"
                            type="text"
                            name="apellido"
                            value={persona ? persona.apellido : ''}
                            onChange={handleChange}
                        />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary"
                        onClick={() => insertar()}>
                        Insertar
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => setModalInsertar(false)}
                    >
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Formulario