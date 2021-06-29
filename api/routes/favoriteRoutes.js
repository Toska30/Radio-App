const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favoriteController");

router.get("/channels", favoriteController.getAllFavoriteChannels);
router.get("/programs", favoriteController.getAllFavPrograms);
router.delete("/channels/:channelId",favoriteController.deleteFavoriteChannel);
router.delete("/programs/:programId",favoriteController.deleteFavoriteProgram);

module.exports = router;

