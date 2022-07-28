const express = require("express");
const router = express.Router();
const speakersRoute = require("./speakers");
const feedbackRoute = require("./feedback");

module.exports = (params) => {

  const { speakerService } = params;

  router.get("/",async (req, res, next) => {
    try {
      const topSpeakers = await speakerService.getList();
    
      return res.render("layout", {
        pageTitle: "welcome",
        page:"index",
        topSpeakers
      });
    } catch (error) {
      return next(error);
    }
    
  });

  router.use("/speakers", speakersRoute(params));
  router.use("/feedback", feedbackRoute(params));

  return router;
};
