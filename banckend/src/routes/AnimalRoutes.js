import express from 'express';
import AnimalController from '../controllers/AnimalControllers.js';

const router = express.Router();

router.get('/animais', AnimalController.listar)  // listar + busca
router.get("/animais/:id", AnimalController.buscarPorId); // buscar por id
router.post("/animais", AnimalController.criar);          // criar
router.put("/animais/:id", AnimalController.atualizar);   // atualizar
router.delete("/animais/:id", AnimalController.remover);  // excluir

export default router;