import db from "../config/db.js";
export const create = async (name, description, category, price) => {
  try {
    const [result] = await db.query(
      "INSERT INTO products (name, description, category, price) VALUES (?,?,?,?)",
      [name, description, category, price],
    );
    return result;
  } catch (error) {
    throw new Error(`Error creating product : ${error.message}`);
  }
};

export const getAll = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};

export const getSolutionById = async (id) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id=?", [id]);
    return rows[0];
  } catch (error) {
    throw new Error(`Error fetching products ${id}: ${error.message}`);
  }
};

export const updateSolutionById = async (
  id,
  name,
  description,
  category,
  price,
) => {
  try {
    const [result] = await db.query(
      "UPDATE products SET name=?, description=?, category=?, price=? WHERE id=?",
      [name, description, category, price, id],
    );
    return result;
  } catch (error) {
    throw new Error(`Error updating product ${id} : ${error.message}`);
  }
};

export const deleteSolutionById = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM products WHERE id=?", [id]);
    return result;
  } catch (error) {
    throw new Error(`Error deleting product ${id} : ${error.message}`);
  }
};

export const getSolutionsByCategory = async (category) => {
    try {
        const [rows] = await db.query("SELECT * FROM products WHERE category=?", [category]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching products by category ${category}: ${error.message}`);
    }
}

export const searchSolutions = async (query) => {
    try {
        const [rows] = await db.query("SELECT * FROM products WHERE name LIKE ? OR description LIKE ?", [`${query}%`, `${query}%`]);
        return rows;
    } catch (error) {
        throw new Error(`Error searching products: ${error.message}`);
    }
}
