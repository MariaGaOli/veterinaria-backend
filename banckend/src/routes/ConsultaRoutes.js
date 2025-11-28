import { Router } from "express";
import ConsultaController from "../controllers/ConsultaController.js";

const router = Router();

router.get("/", ConsultaController.listar);
router.post("/", ConsultaController.criar);
router.put("/:id", ConsultaController.atualizar);
router.delete("/:id", ConsultaController.remover);

export default router;
