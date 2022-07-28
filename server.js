const express = require("express");
const path = require("path");
const app = express();
const createError = require("http-errors");

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

app.set("trust proxy", 1);

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

app.locals.sitename = "MeetUp";


app.use(async(req, res, next) => {
  try {
      const names = await speakerService.getNames();
      res.locals.speakers = names;
      return next();
  } catch (error) {
    return next(error);
  }
});

app.use(
  "/",
  indexRouter({
    speakerService,
    feedbackService,
  })
);


app.use((req, res, next) => {
    return next( createError(404, 'File not found'));
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  console.error(err);
  res.locals.message = err.message;
  res.locals.status = err.status;
  res.locals.stack = err.stack;
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
