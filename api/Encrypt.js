const crypto = require("crypto");

const encrypt =(password)=>{
  return(
    crypto
    .createHmac("sha256", " radio fm ")
    .update(password) 
    .digest("hex")
    );
}

module.exports={
  encrypt
}
