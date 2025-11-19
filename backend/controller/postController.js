import { readFile, readFileSync } from 'fs';
import fs from 'fs/promises'
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
// import users from './users.json' assert { type: 'json' };  not wrks even after adding 
//                                                                "experimentalJsonModules": true in package.json
     
const __filename = fileURLToPath(import.meta.url);
console.log("_filename", __filename) // C:\Users\VishwanathanRJ\OneDrive - EPAM\demoCoding\Interview\backend\postController.js
const __dirname = dirname(__filename);
console.log("dirName", __dirname)  //C:\Users\VishwanathanRJ\OneDrive - EPAM\demoCoding\Interview\backend
const users = JSON.parse(
  readFileSync(join(__dirname, '../' ,"users.json"), "utf8")
);

//backend/user.json is used because the server is being executed from outside folder so the exact path has to be given
// const users = JSON.parse(readFileSync('backend/users.json', 'utf8'));
const userModel = {
//    users: require('./users.json'),
   users,
   setUsers: (data) => {
     userModel.users = data;
   }
}
export const postDB = async (req, res) => {
    // const {username, password} = req.body
    const username = req.body.username;
    const password = req.body.password;

    const userExist =  userModel.users.find(obj => obj.username === username)
    if(userExist){
        return res.status(400).json("alredy exist")
    }

    const obj = {
        username,
        password
    }
     console.log([...userModel.users, obj])
    userModel.setUsers([...userModel.users, obj]);
 
    await fs.writeFile(path.join(__dirname, "../", "users.json"), JSON.stringify(userModel.users) )
    
}
