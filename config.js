const config = {
    db: {
      host: "localhost", 
      user: "root",
      password: "",
      database: "forum",
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
    sessionSecret: "", //minimum 32 znaki
  };
  
  module.exports = config;