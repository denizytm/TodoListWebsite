
const {Router} = require("express")
const router = Router()
const dashboardController = require("../controllers/dashboardController")
const {isLoggedIn} = require("../middleware/checkAuth")

router.get("/dashboard",isLoggedIn,dashboardController.index)
router.get("/dashboard/item/:id",isLoggedIn,dashboardController.viewNote)
router.put("/dashboard/item/:id",isLoggedIn,dashboardController.uptadeNote)
router.post("/dashboard/item/:id",isLoggedIn,dashboardController.deleteNote)

router.get("/dashboard/add",isLoggedIn,dashboardController.addNote)
router.post("/dashboard/add",isLoggedIn,dashboardController.createNote)

router.get("/dashboard/search",isLoggedIn,dashboardController.search)
router.post("/dashboard/search",isLoggedIn,dashboardController.searchSubmit)

module.exports = router
