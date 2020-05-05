import database from '../models';
import { randomBytes } from 'crypto';
require('dotenv').config()
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
const redis = require('redis')


class UserService {
    static async signUp(new_user, next) {
        try {
            const prev_user = await database.User.findOne({
                where: {username : new_user.username}
            })
            if (prev_user) {
                next(new Error("Choose another username"), true)
                return
            }
            const salt = randomBytes(32);
            const hashed_password = await argon2.hash(new_user.password, { salt });
            new_user.password = hashed_password;
            new_user.salt = salt.toString()
            let token = jwt.sign({username: new_user.username},
                process.env.JWT_SECRET, { 
                    expiresIn: '24h' // expires in 24 hours
                }
            );
            const db_user = await database.User.create(new_user);
            let user_res =  JSON.parse(JSON.stringify(db_user))
            user_res.token = token
            Reflect.deleteProperty(user_res, 'password');
            Reflect.deleteProperty(user_res, 'salt');
            next(null, false, user_res)
        } catch (error) {
            console.log(error)
            next(error, false)
        }
    }

    static async logIn(user, next) {
        try {
            const db_user = await database.User.findOne({
                where: {username : user.username}
            })
            if (!db_user) {
                next(Error("Incorrect username"), true)
                return
            }
            const valid_password = await argon2.verify(db_user.password, user.password);
            if (valid_password) {
                let token = jwt.sign({username: user.username},
                    process.env.JWT_SECRET,
                    { 
                        expiresIn: '24h' // expires in 24 hours
                    }
                );
                let user_res =  JSON.parse(JSON.stringify(user))
                user_res.token = token
                Reflect.deleteProperty(user_res, 'password');
                next(null, false, user_res)
            } else {
                next(Error("Incorrect password"), true)
            }
        } catch (error) {
            console.log(error.message)
            res(new Error(error.message), false)
        }
    }

    static async logOut(user, next) {
        try {
            // const port_redis = process.env.PORT || 6379;
            // const redis_client = redis.createClient(port_redis);
            // const token = user.token
            // console.log("logOut")
            //add to blacklist of tokens

        } catch (error) {
            next(error, false)
        }
    }

//   static async getABook(id) {
//     try {
//       const theBook = await database.Book.findOne({
//         where: { id: Number(id) }
//       });

//       return theBook;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async deleteBook(id) {
//     try {
//       const bookToDelete = await database.Book.findOne({ where: { id: Number(id) } });

//       if (bookToDelete) {
//         const deletedBook = await database.Book.destroy({
//           where: { id: Number(id) }
//         });
//         return deletedBook;
//       }
//       return null;
//     } catch (error) {
//       throw error;
//     }
//   }
}

export default UserService;