import { Router } from 'express';
import NoteController from '../controllers/NoteController';
import isAuth from '../middlewares/isAuth'

const router = Router();

router.post('/create', isAuth.checkToken, NoteController.createNote);
router.put('/edit/:id', isAuth.checkToken, NoteController.editNote);
router.delete('/delete/:id', isAuth.checkToken, NoteController.deleteNote)
router.get('/', isAuth.checkToken, NoteController.getNotes);

export default router;