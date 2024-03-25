// import files
import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import jobController from './src/controllers/job.controller.js';
import userController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import registervalidateRequest from './src/middlewares/registervalidation.middleware.js';
import validateRequest from './src/middlewares/validation.middleware.js';
import {setLastVisit} from './src/middlewares/lastVisit.middleware.js'
import cookieParser from 'cookie-parser';
import {resourceAuth} from './src/middlewares/resourceauth.middleware.js'
import { checkRole } from './src/middlewares/checkrole.middleware.js';
import { getPaginationParams } from './src/middlewares/paginationParams.middleware.js';

// create server
const app = express();

app.use(express.static('public'));
app.use(express.static('public/js'));
app.use(cookieParser());
app.use(express.json());
export const secret_key="your_secret_key";
// url encoded
app.use(express.urlencoded({extended:true}));
// setup view engine settings
app.set("view engine", "ejs");
// path of our views
app.set("views", path.join(path.resolve(),"src",'views')); 
app.use(ejsLayouts);
app.use(express.static('src/views'));
// session management for recruiter
app.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false},
}))
const JobController= new jobController();
const UserController= new userController();
app.get('/', JobController.landingPage);
app.get('/jobs', setLastVisit, async(req,res)=>{
    const { limit, page } = getPaginationParams(req.query);
    JobController.jobListingPage(req,res,limit,page)});
app.get('/job/:id', JobController.jobDetailsPage);
app.post('/apply/:id', uploadFile.single('resume'), JobController.applyJob);
app.post("/register", registervalidateRequest, UserController.addUser);
app.get('/login', UserController.getLogin);
app.post('/login', setLastVisit, UserController.postLogin);
app.get('/logout', auth, resourceAuth, checkRole(["se","hr"]), UserController.logout);
app.get('/postjob', auth, resourceAuth, checkRole(["se", "hr"]), JobController.getJobPage);
app.post('/job', auth, validateRequest, resourceAuth, checkRole(["se", "hr"]), JobController.postJobPage);
app.get('/job/update/:id', auth, resourceAuth, checkRole(["se"]), JobController.getupdateJobPage);
app.post('/job/update/:id', auth, resourceAuth, checkRole(["se"]), JobController.updateJobPage);
app.get('/job/delete/:id', auth, resourceAuth, checkRole(["se"]), JobController.deleteJobPage);
app.get('/job/applicants/:id', auth, resourceAuth, checkRole(["se","hr"]), JobController.applicantsList);
app.get('/uploads/:path', auth, resourceAuth, checkRole(["se", "hr"]), JobController.resumeview);
app.post('/jobs',async(req,res)=>{
    const { limit, page } = getPaginationParams(req.query);
    JobController.searchJobPage(req,res,limit,page)});
// server port
app.listen(3000, ()=>{
    console.log('Server is listening on port 3000')
})
