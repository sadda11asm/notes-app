import database from '../models';
import { randomBytes } from 'crypto';
require('dotenv').config()
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
const redis = require('redis')

const expiration_time = 86400


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

    static async logOut(token, username, next) {
        try {
            const port_redis = process.env.PORT || 6379;
            const redis_client = redis.createClient(port_redis);
            // add to blacklist of tokens
            await redis_client.set(token, username);
            await redis_client.expire(token, expiration_time)
            // console.log(set)
            next()
        } catch (error) {
            console.log(error)
            next(error, false)
        }
    }

    // static async clean_cache(username, redis_client) {
    //     const end = Date.now()
    //     var d = Date.parse(end)
    //     const expiredTokens = await redis_client.zrangebyscore(`${username}-tokens`, `-inf`, d);

    //     expiredTokens.length >= 1 && expiredTokens.forEach(async token => {
    //         await redis.zrem(`${username}-tokens`, token)
    //     });
    // }

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