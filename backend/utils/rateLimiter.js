function rateLimiter({winMax, limit}){
    const reqMap = new Map();
    return (req, res, next) =>{
       const ip = req.ip;
       const ipDetails = reqMap.get(ip)
       const now = Date.now()

// First request OR window expired
       if(!ipDetails || now > ipDetails.expires){  //if ip not present or exisiting one expired so good to access now
          reqMap.set(ip, {count:1, expires: (now + winMax)})   //170000+180000
          return next();
       }

       ipDetails.count++;

       if(ipDetails.count > limit){    //175000 - 18000 < 10000
         return res.status(429).json("So many request at the moment")
       }

       reqMap.set(ip, ipDetails);
        next();
    }
}

module.exports = rateLimiter