import db1 from '../db/db.js';
import mongoose from 'mongoose';

const pedidosSchema = new mongoose.Schema(
    {
        status: String, // 0: pendiente, 1: entregado, 2: cancelado 
        fechaPedido: String,
        fechaEntregaPedido: String,
        cantidadPaquetes: String,
        kilos: String,
        precioSemanal: String, // 1: efectivo, 2: yape/transferencia
        medioPago: String,
        precio: String,
        lugarEntrega: String,
        direccionEntrega: String,
        pagoTotal: String,
        documentoUsuario: String,
        nombresUsuario: String,
        apellidoPaternoUsuario: String,
        apellidoMaternoUsuario: String,
        usuario: String,
        proyecto: String,
    },
    {
        timestamps: true,
        collection: 'pedidos'
    },
);

const Pedidos = db1.model('Pedidos', pedidosSchema);

export default Pedidos;