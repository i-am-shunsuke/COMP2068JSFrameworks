require("dotenv").config();
const configurations = {
    ConnectionStrings: {
      MongoDB: "mongodb+srv://webappadmin:Password123@cluster0.6sqf0.mongodb.net/ProjectTrackerWebApp",
    },
    Authentication: {
      GitHub: {
        // ClientId: process.env.GITHUB_CLIENT_ID,
        // ClientSecret: process.env.GITHUB_CLIENT_SECRET,
        // CallbackUrl: process.env.GITHUB_CALLBACK_URL

        ClientId: "Ov23lihzMOcjiDhHQdlN",
        ClientSecret: "91f84ddeba4d4cace5d6f8e8e7783d722b89221b",
        CallbackUrl: "http://localhost:3000/github/callback"
      },
    },
  };

module.exports=configurations;