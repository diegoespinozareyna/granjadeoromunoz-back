import { UsersModel } from "../models/users.js";

export const handlePatchZeroUtilidades = async (req, res) => {
    try {
        const { id,
            utilidad1,
            utilidad2,
            utilidad3,
            utilidad4,
            utilidad5,
            utilidad6,
            utilidad7,
            utilidad8,
            utilidad9,
            utilidad10, } = req.body;

        console.log("isCobrar-id123: ", id)

        // const id = id;

        const updatedCuantaUsuario = await UsersModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    utilidad1,
                    utilidad2,
                    utilidad3,
                    utilidad4,
                    utilidad5,
                    utilidad6,
                    utilidad7,
                    utilidad8,
                    utilidad9,
                    utilidad10,
                }
            },
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