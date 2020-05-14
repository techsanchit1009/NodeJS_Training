# Day8 - Authentication Strategy ( Bearer, OAuth ) ( use Passport.js for impl )
---

> Server running on **port 5000**


**1. Create a signup API and form for user to signup [Mandatory data: name, age, email, password]. Use mongodb to store user information like name, age, email and password(encrypt the password using bcrypt[https://www.npmjs.com/package/bcrypt]).**  

**Result:**  
> Check **server/server.js**. The password is hashed and stored in the db using **bcrypt**.

**2. Update the  passport local authentication strategy taught in the session to use the user information stored in mongodb.**  

**Result:**  
> The local strategy is written in **config/passport-local.js** and routes are defined in **routes/auth.routes.js**

**3. Setup dummy google app and use it along with passport-google(http://www.passportjs.org/docs/google/) to login. To successfully use google login for testing purpose, the dummy app has to be in development mode.**  

**Result:**  
> The GoogleStrategy is written in **config/passport-google.js**. The user can either Login using EmailID and Password(Local Strategy) or can connect with their Google Account(Google Strategy).  

> The Google Client ID and Secret is stored in **config/keys.js**