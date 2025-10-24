import fs, { read } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "../auth_users.json");

function readUsers(){
    if(!fs.readFileSync(DATA_FILE)){
        return [];
    }

    try {
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error reading users file:", err);
        return [];
    }
};

function writeUsers(users){
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Error writing users file:", err);
    }
};

export const findByEmail = (email) =>{
    return readUsers().find((user) => user.email === email);
};

export const findById = (id) =>{
    return readUsers().find((user) => user.id === id);
};

export const createUser = (userData) =>{
    const users = readUsers();
    if(users.some((user) => user.email === userData.email)){
        const error = new Error("User already exists");
        error.status = 400;
        throw error;
    }

    const newUser = {
        id : Date.now().toString(),
        ...userData,
    };

    users.push(newUser);
    writeUsers(users);
    return newUser;
};

