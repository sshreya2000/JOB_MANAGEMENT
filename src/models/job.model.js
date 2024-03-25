
export default class jobModel{
    constructor(_id, _jobcategory, _jobdesignation, _joblocation, _companyname, _salary, _applyby, _skillsrequired, _numberofopenings, _jobposted, _applicants){
        this.id = _id;
        this.jobcategory = _jobcategory;
        this.jobdesignation = _jobdesignation;
        this.joblocation = _joblocation;
        this.companyname = _companyname;
        this.salary = _salary;
        this.applyby = _applyby;
        this.skillsrequired = _skillsrequired;
        this.numberofopenings = _numberofopenings;
        this.jobposted = _jobposted;
        this.applicants = _applicants;
    }
    // get jobs in job listing page
    static getJobs(limit, page){
      let result=[];
        for(let i=((page-1)*limit); i<(page*limit); i++){
          if(jobs[i])result.push(jobs[i]);
        }
        return result;
    }
    // get length of total jobs
    static getJobLength(){
      return jobs.length;
    }
    // get job details by id
    static getjobDetails(id){
        return jobs.find(j=>j.id==id);
    }
    // apply to job by id
    static applytoJob(id){
        const index= jobs.findIndex(j=>j.id==id);
        jobs[index].applicants++;
    }
    // add new job
    static addjob({job_category, job_designation, job_location, company_name, salary, number_of_openings, skills_required, apply_by}){
      const newjob=new jobModel(jobs.length+1, job_category, job_designation, job_location, company_name, salary, apply_by, skills_required, number_of_openings, new Date().getMonth()+"/"+new Date().getDate()+"/"+new Date().getFullYear()+", "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(), 0);
      jobs.push(newjob);
    }
    // to update existing job
    static updatejob(id, data){
      const index= jobs.findIndex(j=>j.id==id);
      jobs[index]=new jobModel(Number(id), data.job_category, data.job_designation, data.job_location, data.company_name, data.salary, data.apply_by, data.skills_required, data.number_of_openings, jobs[index].jobposted, jobs[index].applicants);
      return jobs[index];
    }
    // to delete job
    static deletejob(id){
      const index= jobs.findIndex(j=>j.id==id);
      jobs.splice(index, 1);
    }
    //  to search job
    static searchJob(name){
      const des=String(name).toLowerCase();
      const result=jobs.filter(j=>String(j.companyname).toLowerCase().includes(des));
      return result;
    }
}
var jobs=[
    new jobModel(
    1,
    'Tech',
    'SDE',
    'Gurgaon HR IND Remote',
    'Coding Ninjas',
    '14-20lpa',
    new Date("2024-03-31"),
    ['REACT', 'NodeJS', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
    10,
    new Date("3/22/2024, 3:43:57 PM").toLocaleString(),
    100
  ),
  new jobModel(
    2,
    'Tech',
    'Angular Developer',
    'Pune IND On-Site',
    'Go Digit',
    '6-10lpa',
    new Date("2024-04-21"),
    ['Angular', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
    2,
    new Date("3/20/2024, 3:43:57 PM").toLocaleString(),
    20
  ),
  new jobModel(
    3,
    'Tech',
    'SDE',
    'Bengaluru IND',
    'Juspay',
    '20-26lpa',
    new Date("2024-04-01"),
    ['REACT', 'NodeJS', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'],
    10,
    new Date("2/22/2024, 3:43:57 PM").toLocaleString(),
    1000
  ),
];