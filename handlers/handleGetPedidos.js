import Pedidos from "../models/pedidos.js";

export const handleGetPedidos = async (req, res) => {
    try {
        const query = req.query.documentoUsuario || '';
        console.log('query: ', query);

        const pedidos = await Pedidos.find({
            documentoUsuario: query, // insensitive search
        }); // Limitar a 10 resultados

        return res.status(201).json({
            message: "pedidos obtenmidos desde la base de datos",
            data: pedidos,
            status: 201,
        });
    } catch (error) {
        console.error('Error al buscar pedidos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}