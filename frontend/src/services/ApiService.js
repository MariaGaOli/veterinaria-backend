
const API_URL = 'http://localhost:3000';

class ApiService {

  static async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
      throw new Error(error.error || `Erro HTTP: ${response.status}`);
    }
    return response.json();
  }


  static async get(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`);
    return await this.handleResponse(response);
  }

  static async post(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Erro na requisição POST:', error);
      throw error;
    }
  }

  static async put(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Erro na requisição PUT:', error);
      throw error;
    }
  }

  static async delete(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Erro na requisição DELETE:', error);
      throw error;
    }
  }

  // GET 
  static getConsultas(params = "") {
    return this.get(`/consultas${params}`);
  }

  // POST
  static postConsulta(data) {
    return this.post(`/consultas`, data);
  }

  // PUT
  static putConsulta(id, data) {
    return this.put(`/consultas/${id}`, data);
  }

  // DELETE
  static deleteConsulta(id) {
    return this.delete(`/consultas/${id}`);
  }
}

export default ApiService;
