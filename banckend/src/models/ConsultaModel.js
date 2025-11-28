import pool from "../config/database.js";

class ConsultaModel {
  static async listarTodas() {
    const [rows] = await pool.query("SELECT * FROM consultas ORDER BY id DESC");
    return rows;
  }

  static async criar({ data, hora, veterinario, animal }) {
    const [result] = await pool.query(
      "INSERT INTO consultas (data, hora, veterinario, animal) VALUES (?, ?, ?, ?)",
      [data, hora, veterinario, animal]
    );
    return result.insertId;
  }

  static async remover(id) {
    await pool.query("DELETE FROM consultas WHERE id = ?", [id]);
  }

  static async atualizar(id, { data, hora, veterinario, animal }) {
    const [result] = await pool.query(
      "UPDATE consultas SET data=?, hora=?, veterinario=?, animal=? WHERE id=?",
      [data, hora, veterinario, animal, id]
    );
    return result.affectedRows;
  }

  static async buscarPorVeterinario(vet) {
    const [rows] = await pool.query(
      "SELECT * FROM consultas WHERE veterinario LIKE ? ORDER BY id DESC",
      [`%${vet}%`]
    );
    return rows;
  }

  static async buscarPorAnimal(animal) {
    const [rows] = await pool.query(
      "SELECT * FROM consultas WHERE animal LIKE ? ORDER BY id DESC",
      [`%${animal}%`]
    );
    return rows;
  }

  static async buscarPorData(data) {
    const [rows] = await pool.query(
      "SELECT * FROM consultas WHERE data = ? ORDER BY id DESC",
      [data]
    );
    return rows;
  }
}

export default ConsultaModel;
