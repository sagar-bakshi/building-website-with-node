const express = require("express");
const path = require("path");
const app = express();

const SpeakerService = require("./services/SpeakerService");
const FeedbackService = require("./services/FeedbackService");

/**
 * Creating instance of SpeakerService and FeedbackService
 */
const speakerService = new SpeakerService("./data/speakers.json");
const feedbackService = new FeedbackService("./data/feedback.json");


const indexRouter = require("./routes");
const cookieSession = require("cookie-session");

/**
 *Setting up cookies to store sessions
 */

app.set('trust proxy',1);

app.use(
  cookieSession({
    name: "session",
    keys: ["myseesion1", "myseesion2"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

/**
 * Setting up the middleware
 */


app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));


app.use(
  "/",
  indexRouter({
    speakerService,
    feedbackService,
  })
);

app.get('/',(req, res) => {
  res.render("pages/index",{ pageTitle: "Home" });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
