//  to validate the posting job page
import {
    body,
    validationResult,
  } from 'express-validator';
  
  const validateRequest = async (
    req,
    res,
    next
  ) => {
    console.log(req.body);
    // 1. Setup rules for validation.
    const rules = [
      body('job_category')
        .notEmpty()
        .withMessage('job category is required'),
      body('job_designation')
        .notEmpty()
        .withMessage(
          'job designation is required'
        ),
        body('job_location')
        .notEmpty()
        .withMessage(
          'job location is required'
        ), 
        body('company_name')
        .notEmpty()
        .withMessage(
          'company name is required'
        ), 
        body('salary')
        .notEmpty()
        .withMessage(
          'salary is required'
        ),
        body('number_of_openings')
        .notEmpty().isNumeric()
        .withMessage(
          'number of openings is required'
        ),
        body('skills_required')
        .notEmpty().isArray()
        .withMessage(
          'skills is required'
        ),
      body('apply_by').isDate()
      .withMessage('Deadline is required'),
    ];
  
    // 2. run those rules.
    await Promise.all(
      rules.map((rule) => rule.run(req))
    );
  
    // 3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req);
    console.log(validationErrors);
    // 4. if errros, return the error message
    if (!validationErrors.isEmpty()) {
      return res.render('postjob', {
        errorMessage:
          validationErrors.array(), userEmail:req.session.userEmail, userName:req.session.userName
      });
    }
    next();
  };
  
  export default validateRequest;
  