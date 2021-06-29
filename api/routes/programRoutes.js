const express = require("express");
const router = express.Router();
const programController = require("../controllers/programController");

router.get("/allprogram",programController.getAllPrograms);
router.get("/:channelId",programController.getProgByChannelId);
router.get("/allprogram/:programId",programController.getProgramById);
router.get("/categories/:categoryId",programController.getProgramsByCategories);
router.get("/episodes/:programId",programController.getEpisodesByProgramId);
router.post("/:channelId",programController. addProgramToFavorites);

module.exports = router;
