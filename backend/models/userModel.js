import db from "../config/db.js";
export const createUser = async (username, email , password) => {
try {
    const [result]= await db.query("INSERT INTO users (username, email, password) VALUES (?,?,?)",
        [username, email, password]
    )
    return result;
} catch (error) {
    throw new Error(`Error creating user:  ${error.message}`);
}
}
export const getUserByEmail = async (email) => {
    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email])
        return rows[0];
    } catch (error) {
        throw new Error(`Error fetching user:  ${error.message}`);
    }
}

export const updateUserRole = async (email, role) => {
    try {
        const [results] = await db.query("UPDATE users SET role=? WHERE email=?",[role,email])
        return results;
    } catch (error) {
        throw new Error(`Error updating user role:  ${error.message}`);
    }
}