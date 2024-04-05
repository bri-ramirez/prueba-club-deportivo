import { Router } from 'express';
import { create, findAll, findOne, remove, update } from './controllers/deporte-controller.js';

const router = Router();



router.get('/deportes', findAll);
router.get('/deportes/:id', findOne);
router.post('/deportes', create);
router.patch('/deportes/:id', update);
router.delete('/deportes/:id', remove);

export default router