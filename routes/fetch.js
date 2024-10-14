const router = require("express").Router();

const dataController = require("../controllers/fetch");

router.get("/", dataController.fetch);

module.exports = router;
