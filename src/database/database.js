import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, '../../data/db.json');
const db = new Low(new JSONFile(file));

const connect = async () => {
  console.log("Reading json database")
  await db.read();

  // Create empty sets if none exist
  db.data ||= {}
  db.data.users ||= []

  // console.log(db.data)
}

const Users = {
  next_id: () => {
    const id = Math.max(...db.data.users.map(d => d.id))
    return (id > 0 ? id + 1 : 1);
  },

  create: (email, password) => {
    const obj = { id: Users.next_id(), email: email, password: password };
    db.data.users.push(obj);
    return new Promise((resolve, reject) => {
      db.write()
      .then(() => resolve(obj))
      .catch(() => reject({}))
    })
  },

  find_by_email: (email) => {
    return db.data.users.find(d => d.email === email);
  },

  find_by_id: (id) => {
    return db.data.users.find(d => d.id === id);
  }
}

connect();

export { Users }