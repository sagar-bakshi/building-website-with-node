const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (req, res, next)=>{
      try {

        const errors = req.session.feedback ? req.session.feedback.errors : false;

        const successMessage = req.session.feedback ? req.session.feedback.message : false;

        req.session.feedback = {};

        const feedbacks = await feedbackService.getList();
        console.log(feedbacks);
        return res.render("layout", {
          pageTitle: "Feedback",
          page:"feedback",
          feedbacks,
          errors,
          successMessage
        });

      } catch (error) {

      return next(error);
    }
    
  });

  /** 
   * @route   POST /feedback
   */
  router.post('/',[
    check('name')
    .trim()
    .isLength({min:3})
    .escape()
    .withMessage('Name is required'),
    check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('A valid email address is required'),
    check('title')
    .trim()
    .isLength({min:3})
    .escape()
    .withMessage('Title is required'),
    check('message')
    .trim()
    .isLength({min:5})
    .escape()
    .withMessage('Message is required'),
  ],
  async (req, res, next)=>{
    try {
      const {name, email, title, message} = req.body;
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        req.session.feedback = {
          errors: errors.array(),
        }
        return res.redirect('/feedback');
      }
      await feedbackService.addEntry(name, email, title, message);
      req.session.feedback = {
        message: "Thank you for your feedback!"
      }
      return res.redirect('/feedback');

    } catch (error) {
      return next(error);
    }
    
  })

  return router;
}
