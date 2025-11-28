import ConsultaModel from "../models/ConsultaModel.js";

class ConsultaController {
  static async listar(req, res) {
    try {
      const { veterinario, animal, data } = req.query;

      if (veterinario)
        return res.json(await ConsultaModel.buscarPorVeterinario(veterinario));

      if (animal)
        return res.json(await ConsultaModel.buscarPorAnimal(animal));

      if (data)
        return res.json(await ConsultaModel.buscarPorData(data));

      const consultas = await ConsultaModel.listarTodas();
      res.json(consultas);

    } catch (error) {
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
      res.status(500).json({ error: "Erro ao criar consulta" });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const atualizado = await ConsultaModel.atualizar(id, req.body);

      if (!atualizado) {
        return res.status(404).json({ error: "Consulta não encontrada" });
      }

      res.json({ message: "Consulta atualizada!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar consulta" });
    }
  }

  static async remover(req, res) {
    try {
      const { id } = req.params;
      await ConsultaModel.remover(id);
      res.json({ message: "Consulta removida!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao remover consulta" });
    }
  }
}

export default ConsultaController;
