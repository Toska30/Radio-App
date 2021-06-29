// This module allows me to make frontend fetches from my backend.
const fetch = require("node-fetch");
const sqlite3 = require("sqlite3");
const json = "format=json";
const paginationFalse = "pagination=false";
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "../../radioApp.db"));

const utils = require("../core/utilities");

const getAllChannels = async (req, res) => {
  let channels = await fetch(
    `http://api.sr.se/api/v2/channels?${json}&${paginationFalse}`
  );
  channels = await channels.json();

  if (channels.channels.length > 0) {
    console.log("Runs after the query")
    res.json(channels.channels);
  }
};

const getChannelById = async (req, res) => {
  let channel = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}`
  );
  channel = await channel.json();
  res.json(channel.channel);
};


const getChannelSchedule = async (req, res) => {
  let channelSchedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelId=${req.params.channelId}&date=${req.query.date}`
  );
  channelSchedule = await channelSchedule.json();

  channelSchedule.schedule = channelSchedule.schedule.map((p) => {
    return {
      ...p,
      starttimeutc: utils.convertToDateObject(p.starttimeutc),
      endtimeutc: utils.convertToDateObject(p.endtimeutc),
    };
  });

  res.json(channelSchedule.schedule);
};

const addChannelToFavorites = async (req, res) => {
  let query = /*sql*/ `SELECT * FROM selectedChannels WHERE  channelId=$channelId AND userId=$userId`;
  let params = {
    $userId: req.session.user.userId,
    $channelId: req.body.channelId
  }
  db.get(query, params, (err, result) => {
    console.log("result :", result)
    if (result) {
      res.json({
        error: " The channel already exists"
      })
    } else {

      query = /*sql*/ `INSERT INTO selectedChannels (userId, channelId) VALUES ($userId, $channelId)`

      params = {
        $userId: req.session.user.userId,
        $channelId: req.body.channelId,
      }
      db.run(query, params, function (err) {
        if (err) {
          res.status(400).json({
            error: err
          });
          return;
        }
        console.log(this.lastID);
        res.json({
          success: "Channel added successfully",
          lastID: this.lastID
        })
      })
    }

  })

}


module.exports = {
  getAllChannels,
  getChannelById,
  getChannelSchedule,
  addChannelToFavorites
};