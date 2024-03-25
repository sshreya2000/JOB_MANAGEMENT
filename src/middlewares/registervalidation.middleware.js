// to validate registration
import {
    body,
    validationResult,
  } from 'express-validator';
  
  const registervalidateRequest = async (
    req,
    res,
    next
  ) => {
    console.log(req.body);
    // 1. Setup rules for validation.
    const rules = [
      body('name')
        .notEmpty()
        .withMessage('Name is required'),
      body('role')
        .notEmpty()
        .withMessage('Role is required'),
      body('email')
        .isEmail()
        .withMessage(
          'Email is required'
        ),
      body('password').isStrongPassword()
      .withMessage('Strong Password with Uppercase, lowercase, number, symbol is required'),
    ];
  
    // 2. run those rules.
    await Promise.all(
      rules.map((rule) => rule.run(req))
    );
  
    // 3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req);
    // console.log(validationErrors);
    // 4. if errros, return the error message
    if (!validationErrors.isEmpty()) {
      return res.render('landing', {
        errorMessage:
          validationErrors.array()[0].msg,
      });
    }
    next();
  };
  
  export default registervalidateRequest;
  