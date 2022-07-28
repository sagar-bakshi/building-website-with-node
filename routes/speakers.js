const express = require("express");
const router = express.Router();

module.exports = (params) => {

  const { speakerService } = params;

  router.get("/",async (req, res) => {
    const speakers = await speakerService.getList();
    
    res.render("layout", {
      pageTitle: "Speakers",
      page:"speakers",
      speakers
    });
  });

  
  router.get("/:shortname", async (req, res) => {
    let speaker =  await speakerService.getSpeaker(req.params.shortname);
    let artworks = await speakerService.getArtworkForSpeaker(req.params.shortname);
    console.log(artworks);
    res.render("layout", {
      pageTitle: "Speaker",
      page:"speakers-detail",
      speaker,
      artworks,
    });
  });

  return router;
};
