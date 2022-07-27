const express = require("express");
const router = express.Router();

module.exports = (params) => {

  const { speakerService } = params;

  router.get("/", async (req, res) => {

    req.session.visitCount++;
   
    const speakers = await speakerService.getList();

    return res.json(speakers);
  });

  
  router.get("/:shortname", (req, res) => {
    let shortname = req.params.shortname;
    console.log(shortname);
    res.render("pages/speakers", {
      speakerShortName: shortname,
    });
  });

  return router;
};
