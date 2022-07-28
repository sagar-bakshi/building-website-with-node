const express = require("express");
const router = express.Router();

module.exports = (params) => {

  const { speakerService } = params;

  router.get("/",async (req, res, next) => {
    try {
      const speakers = await speakerService.getList();
    
      res.render("layout", {
        pageTitle: "Speakers",
        page:"speakers",
        speakers
      });
    } catch (error) {
      return next(error);
    }
    
  });

  
  router.get("/:shortname", async (req, res, next) => {
    try {
      let speaker =  await speakerService.getSpeaker(req.params.shortname);
      let artworks = await speakerService.getArtworkForSpeaker(req.params.shortname);
      
      res.render("layout", {
        pageTitle: "Speaker",
        page:"speakers-detail",
        speaker,
        artworks,
      });

    } catch (error) {

      return next(error);
    }

    
  });

  return router;
};
