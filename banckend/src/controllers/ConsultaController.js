import ConsultaModel from "../models/ConsultaModel.js";

class ConsultaController {
  static async listar(req, res) {
    try {
      const consultas = await ConsultaModel.listarTodas();
      res.json(consultas);
    } catch (error) {
      console.error("Erro ao listar consultas:", error);
      res.status(500).json({ error: "Erro ao listar consultas" });
    }
  }

static async criar(req, res) {
  try {
    let { data, hora, veterinario, animal } = req.body;

    data = data.split("T")[0];

    const novoId = await ConsultaModel.criar({ data, hora, veterinario, animal });

    res.status(201).json({ message: "Consulta cadastrada!", id: novoId });
  } catch (error) {
    console.error("Erro ao criar consulta:", error);
    res.status(500).json({ error: "Erro ao criar consulta" });
  }
}
  static async remover(req, res) {
    try {
      const { id } = req.params;
      await ConsultaModel.remover(id);
      res.json({ message: "Consulta removida!" });
    } catch (error) {
      console.error("Erro ao remover consulta:", error);
      res.status(500).json({ error: "Erro ao remover consulta" });
    }
  }
}

export default ConsultaController;
