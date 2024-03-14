const express = require("express")

const router = express.Router();

const articleController = require("../controllers/articleController")
//Routes

router.get("/testing",articleController.test);
router.post("/create", articleController.create);
router.get("/articles",articleController.list);
router.get("/article/:id",articleController.get);
router.delete("/article/:id",articleController.deleted);
router.put("/article/:id",articleController.update);
module.exports = router;
