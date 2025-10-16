import { UsersModel } from "../models/users.js";

export const handlePatchDatosCuentaBancaria = async (req, res) => {
    try {
        const { id,
            banco,
            numeroCuenta,
            cciCuenta,
            proyecto } = req.body;

        console.log("isCobrar-id: ", id, banco, numeroCuenta, cciCuenta)

        const updatedCuantaUsuario = await UsersModel.findByIdAndUpdate(
            id,
            { $set: { banco, numeroCuenta, cciCuenta } },
            { new: true }
        );

        // Si no se encontró el voucher
        if (!updatedCuantaUsuario) {
            return res.status(402).json({
                message: "Lo Sentimos",
                messageLarge: "No existe en la base de datos",
            });
        }

        // Respuesta exitosa
        return res.status(201).json({
            message: "Utilidad actualizada correctamente",
            voucher: updatedCuantaUsuario,
            status: 201,
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).json({
            message: "Ocurrió un error al actualizar el status",
        });
    }
};