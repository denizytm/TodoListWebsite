
const {Router} = require("express")
const router = Router()
const passport = require("passport")
const {Strategy : GoogleStrategy} = require("passport-google-oauth20")
const googleUser = require("../models/User")

passport.serializeUser((user,done)=> {

  console.log("serializing");

  done(null,user.id)

})

passport.deserializeUser( async (id,done)=> {

  const loginData = await googleUser.findById(id)

 try{
  if(loginData) {

  console.log("deserializing");

  done(null,loginData)

  }
  else {

    console.log("User not found");

    done(null,null)

  }}catch(error) {

    console.log(error);

  }

})

passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : process.env.GOOGLE_CALLBACK_URL,
},async(accessToken,refreshToken,profile,done)=> {

  const newUser = {
    googleId : profile.id,
    displayName : profile.displayName,
    firstName : profile.name.givenName,
    lastName : profile.name.familyName,
    profileImage : profile.photos[0].value
  }  

  try {
    let user = await googleUser.findOne({googleId : profile.id})
    if(user) {
      done(null,user)
    }else {
      user = await googleUser.create(newUser)
      done(null,user)
    }
  }catch(error){
    console.log(error);
    done(error)
  }

}))

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', {
     failureRedirect: '/login-failure',
     successRedirect: '/dashboard'
     }));

router.get("/login-failure",(req,res)=> {

    res.send("Something went wrong...")

})

module.exports = router