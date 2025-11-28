import express from 'express';
import AnimalController from '../controllers/AnimalController.js';

const router = express.Router();

router.get('/', AnimalController.listar);

router.get("/:id", AnimalController.buscarPorId);

router.post("/", AnimalController.criar);

router.put("/:id", AnimalController.atualizar);

router.delete("/:id", AnimalController.remover);

export default router;
