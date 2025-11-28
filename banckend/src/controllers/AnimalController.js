import AnimalModel from "../models/AnimalModel.js";

class AnimalController {

  static async listar(req, res) {
    try {
      const { termo } = req.query;
      let animais;

      if (termo) {
        animais = await AnimalModel.buscarPorTermo(termo);
      } else {
        animais = await AnimalModel.listarTodos();
      }

      return res.status(200).json(animais);
    } catch (error) {
      console.error("Erro ao listar animais:", error);
      return res.status(500).json({ mensagem: "Erro ao listar animais" });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const animal = await AnimalModel.buscarPorId(id);

      if (!animal) {
        return res.status(404).json({ mensagem: "Animal não encontrado" });
      }

      return res.status(200).json(animal);
    } catch (error) {
      console.error("Erro ao buscar animal:", error);
      return res.status(500).json({ mensagem: "Erro ao buscar animal" });
    }
  }

  static async criar(req, res) {
    try {
      const { nome, especie, idade, raca } = req.body;

      const novoAnimal = await AnimalModel.criar({ nome, especie, idade, raca });
      return res.status(201).json(novoAnimal);

    } catch (error) {
      console.error("Erro ao cadastrar animal:", error);
      return res.status(500).json({ mensagem: "Erro ao cadastrar animal" });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, especie, idade, raca } = req.body;

      const atualizado = await AnimalModel.atualizar(
        id,
        { nome, especie, idade, raca }
      );

      if (!atualizado) {
        return res.status(404).json({ mensagem: "Animal não encontrado" });
      }

      return res.status(200).json({ mensagem: "Animal atualizado" });

    } catch (error) {
      console.error("Erro ao atualizar animal:", error);
      return res.status(500).json({ mensagem: "Erro ao atualizar animal" });
    }
  }

  static async remover(req, res) {
    try {
      const { id } = req.params;

      const removido = await AnimalModel.remover(id);

      if (!removido) {
        return res.status(404).json({ mensagem: "Animal não encontrado" });
      }

      return res.status(200).json({ mensagem: "Animal removido" });

    } catch (error) {
      console.error("Erro ao remover animal:", error);
      return res.status(500).json({ mensagem: "Erro ao remover animal" });
    }
  }
}

export default AnimalController;
