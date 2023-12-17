import express from "express"
import router from "./router"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

const customLogger = (message) => (req, res, next) => {
  console.log(`Hello from ${message}`)
  next()
}

// cors is a configuration (middleware) that we can put on our server 
// that will tell a browser who or what can access this API
// By default, This just means everything and everyone 
// can atleast try to get access to our server
// We can block on IP levels and some different request, and block all type stuff
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(cookieParser())

app.use(morgan('dev'))

app.use(express.json()) // allows client to send json to server

// urlencoded allows a client to add things links query string and parameter and it encodes and decodes that properly
// urlencoded takes the whole query string and parameter and put it into a json object for us
app.use(express.urlencoded({ extended: true })) 

// app.use((req, res, next) => {
//   req.shh_secret = "shh" 
//   next()
// }) // Any single request that registered after this will have access to shh_secret

app.use(customLogger("CUSTOM LOGGER"))
 
/**
 * app.[method]([route], [route handler])
 */
app.get("/", (req, res) => {
  console.log("Hello from Express")
  res.status(200)
  res.json({message: "hello"})
})

// ToDo: Document all the APIs
app.use('/api', router)


/**
 * Test Router begins here
 */
app.get("/test1", (req, res) => {
  const time = new Date(Date.now() + 8 * 3600000);

  res
    .status(303)
    .cookie('jwt', 'Bearer ' + 'token', {
      httpOnly: true, sameSite: 'Strict',
      expires: time // cookie will be removed after 8 hours
    })
    .cookie('testkey', 'testval', { sameSite: 'Strict', expires: time })
    .redirect('http://localhost:3000');
});


app.get("/test2", (req, res) => {
  res.status(200)
  // Access cookies from the request object
  const cookies = req.cookies;
  const jwt = cookies.jwt;
  if (jwt) {
    // Verify the JWT token
    // If valid, send a response with the user data
    res.json({ isLoggedin: true})
  }
  else {
    res.json({isLoggedin: false})
  }

  // Log or process the cookies
  console.log(cookies);

})

/**
 * Test Router ends here
 */

export default app
