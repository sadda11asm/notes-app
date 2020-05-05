import database from '../src/models';


// const attachCurrentUser = async (req, res, next) => {
//     try {
//         const currentUser = await database.Book.findOne({
//             where: { id: Number(id) }
//           });
//       if (!currentUser) {
//         return res.sendStatus(401);
//       }
//       const currentUser = userRecord.toObject();
//       Reflect.deleteProperty(currentUser, 'password');
//       Reflect.deleteProperty(currentUser, 'salt');
//       req.currentUser = currentUser;
//       return next();
//     } catch (e) {
//       Logger.error('🔥 Error attaching user to req: %o', e);
//       return next(e);
//     }
//   };
  
//   export default attachCurrentUser;