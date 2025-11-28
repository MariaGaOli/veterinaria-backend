import pool from "../config/database.js";

class AnimalModel {

    static async listarTodos() {
        const [rows] = await pool.query(
            "SELECT * FROM animais ORDER BY id DESC"
        );
        return rows;
    }

    static async buscarPorId(id) {
        const [rows] = await pool.query(
            "SELECT * FROM animais WHERE id = ?",
            [id]
        );
        return rows[0];
    }

    static async buscarPorTermo(termo) {
        const like = `%${termo}%`;
        const [rows] = await pool.query(
            "SELECT * FROM animais WHERE nome LIKE ? OR especie LIKE ? OR raca LIKE ? ORDER BY id DESC",
            [like, like, like]
        );
        return rows;
    }

    static async criar({ nome, especie, idade, raca }) {
        const [result] = await pool.query(
            "INSERT INTO animais (nome, especie, raca, idade) VALUES (?, ?, ?, ?)",
            [nome, especie, raca, idade]
        );

        const [rows] = await pool.query(
            "SELECT * FROM animais WHERE id = ?",
            [result.insertId]
        );

        return rows[0];
    }

    
    static async atualizar(id, { nome, especie, idade, raca }) {
        const [result] = await pool.query(
            "UPDATE animais SET nome = ?, especie = ?, raca = ?, idade = ? WHERE id = ?",
            [nome, especie, raca, idade, id]
        );

        return result.affectedRows;
    }

}

export default AnimalModel;