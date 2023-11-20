
const mainController = require("../controllers/mainController")
const {Router} = require("express")
const router = Router()

router.get("/",mainController.index)
router.get("/about",mainController.about)

module.exports = router