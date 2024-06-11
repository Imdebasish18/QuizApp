const express = require("express");
const app = express();
const authController = require("../controllers/auth");

const { route } = require("./pages");
const router = express.Router();

router.post("/check-answer", authController.answer);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/question/:collectionName", authController.question);
router.get("/answer", authController.question);

module.exports = router;
