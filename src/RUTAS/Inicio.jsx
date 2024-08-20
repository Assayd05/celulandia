import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inicio.css';

const Inicio = () => {
    const [celulares, setCelulares] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchCelulares();
    }, []);

    const fetchCelulares = async () => {
        try {
            const response = await axios.get('https://inventarios-api.onrender.com/api/celulares');
            setCelulares(response.data);
        } catch (error) {
            console.error('Error al obtener los celulares:', error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const newCelular = {
                nombre,
                marca,
                precio,
                stock,
                descripcion,
                imagen_url: imagenUrl,
            };

            if (editing) {
                await axios.put(`https://inventarios-api.onrender.com/api/celulares/${editId}`, newCelular);
                setEditing(false);
                setEditId(null);
            } else {
                await axios.post('https://inventarios-api.onrender.com/api/celulares', newCelular);
            }

            fetchCelulares(); 
            setNombre('');
            setMarca('');
            setPrecio('');
            setStock('');
            setDescripcion('');
            setImagenUrl('');
            setShowForm(false); 
            setSuccessMessage('Producto Añadido');
            setTimeout(() => {
                setSuccessMessage(''); 
            }, 3000);
        } catch (error) {
            console.error('Error al crear/editar el celular:', error);
        }
    };

    const handleEdit = (celular) => {
        setNombre(celular.nombre);
        setMarca(celular.marca);
        setPrecio(celular.precio);
        setStock(celular.stock);
        setDescripcion(celular.descripcion);
        setImagenUrl(celular.imagen_url);
        setEditing(true);
        setEditId(celular.id);
        setShowForm(true); 
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://inventarios-api.onrender.com/api/celulares/${id}`);
            fetchCelulares(); 
        } catch (error) {
            console.error('Error al eliminar el celular:', error);
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm); 
    };

    const handlePrecioChange = (e) => {
        const value = parseFloat(e.target.value);
        if (value >= 0) {
            setPrecio(value);
        }
    };

    const handleStockChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 0) {
            setStock(value);
        }
    };

    return (
        <div className="inicio-container">
            <button className="toggle-form-button" onClick={toggleForm}>
                {showForm ? 'Ocultar Formulario' : 'Crear Nuevo Producto'}
            </button>

            {successMessage && <div className="success-message">{successMessage}</div>} 

            {showForm && (
                <form onSubmit={handleCreate} className="formulario">
                    <h2>{editing ? 'Editar Producto' : 'Crear Producto'}</h2>
                    <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    <input type="text" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} required />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={precio}
                        onChange={handlePrecioChange}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={handleStockChange}
                        required
                    />
                    <input type="text" placeholder="URL de la Imagen" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} />
                    <button type="submit">{editing ? 'Editar Producto' : 'Crear Producto'}</button>
                </form>
            )}

            <h2 className="productos-header">Lista de Productos</h2>
            <div className="productos-grid">
                {celulares.map((celular) => (
                    <div className="producto-card" key={celular.id}>
                        <img src={celular.imagen_url} alt={celular.nombre} />
                        <h3>{celular.nombre}</h3>
                        <p>{celular.marca}</p>
                        <p>Precio: ${celular.precio}</p>
                        <p>Stock: {celular.stock}</p>
                        <button onClick={() => handleEdit(celular)}>Editar</button>
                        <button onClick={() => handleDelete(celular.id)}>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inicio;
