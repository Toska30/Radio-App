const sqlite3 = require("sqlite3");
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "../../radioApp.db"));

const getAllFavoriteChannels =(req, res)=>{

 let query =/*sql*/`SELECT selectedChannels.channelId FROM selectedChannels WHERE userId =$userId`
 let params = {
   $userId:req.session.user.userId
 }
 db.all(query,params,(err, channels)=>{
  if(channels){
    res.json(channels)
  }else(
   res.json({error:"Channels not founds"})
  )
 })  
}
const getAllFavPrograms =(req, res)=>{
 let query =/*sql*/`SELECT selectedPrograms.programId FROM selectedPrograms WHERE userId =$userId`
 let params = {
   $userId:req.session.user.userId
 }
 db.all(query,params,(err, programs)=>{
   if(programs){
     res.json(programs)
   }else(
    res.json({error:"Programs not founds"})
   )
 }) 
}

const deleteFavoriteChannel =(req, res)=>{
  let query = /*sql*/ `DELETE FROM selectedChannels WHERE userId =$userId AND channelId = $channelId`
  let params ={
    $userId : req.session.user.userId,
    $channelId : req.params.channelId
  }
  db.run(query, params, function(err) {
    res.json({
      success:" The Channel has been deleted ",
      changes: this.changes
    })
  })
}

const deleteFavoriteProgram =(req, res)=>{
  let query = /*sql*/ `DELETE FROM selectedPrograms WHERE userId =$userId AND programId = $programId`
  let params ={
    $userId : req.session.user.userId,
    $programId : req.params.programId
  }
  db.run(query, params, function(err) {
    res.json({
      success:" The Program has been deleted ",
      changes: this.changes
    })
  })
}

module.exports={
  getAllFavoriteChannels,
  getAllFavPrograms,
  deleteFavoriteChannel,
  deleteFavoriteProgram
}
