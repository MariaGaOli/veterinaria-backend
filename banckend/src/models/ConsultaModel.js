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
}

export default ConsultaModel;
