import AnimalModel from "../models/AnimalModel.js";

class AnimalController{

    static async listar(req, res){
        try {

            const {termo} = req.query;
            let animais;

            if(termo){
                animais = await AnimalModel.buscarPorTermo(termo);
            }else{
                animais = await AnimalModel.listarTodos()
            }

            res.json(animais)
            
            } catch (error){
                console.error('Erro ao listar os animais:', error);
                res.status(500).json({error: 'Erro ao listar os animais'});
            }
    
    }

    // Buscar por ID
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const animal = await AnimalModel.buscarPorId(id);

            if (!animal) {
                return res.status(404).json({ error: "Animal não encontrado" });
            }

            res.json(animal);

        } catch (error) {
            console.error("Erro ao buscar animal:", error);
            res.status(500).json({ error: "Erro interno ao buscar animal" });
        }
    }

    static async criar(req, res) {
        try {
            const { nome, especie, idade } = req.body;

            if (!nome || !especie || !idade) {
                return res.status(400).json({ error: "Preencha todos os campos" });
            }

            const novoId = await AnimalModel.criar({ nome, especie, idade });

            res.status(201).json({
                message: "Animal cadastrado com sucesso!",
                id: novoId
            });

        } catch (error) {
            console.error("Erro ao cadastrar animal:", error);
            res.status(500).json({ error: "Erro ao cadastrar animal" });
        }
    }

    // Atualizar animal
    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, especie, idade } = req.body;

            const existente = await AnimalModel.buscarPorId(id);
            if (!existente) {
                return res.status(404).json({ error: "Animal não encontrado" });
            }

            const linhasAfetadas = await AnimalModel.atualizar(id, {
                nome,
                especie,
                idade
            });

            res.json({
                message: "Animal atualizado com sucesso!",
                alterado: linhasAfetadas
            });

        } catch (error) {
            console.error("Erro ao atualizar animal:", error);
            res.status(500).json({ error: "Erro ao atualizar animal" });
        }
    }

     // Remover animal
    static async remover(req, res) {
        try {
            const { id } = req.params;

            const encontrado = await AnimalModel.buscarPorId(id);
            if (!encontrado) {
                return res.status(404).json({ error: "Animal não encontrado" });
            }

            await AnimalModel.remover(id);

            res.json({ message: "Animal removido com sucesso!" });

        } catch (error) {
            console.error("Erro ao remover animal:", error);
            res.status(500).json({ error: "Erro ao remover animal" });
        }
    }

}

export default AnimalController;