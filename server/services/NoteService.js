import database from '../models';
require('dotenv').config()
const expiration_time = 86400
import jwt from 'jsonwebtoken';
require('dotenv').config()




class NoteService {
    static async createNote(new_note, next) {
        try {
            const user = await database.User.findOne({
                where: {username : new_note.username}
            })
            if (!user) {
                next(new Error("Corrupted token and username"), false)
                return
            }
            new_note.user_id = user.user_id
            const db_note = await database.Note.create(new_note);
            next(null, false, db_note)
        } catch (error) {
            console.log(error)
            next(error, false)
        }
    }

    static async getNotes(username, next) {
        try {
            const user = await database.User.findOne({
                where: {username : username}
            })
            if (!user) {
                next(new Error("Corrupted token and username"), false)
                return
            }
            const notes = await database.Note.findAll({
                where: {user_id: user.user_id}
            });
            next(null, false, notes)
        } catch (error) {
            console.log(error)
            next(error, false)
        }
    }

    static async getNote(note_id, next) {
        try {
            const note = await database.Note.findOne({
                where: {id : note_id}
            })
            if (!note) {
                next(new Error("No such file!"), false)
                return
            }
            next(null, false, note)
        } catch (error) {
            console.log(error)
            next(error, false)
        }
    }

    static async createLink(req, next) {
        const username = req.decoded.username;
        const host = req.headers.host;
        const url = req.baseUrl;
        const { id } = req.params;
        try {
            const user = await database.User.findOne({
                where: {username : username}
            })
            if (!user) {
                next(new Error("Corrupted token and username"), true)
                return
            }
            const note = await database.Note.findOne({
                where: {id: id}
            });
            if (!note) {
                next(new Error("No such note with the given id!"), true)
                return
            }
            if (note.user_id != user.user_id) {
                next(new Error("You do not have rights to share this note!"), true)
                return
            }
            let sharing_token = jwt.sign({note_id: id},
                process.env.JWT_SHARING_SECRET
            );
            console.log(sharing_token)
            const link = `${url}/${sharing_token}`
            next(null, false, link)
        } catch (error) {
            console.log(error)
            next(error, false)
        }
    }

    static async editNote(username, id, new_note, next) {
        try {
            const user = await database.User.findOne({
                where: {username : username}
            })
            if (!user) {
                next(new Error("Corrupted token and username"), true)
                return
            }
            const note = await database.Note.findOne({
                where: {id: id}
            });
            if (!note) {
                next(new Error("No such note with the given id!"), true)
                return
            }
            if (note.user_id != user.user_id) {
                next(new Error("You do not have rights to edit this note!"), true)
                return
            }
            await note.update({
                title: new_note.title,
                text: new_note.text
            })
            next(null, false, note)
        } catch (error) {
            console.log(error)
            next(error, false)
        }
    }

    static async deleteNote(username, id, next) {
        try {
            const user = await database.User.findOne({
                where: {username : username}
            })
            if (!user) {
                next(new Error("Corrupted token and username"), true)
                return
            }
            const note = await database.Note.findOne({
                where: {id: id}
            });
            if (!note) {
                next(new Error("No such note with the given id!"), true)
                return
            }
            if (note.user_id != user.user_id) {
                next(new Error("You do not have rights to delete this note!"), true)
                return
            }
            await note.destroy()
            next(null, false)
        } catch (error) {
            console.log(error)
            next(error, false)
        }
    }
    

}

export default NoteService;