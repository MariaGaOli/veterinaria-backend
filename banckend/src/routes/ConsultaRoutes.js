import { Router } from "express";
import ConsultaController from "../controllers/ConsultaController.js";

const router = Router();

router.get("/", ConsultaController.listar);
router.post("/", ConsultaController.criar);
router.delete("/:id", ConsultaController.remover);

export default router;
