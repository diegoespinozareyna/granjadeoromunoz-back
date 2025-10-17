// models/User.js
import db from '../db/db.js';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        // Datos de cuenta
        role: String,
        userType: String,
        password: String,
        statusActive: String, // 0: inactivo, 1: activo, 2: retirado

        // Datos personales
        documentoUsuario: String,
        nombres: String,
        apellidoPaterno: String,
        apellidoMaterno: String,
        celular: String,
        direccion: String,
        distrito: String,
        provincia: String,
        departamento: String,
        membresia500: String,
        menbresia200: String,

        //utilidades
        isCobrar: String, // 0: no, 1: si
        banco: String,
        numeroCuenta: String,
        cciCuenta: String,
        titularCuenta: String,
        //cobro utilidades
        utilidad1: String,
        utilidad2: String,
        utilidad3: String,
        utilidad4: String,
        utilidad5: String,
        utilidad6: String,
        utilidad7: String,
        utilidad8: String,
        utilidad9: String,
        utilidad10: String,
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

const UsersModel = db.model('Users', userSchema);

export { UsersModel };