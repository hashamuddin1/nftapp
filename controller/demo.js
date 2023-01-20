const { product } = require('../model/product')
const { Category } = require('../model/category')
const { Role } = require('../model/role')
const { users } = require('../model/user')
require("dotenv").config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var { ObjectId } = require('mongodb')


//insert a product
const addproduct = async(req, res) => {
    try {
        console.log(req.file)
        const addprod = new product({
            productname: req.body.productname,
            price: req.body.price,
            category: req.body.category,
            sub_category: req.body.sub_category,
            status: req.body.status,
            owner_id: req.user._id,
            image: "https://nft9.herokuapp.com/" + req.file.path
        })
        let insertprod = await addprod.save();
        res.send(insertprod)
    } catch (e) {
        res.send(e)
        console.log(e)
    }
}

//get all product
const allproduct = async(req, res) => {
    try {
        const allprod = await product.find({})
        res.send(allprod)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//delete product
const deleteproduct = async(req, res) => {
    try {
        let _id = req.query.id
        const getstdspe = await product.findByIdAndDelete(_id)
        res.send("Delete Successfully")
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//update a product
const updateproduct = async(req, res) => {
    try {
        let _id = req.query.id
        const getstdspe = await product.findByIdAndUpdate(_id, req.body, {
            new: true //new updated value usi waqt mil jae uskay liye kia hay

        })
        res.send(getstdspe)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//insert a category
const addcategory = async(req, res) => {
    try {
        if (req.user.role == "63660fc4ddca8a100b9c22ba") {
            const addprod = new Category({
                category_name: req.body.category_name,
                isActive: req.body.isActive,
                parent_Id: req.body.parent_Id,
                image: req.body.image
            })
            let insertprod = await addprod.save();
            res.send(insertprod)
        } else {
            res.send("Only Admin Can Add The Category")
        }

    } catch (e) {
        res.send(e)
        console.log(e)
    }
}

//all category
const allcategory = async(req, res) => {
    try {
        const allprod = await Category.aggregate([
            { $match: { parent_Id: null } },
            { $match: { isActive: true } },
        ])
        res.send(allprod)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//specific category
const Specificcategory = async(req, res) => {
    try {
        let _id = ObjectId(req.query.id)
        console.log(_id);
        const allprod = await Category.aggregate([
            { $match: { _id: _id } },
            { $match: { isActive: true } },
            { $lookup: { from: "categories", localField: "_id", foreignField: "parent_Id", as: "sub_category" } },
        ])
        res.send(allprod)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//specific subcategory
const Specificsubcategory = async(req, res) => {
    try {
        let _id = ObjectId(req.query.id)
        console.log(_id);
        const allprod = await Category.aggregate([
            { $match: { _id: _id } },
        ])
        res.send(allprod)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//delete category
const deletecategory = async(req, res) => {
    try {
        if (req.user.role == "63660fc4ddca8a100b9c22ba") {
            let _id = req.query.id
            const getstdspe = await Category.findByIdAndDelete(_id)
            res.send("Delete Successfully")
        } else {
            res.send("Only Admin Can Delete Category")
        }

    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//update category
const updatecategory = async(req, res) => {
    try {
        if (req.user.role == "63660fc4ddca8a100b9c22ba") {
            let _id = req.query.id
            const getstdspe = await Category.findByIdAndUpdate(_id, req.body, {
                new: true //new updated value usi waqt mil jae uskay liye kia hay

            })
            res.send(getstdspe)
        } else {
            res.send("Only Admin Can Update Category")
        }

    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//all role
const allrole = async(req, res) => {
    try {
        if (req.user.role == "63660fc4ddca8a100b9c22ba") {
            const allprod = await Role.find({})
            res.send(allprod)
        } else {
            res.send("Only Admin Can See All Roles")
        }

    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//insert role
const addrole = async(req, res) => {
    try {
        if (req.user.role == "63660fc4ddca8a100b9c22ba") {
            const addprod = new Role({
                role: req.body.role
            })
            let insertprod = await addprod.save();
            res.send(insertprod)
        } else {
            res.send("Only Admin Can Insert Role")
        }

    } catch (e) {
        res.send(e)
        console.log(e)
    }
}

//delete role
const deleterole = async(req, res) => {
    try {
        if (req.user.role == "63660fc4ddca8a100b9c22ba") {
            let _id = req.query.id
            const getstdspe = await Role.findByIdAndDelete(_id)
            res.send("Delete Successfully")
        } else {
            res.send("Only Admin Can Delete Role")
        }

    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//update role
const updaterole = async(req, res) => {
    try {
        if (req.user.role == "63660fc4ddca8a100b9c22ba") {
            let _id = req.query.id
            const getstdspe = await Role.findByIdAndUpdate(_id, req.body, {
                new: true //new updated value usi waqt mil jae uskay liye kia hay

            })
            res.send(getstdspe)
        } else {
            res.send("Only Admin Can Update Role")
        }

    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

//create user
const verifySignup = async(req, res) => {
    try {
        const adduser = new users(req.body)
        var encryptedPassword = await bcrypt.hash(adduser.password, 10);
        adduser.password = encryptedPassword;
        let insertuser = await adduser.save();
        const token = jwt.sign({ email: adduser.email, _id: adduser._id, phone_number: adduser.phone_number, role: adduser.role },
            process.env.TOKEN_KEY, {
                expiresIn: "24h",
            }
        );
        var tokens = token;
        let helperfunction = () => {
            let response = res.statusCode;
            let messages = "Sign-up Successful";
            let status = true;
            let Data = { name: req.body.name, tokens };
            return res.status(201).send({ response: response, message: messages, status: status, Data: Data })
        }
        helperfunction()
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//single product
const singleproduct = async(req, res, next) => {
    try {
        const _id = req.query.id
        const singleprod = await product.find({ _id })
        res.send(singleprod)

    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }
}


//Sign In
const signIn = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }
        const user = await users.findOne({ email: email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ _id: user._id, email: user.email, phone_number: user.phone_number, role: user.role },
                process.env.TOKEN_KEY, {
                    expiresIn: "24h",
                }
            );
            var tokens = token;
            let helperfunction = () => {
                let response = res.statusCode;
                let messages = "Login Successful ";
                let status = true;
                let Data = { name: user.first_name, tokens };
                return res.status(200).send({ response: response, message: messages, status: status, Data: Data })
            }
            helperfunction()
        } else {
            return res.status(400).send("Invalid Credentials");
        }

    } catch (err) {
        console.log(err);
    }
}

//changeOwner
const changeOwner = async(req, res) => {
    try {
        const changeowner = await product.findByIdAndUpdate({ _id: req.body.imageId }, { owner_id: req.user._id }, { new: true })
        res.status(200).send(changeowner)
    } catch (e) {
        console.log(e)
        res.status(400).send(e.message);
    }
}

//ownerImages
const ownerImages = async(req, res) => {
    try {
        const ownerimages = await product.find({ owner_id: req.user._id })
        res.status(200).send(ownerimages)
    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }
}


module.exports = { ownerImages, changeOwner, singleproduct, Specificcategory, Specificsubcategory, verifySignup, signIn, allrole, addrole, deleterole, updaterole, allcategory, addcategory, deletecategory, updatecategory, addproduct, allproduct, deleteproduct, updateproduct }