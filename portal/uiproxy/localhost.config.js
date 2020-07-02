const PROXY_CONFIG = [{
  context: [
    "/*",
    "/*/*",
    "/*/*/",
    "/*/*/*",
    "/*/*/*/*"
  ],
  target: "http://localhost:8080/supportgrid-portal/",
  secure: false,
  "logLevel": "debug",
  "headers": {
    "x-ottg-caller-application": "yes",
    "x-ottg-caller-application-timestamp": "yes",
    "x-ottg-caller-application-host": "yes",
    "x-ottg-principal-userid": "yes",
    "origin":"localhost",
    "IM_FirstName":"User",
    "IM_LastName":"Mock",
    "IM_PreferredLanguage":"en"
  }
}]

module.exports = PROXY_CONFIG;
