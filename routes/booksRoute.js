const { Router } = require("express");
const { uploadBook, getBooks } = require("../controllers/bookController");
const router = Router();

router.post("/uploadPdf", uploadBook);
router.get("/getBooks", getBooks);

module.exports = router;
