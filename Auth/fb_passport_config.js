if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongooseModel = require("../model/mongo-db");

var facebookStrategy = require("passport-facebook").Strategy;

/**
 * A function to find a user base on it user id
 * @param {string} uid - this the user id
 * @param {function} done -  passport done callback function
 * @return {function} a passport function with a user found in it
 */
const getUserById = (uid, done) => {
  const user = mongooseModel.findOne({ uid: uid }, (err, user) => {
    return done(err, user);
  });
};

/**
 * A function to find user in the database an
 * or create new user in the database in there
 * no user in that database
 *  @param {Object} profile -
 *  @param {function} done -  passport done callback function
 *  @return {function} a passport done function when found user or
 * when new user it created
 *
 */
function findandCreate(profile, done) {
  mongooseModel.findOne({ uid: profile.id }, (err, user) => {
    if (err) {
      console.log(err);
    }
    if (user) {
      return done(null, user);
    } else {
      const newUser = new mongooseModel();

      newUser.uid = profile.id;
      newUser.fullname = profile.displayName;
      newUser.email = profile.email;
      newUser.gender = profile.gender;
      newUser.pic = profile.photos[0].value;

      newUser.save(function (err) {
        console.log(err);

        return done(null, newUser);
      });
    }
  });
}

const initialize = (passport) => {
  function authenticate(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken);
    // * process nextTick() function help your code to run immediatly  in asynchronous which is better than setTimeOut
    process.nextTick(() => {
      findandCreate(profile, done);
    });
  }

  passport.use(
    new facebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: [
          "id",
          "displayName",
          "name",
          "gender",
          "picture.type(large)",
          "email",
        ],
      },
      authenticate
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.uid);
  });
  passport.deserializeUser((id, done) => {
    return getUserById(id, done);
  });
};

module.exports = initialize;
