import { UsersModel } from "../models/users.js";

export const handleIsCobrarUtilidad = async (req, res) => {
    try {
        const { isCobrar, id } = req.body;

        console.log("isCobrar-id: ", isCobrar, id)

        const updatedUtilidades = await UsersModel.findByIdAndUpdate(
            id,
            { $set: { isCobrar } },
            { new: true }
        );

        // Si no se encontró el voucher
        if (!updatedUtilidades) {
            return res.status(402).json({
                message: "Lo Sentimos",
                messageLarge: "No existe en la base de datos",
            });
        }

        // Respuesta exitosa
        return res.status(201).json({
            message: "CObrar Utilidad actualizado correctamente",
            voucher: updatedUtilidades,
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