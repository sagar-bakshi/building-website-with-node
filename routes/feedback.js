const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (req, res)=>{
    const feedbacks = await feedbackService.getList();
    res.json(feedbacks);
  });

router.post('/',(req, res)=>{
  res.send("feedback form posted");
})

  return router;
}
