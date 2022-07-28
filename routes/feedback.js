const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (req, res, next)=>{
      try {
        const feedbacks = await feedbackService.getList();
        console.log(feedbacks);
        return res.render("layout", {
          pageTitle: "Feedback",
          page:"feedback",
          feedbacks
        });

      } catch (error) {

      return next(error);
    }
    
  });

  router.post('/',(req, res, next)=>{
    try {
      return res.send("feedback form posted");
    } catch (error) {
      return next(error);
    }
    
  })

  return router;
}
