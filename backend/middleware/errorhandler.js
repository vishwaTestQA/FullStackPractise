const fsPromise = require('fs/promises');
const fs = require('fs')
const path = require('path');
const errorHandler = (err, req, res, next) => {
    const time  = Date.now()
    const logItem = `${err.message}${time}`;
    try{
      if(!fs.existsSync(path.join(__dirname, "..", "logs"))){
         fsPromise.mkdir(path.join(__dirname, "..", "logs"))
      }
      fsPromise.appendFile(path.join(__dirname, "..", "logs", 'errorLog.txt'), logItem)
    }catch(err){}

    res.status(500).send("Error")
}