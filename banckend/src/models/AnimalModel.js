import pool from "../config/database.js";

class AnimalModel {

    // Listar todos os animais
    static async listarTodos() {
        const [rows] = await pool.query(
            "SELECT * FROM animais ORDER BY id DESC"
        );
        return rows;
    }

    // Buscar por ID
    static async buscarPorId(id) {
        const [rows] = await pool.query(
            "SELECT * FROM animais WHERE id = ?", 
            [id]
        );
        return rows[0]; // retorna 1 objeto
    }

    // Buscar por termo (nome / espécie)
     static async buscarPorTermo(termo) {
        const like = `%${termo}%`;
        const [rows] = await pool.query(
            "SELECT * FROM animais WHERE nome LIKE ? OR especie LIKE ? ORDER BY id DESC",
            [like, like]
        );
        return rows;
    }

    // Criar novo animal
    static async criar({ nome, especie, idade }) {
        const [result] = await pool.query(
            "INSERT INTO animais (nome, especie, idade) VALUES (?, ?, ?)",
            [nome, especie, idade]
        );

        return result.insertId; // retorna ID criado
    }

    // Atualizar animal
     static async atualizar(id, { nome, especie, idade }) {
        const [result] = await pool.query(
            "UPDATE animais SET nome = ?, especie = ?, idade = ? WHERE id = ?",
            [nome, especie, idade, id]
        );

        return result.affectedRows; // 1 se alterou, 0 se não encontrou
    }

    // Remover animal
    static async remover(id) {
        const [result] = await pool.query(
            "DELETE FROM animais WHERE id = ?",
            [id]
        );

        return result.affectedRows; // 1 se removeu
    }

}

export default AnimalModel;