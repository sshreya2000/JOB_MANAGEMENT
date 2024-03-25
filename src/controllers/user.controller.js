import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { secret_key } from "../../index.js";

export default class userController{
    // to add user
    addUser(req, res){
        userModel.add(req.body);
        res.redirect('/login');
    }
    // to get login page
    getLogin(req, res){
        res.render('login',{errorMessage:null});
    }
    // to post login page
    async postLogin(req, res){
        const loginFound= await userModel.getUser(req.body);
        if(!loginFound) return res.render('login',{errorMessage:'User not found'});
        if(loginFound.role != req.body.role){
            return res.status(403).json({
                message: "Please make sure you are logging in from the right portal.",
                success: false,
              });
        }
        // Generate tokens
        let token = jwt.sign(
            {
              userName: loginFound.name,
              userEmail: loginFound.email,
              userRole:loginFound.role,
            },
            secret_key,
            { expiresIn: "3 days" }
          );
        req.session.userEmail=req.body.email;
        req.session.userName=loginFound.name;
        let result = {
            userName: loginFound.name,
            userEmail: loginFound.email,
            userRole: loginFound.role,
            token: `Bearer ${token}`,
            expiresIn: 168,
          };
        req.session.token=result;
        return res.redirect(`/jobs`);
    }
    // to logout
    logout(req, res){
        req.session.destroy((err)=>{
            if(err)console.log(err);
            else res.redirect('/login');
        });
        res.clearCookie('lastVisit');
    }
}