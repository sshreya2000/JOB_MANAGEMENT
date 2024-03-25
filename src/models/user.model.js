import bcrypt from 'bcryptjs';
 export default class userModel{
    constructor(_id, _name, _email, _password, _role){
        this.id = _id;
        this.name = _name;
        this.email = _email;
        this.password = _password;
        this.role=_role;
    }
    // add user with authentication
    static async add({name, role, email, password}){
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 8);
        const newuser= new userModel(users.length+1, name, email, hashedPassword, role);
        users.push(newuser);
    }
    // get User to login
    static async getUser({email, password}){
        const result=users.find((u)=>u.email==email);
        if (!result || !(await bcrypt.compare(password, result.password))) {
            return null;
        }
        return result;
    }
    // get user by email
    static getOne(email){
        const result=users.find((u)=>u.email==email);
        return result;
    }
}
var users=[];