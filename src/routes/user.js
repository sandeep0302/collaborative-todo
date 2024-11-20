const express = require("express");
const {Router} = require("express");
const {signup,signin}=require("../controllers/auth");


const useRoute = express.Router();
const app = express();

useRoute.post("./signup",signup);
useRoute.post("./signin",signin)

module.exports = {
    useRoute
}

