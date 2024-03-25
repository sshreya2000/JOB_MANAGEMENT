export default class applicantModel{
    constructor(_jobid, _applicantid, _name, _email, _contact, _resumepath){
        this.jobid = _jobid;
        this.applicantid = _applicantid;
        this.name = _name;
        this.email = _email;
        this.contact = _contact;
        this.resumepath = _resumepath;
    }
    // add applicants
    static add(id, data, resumeDir){
        const newapp= new applicantModel(id, applicants.length+1, data.name, data.email, data.contact, resumeDir);
        applicants.push(newapp);
    }
    // search applicants by id
    static applicantsbyJobId(id){
        const result= applicants.filter(app=>app.jobid==id);
        return result;
    }
}
var applicants=[];