// models/User.js
import db from '../db/db.js';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        // Datos de cuenta
        role: String,
        userType: String,
        password: String,
        statusActive: String,

        // Datos personales
        documentoUsuario: String,
        nombres: String,
        apellidoPaterno: String,
        apellidoMaterno: String,
        celular: String,
        email: String,
        fechaNacimiento: String,
        direccion: String,
        estadoCivil: String,
        ocupacion: String,

        // Datos corporativos (si aplica)
        empresa: String,
        ruc: String,
        razonSocial: String,
        rucEmpresa: String,

        // Datos específicos de hotel
        tipoHuesped: String,
        ultimaHabitacionUsada: String,
        metodoPagoPreferido: String,
        nivelFidelizacion: String,

        // Historial de estancias
        historial: [
            {
                numeroContrato: String,
                numeroHabitacion: String,
                fechaInicio: String,
                fechaFin: String,
                tarifaContrato: String,
                comentarios: String
            }
        ],
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

const UsersModel = db.model('Users', userSchema);

export { UsersModel };