
import userModel from "../models/user.model.js";
//   /**
//  * @DESC Check Role Middleware
//  */
export const checkRole = (roles) => async (req, res, next) => {
    console.log(req.session.token);
      const user = await userModel.getOne(req.session.token.userEmail);
      console.log(user);
      !roles.includes(user.role)
        ? res.status(401).json("Sorry you do not have access to this route")
        : next();
    };