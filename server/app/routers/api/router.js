const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */



const userRouter = require("./user/router");

router.use("/user", userRouter);



const uploadRouter = require("./uploadsPhotos/router");

router.use("/upload", uploadRouter);

/* ************************************************************************* */

module.exports = router;
