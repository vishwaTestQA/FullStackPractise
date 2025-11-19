import { readFileSync } from "fs"
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const filename  = fileURLToPath(import.meta.url) // import.meta.filename, import.meta.dirname
const dirName = dirname(filename)
const users = JSON.parse(readFileSync(join(dirName, '../', 'users.json')), 'utf8')

const userModel = {
    users,
    setUsers : (data)=>{
        userModel.users = data;
    }
}

export const getAllUsers = async (req, res) =>{
    console.log(userModel.users)
     const obj =  userModel.users;
     res.status(200).json({allusers: obj})
}