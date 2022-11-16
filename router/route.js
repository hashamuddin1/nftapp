const express = require('express');
const router = express.Router();
const { verifySignup, Specificsubcategory, Specificcategory, signIn, allrole, addrole, deleterole, updaterole, allproduct, addproduct, deleteproduct, updateproduct, allcategory, addcategory, deletecategory, updatecategory } = require('../controller/demo')
const { checkMissingField, checkDuplicateEmail } = require("../middleware/sign.validate");
const verifyToken = require("../middleware/auth")
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:|\./g, '') + ' - ' + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//upload name k folder may files save hogi
const upload = multer({ storage: storage, fileFilter: fileFilter })

//Get All Product
router.get("/api/allproduct", allproduct);
//Insert A Product
router.post("/api/addproduct", [verifyToken, upload.single('productImage')], addproduct);
//Delete A Product
router.delete("/api/deleteproduct", [verifyToken], deleteproduct);
//Update A Product
router.put("/api/updateproduct", [verifyToken], updateproduct);


//Get All Category
router.get("/api/allcategory", allcategory);
//Get Specific Category
router.get("/api/Specificcategory", [verifyToken], Specificcategory);
//Get Specific Sub Category
router.get("/api/Specificsubcategory", [verifyToken], Specificsubcategory);
//Insert A category
router.post("/api/addcategory", [verifyToken], addcategory);
//Delete A category
router.delete("/api/deletecategory", [verifyToken], deletecategory);
//Update A category
router.put("/api/updatecategory", [verifyToken], updatecategory);


//Get All role
router.get("/api/allrole", [verifyToken], allrole);
//Insert A role
router.post("/api/addrole", [verifyToken], addrole);
//Delete A role
router.delete("/api/deleterole", [verifyToken], deleterole);
//Update A role
router.put("/api/updaterole", [verifyToken], updaterole);

//signup
router.post("/api/Signup", [checkDuplicateEmail, checkMissingField], verifySignup);
//login
router.post('/api/signIn', signIn)

module.exports = router