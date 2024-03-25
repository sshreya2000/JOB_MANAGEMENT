// to verify the access to user
import jwt from 'jsonwebtoken';

export const resourceAuth = (req, res, next) => {
    if(req.session.token){
    const token = req.session.token.token.split(" ")[1];
    jwt.verify(token, "your_secret_key", (err, decoded) => {
      console.log("verifying");
      if (err) return res.sendStatus(403); //invalid token
      console.log(decoded); //for correct token
      next();
    });
    }
  };
