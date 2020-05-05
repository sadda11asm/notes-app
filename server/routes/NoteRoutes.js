import { Router } from 'express';
import NoteController from '../controllers/NoteController';
import middlewares from '../middlewares'

const router = Router();

// router.get('/create', middlewares.isAuth, NoteController.createNote);
// router.post('/edit', middlewares.isAuth, NoteController.editNote);
// router.get('/:id', NoteController.getNote);
// router.put('/delete', middlewares.isAuth, NoteController.updatedBook);
// router.delete('/:id', NoteController.deleteBook);

export default router;