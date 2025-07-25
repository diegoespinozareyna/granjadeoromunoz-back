import Planilla from "../models/planilla.js";

export const handleEditarContratoReserva = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de editarContrato: ", body)

        const contractOne = await Planilla.findOne({ numero: body?.prevNumero }).exec();
        console.log("contractOne: ", contractOne)

        const editarContrato = await Planilla.updateOne(
            { numero: body?.prevNumero },
            {
                $set: {
                    numero: body?.numero,
                    fechaInicio: body?.fechaInicio,
                    fechaReserva: body?.fechaReserva,
                    status: body?.status,
                    contrato: {
                        ...contractOne?.contrato,
                        numero: body?.numero,
                        habitacion: body?.numeroHabitacion,
                        fechaIngreso: body?.fechaInicio,
                        fechaReserva: body?.fechaReserva,
                        tarifaContrato: body?.tarifaContrato,
                    },
                }
            },
            { new: true }
        );

        console.log("newContract: ", editarContrato)

        res.status(201).json({
            message: 'Contato editado',
            data: editarContrato, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}