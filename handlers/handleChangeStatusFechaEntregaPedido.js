import Pedidos from "../models/pedidos.js";

export const handleChangeStatusFechaEntregaPedido = async (req, res) => {
    try {
        const body = await req.body;

        const { fechaEntregaPedido, id } = body;

        console.log("body de changeStatusPedido: ", body)

        const patchfechaEntregaPedido = await Pedidos.findByIdAndUpdate(id, { fechaEntregaPedido: fechaEntregaPedido }, { new: true });

        // Si no se encontró el voucher
        if (!patchfechaEntregaPedido) {
            return res.status(402).json({
                message: "Lo Sentimos",
                messageLarge: "Pedido no existe o ha sido borrado de la base de datos",
            });
        }

        // Respuesta exitosa
        return res.status(201).json({
            message: "Status actualizado correctamente",
            pedido: patchfechaEntregaPedido,
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