import UserService from '../services/UserService';
import Util from '../utils/Utils';

const util = new Util();
const server_err = "Server Error"

class UserController {
  static async logIn(req, res) {
    if (!req.body.username || !req.body.password) {
      util.setError(400, 'Please provide complete details to login!');
      return util.send(res);
    }
    let user = req.body
    try {
      await UserService.logIn(user, function(err, is_oper, db_user) {
        if (err) {
          if (is_oper) {
            util.setError(400, err.message)
          } else {
            util.setError(500, server_err)
          }
        } else {
          util.setSuccess(200, 'Successfully logged in!', db_user);
        }
      })
    } catch (error) {
      util.setError(500, server_err);
    }
    return util.send(res)
  }

  static async logOut(req, res) {
    try {
      console.log(req.decoded)
      await UserService.logOut(req.token, req.decoded.username, function(err, is_oper) {
        if (err) {
          if (is_oper) {
            util.setError(400, err.message)
          } else {
            util.setError(500, server_err)
          }
        } else {
          util.setSuccess(200, "Successfully logged out!")
        }
      })
    } catch (error) {
      console.log(error)
      util.setError(500, server_err);
    }
    return util.send(res)
  }

  static async signUp(req, res) {
    if (!req.body.username || !req.body.password) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    let new_user = req.body;
    try {
      await UserService.signUp(new_user, function (err, is_oper, db_user) {
        if (err) {
          if (is_oper) {
            util.setError(400, err.message)
          } else {
            util.setError(500, server_err)
          }
        } else {
          util.setSuccess(201, 'User Created!', db_user);
        }
      });
    } catch (error) {
      console.log(error)
      util.setError(500, server_err);
    }
    return util.send(res);
  }

  static async getUser(req, res) {
    const { id } = req.params;

    console.log("getUser")

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const user = await UserService.getUser(id);

      if (!user) {
        util.setError(404, `Cannot find user with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found user', user);
      }
    } catch (error) {
      util.setError(500, server_err);
    }
    return util.send(res);
  }
}

export default UserController;