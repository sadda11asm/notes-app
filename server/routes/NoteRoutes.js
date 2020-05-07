import { Router } from 'express';
import NoteController from '../controllers/NoteController';
import isAuth from '../middlewares/isAuth'
import shareLink from '../middlewares/shareLink'

const router = Router();

router.post('/create', isAuth.checkToken, NoteController.createNote);
router.put('/edit/:id', isAuth.checkToken, NoteController.editNote);
router.delete('/delete/:id', isAuth.checkToken, NoteController.deleteNote)
router.get('/', isAuth.checkToken, NoteController.getNotes);
router.get('/:unique_token', shareLink.checkToken, NoteController.getNote)
router.get('/share/:id', isAuth.checkToken, NoteController.createLink)

export default router;