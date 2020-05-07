import NoteService from '../services/NoteService';
import Util from '../utils/Utils';

const util = new Util();
const server_err = "Server Error"


class NoteController {
  static async getNotes(req, res) {
    try {
      const username = req.decoded.username;
      await NoteService.getNotes(username, function (err, is_oper, db_user) {
        if (err) {
          if (is_oper) {
            util.setError(400, err.message)
          } else {
            util.setError(500, server_err)
          }
        } else {
          util.setSuccess(201, 'Notes are succesfully fetched!', db_user);
        }
      });
    } catch (error) {
      console.log(error)
      util.setError(500, server_err);
    }
    return util.send(res);
  }

  static async createNote(req, res) {
    if (!req.body.title || !req.body.text) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    let new_note = req.body;
    new_note.username = req.decoded.username
    try {
      await NoteService.createNote(new_note, function (err, is_oper, db_user) {
        if (err) {
          if (is_oper) {
            util.setError(400, err.message)
          } else {
            util.setError(500, server_err)
          }
        } else {
          util.setSuccess(201, 'Note Created!', db_user);
        }
      });
    } catch (error) {
      console.log(error)
      util.setError(500, server_err);
    }
    return util.send(res);
  }

  static async editNote(req, res) {
    const new_note = req.body;
    const { id } = req.params;
    const username = req.decoded.username;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid id of a note!');
      return util.send(res);
    }
    try {
      await NoteService.editNote(username, id, new_note, function (err, is_oper, updated_note) {
        if (err) {
          if (is_oper) {
            util.setError(400, err.message)
          } else {
            util.setError(500, server_err)
          }
        } else {
          util.setSuccess(201, 'Note Updated!', updated_note);
        }
      });
    } catch (error) {
      console.log(error)
      util.setError(500, server_err);
    }
    return util.send(res)
  }

  static async deleteNote(req, res) {
    const { id } = req.params;
    const username = req.decoded.username;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid id of a note!');
      return util.send(res);
    }
    try {
      await NoteService.deleteNote(username, id, function (err, is_oper) {
        if (err) {
          if (is_oper) {
            util.setError(400, err.message)
          } else {
            util.setError(500, server_err)
          }
        } else {
          util.setSuccess(201, 'Note Deleted!');
        }
      });
    } catch (error) {
      console.log(error)
      util.setError(500, server_err);
    }
    return util.send(res)
  }
}

export default NoteController;