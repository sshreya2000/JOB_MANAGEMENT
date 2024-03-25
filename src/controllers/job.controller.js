import jobModel from '../models/job.model.js'
import applicantModel from '../models/applicant.model.js';
export default class jobController{
    // landing page
    landingPage(req, res){
        return res.render('landing', {errorMessage:null, userEmail:req.session.userEmail, userName:req.session.userName});
    }
    // job listing page
    jobListingPage(req, res, limit, page){
        console.log(limit, page);
        const jobs= jobModel.getJobs(limit, page);
        const jobslength=jobModel.getJobLength();
        return res.render('jobListing',{jobs:jobs, currentPage:page, totalPages:Math.ceil(jobslength/limit), userEmail:req.session.userEmail, userName:req.session.userName});
    }
    // job details page
    jobDetailsPage(req, res){
        const id=req.params.id;
        const job=jobModel.getjobDetails(id);
        return res.render('jobdetails',{job:job, userEmail:req.session.userEmail, userName:req.session.userName});
    }
    // apply job modal controller
    applyJob(req, res){
        const id=req.params.id;
        const resumeDir=req.file.filename;
        jobModel.applytoJob(id);
        applicantModel.add(id,req.body, resumeDir);
        return res.redirect('/jobs');
    }
    // to get the post job page
    getJobPage(req, res){
        return res.render('postjob', {errorMessage:null, userEmail:req.session.userEmail, userName:req.session.userName});
    }
    // to fill and submit the post job page
    postJobPage(req, res){
        console.log(req.body);
        jobModel.addjob(req.body);
        res.redirect('/jobs');
    }
    // to get the update job page
    getupdateJobPage(req, res){
        const id=req.params.id;
        const jobFound=jobModel.getjobDetails(id);
        if(jobFound)res.render('updatejob', {job:jobFound, errorMessage:null, userEmail:req.session.userEmail, userName:req.session.userName});
        else res.status(401).send('Job Not Found');
    }
    // to update the update job page
    updateJobPage(req,res){
        console.log(req.body);
        const {job_category, job_designation, job_location, company_name, salary, number_of_openings, skills_required, apply_by}=req.body;
        const id=req.params.id;
        let errors=[];
        if(!job_category || job_category.trim()=='')errors.push('job category is required');
        if(!job_designation || job_designation.trim()=='')errors.push('job designation is required');
        if(!job_location || job_location.trim()=='')errors.push('job location is required');
        if(!company_name || company_name.trim()=='')errors.push('company name is required');
        if(!salary || salary.trim()=='')errors.push('salary is required');
        if(!number_of_openings || number_of_openings.trim()=='')errors.push('number of openings is required');
        if(!skills_required)errors.push('skills is required');
        if(!apply_by || apply_by.trim()=='')errors.push('Deadline is required');
        const jobFound=jobModel.getjobDetails(id);
        if(errors.length>0){
            console.log(errors);
        if(jobFound)return res.render('updatejob', {job:jobFound, errorMessage:errors, userEmail:req.session.userEmail, userName:req.session.userName});
        }
        else {jobModel.updatejob(id, req.body);
        return res.redirect('/job/'+id);
        }
    }
    // to delete the job
    deleteJobPage(req, res){
        const id=req.params.id;
        jobModel.deletejob(id);
        res.redirect('/jobs');
    }
    // applicants list page
    applicantsList(req, res){
        const id=req.params.id;
        const result=applicantModel.applicantsbyJobId(id);
        if(result)res.render('jobapplicants', {applicants:result, errorMessage:null, userEmail:req.session.userEmail, userName:req.session.userName});
        else res.render('jobapplicants', {applicants:null, errorMessage:'No applicants Present', userEmail:req.session.userEmail, userName:req.session.userName})
    }
    // to view resume
    resumeview(req, res){
        const path=req.params.path;
        res.render('uploads/'+path);
    }
    // to search job in dashboard
    searchJobPage(req, res, limit, page){
        const searchRequest=req.body.search;
        const jobs=jobModel.searchJob(searchRequest);
        return res.render('jobListing',{jobs:jobs, currentPage:page, totalPages:Math.ceil(jobs.length/limit), userEmail:req.session.userEmail, userName:req.session.userName});
    }
}