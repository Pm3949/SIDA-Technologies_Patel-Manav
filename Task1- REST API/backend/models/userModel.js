import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "../database.json");

function readUsers() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(DATA_FILE);
    if (data.length === 0) {
        return [];
    }
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading user data:", err);
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}



export const findAllUsers = () => {
  return readUsers();
};

export const findByID = (id) => {
  const users = readUsers();
  return users.find((user) => user.id === id);
};

export const createUser = (userData) => {
  const users = readUsers();

  if (users.some((u) => u.email === userData.email)) {
    const err = new Error("Email Already Exists!!");
    err.status = 400; // Bad Request
    throw err;
  }

  const newUser = {
    id: Date.now().toString(),
    ...userData,
  };

  users.push(newUser);
  writeUsers(users);
  return newUser;
};

export const updateUser = (id, userData) => {
  const users = readUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    const err = new Error("User not found");
    err.status = 404; // Not Found
    throw err;
  }
  
  if (
    userData.email &&
    users.some((u) => u.email === userData.email && u.id !== id)
  ) {
    const error = new Error("email already exists");
    error.status = 400; // Bad Request
    throw error;
  }

  users[index] = {
    ...users[index],
    ...userData,
  };

  writeUsers(users);
  return users[index];
};

export const deleteUser = (id) => {
  let users = readUsers();
  const initialLength = users.length;
  users = users.filter((u) => u.id !== id);

  if (users.length === initialLength) {
    const error = new Error("User not found");
    error.status = 404; // Not Found
    throw error;
  }

  writeUsers(users);
  return true;
};