import db from "../config/db.js"
export const dashboard = async (req, res, next) => {
  try {

    const [products] = await db.query(
      "SELECT COUNT(*) AS totalProducts FROM products"
    )

    const [users] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    )

    const [categories] = await db.query(
      "SELECT COUNT(DISTINCT category) AS totalCategories FROM products"
    )

    const [categoryData] = await db.query(
      "SELECT category, COUNT(*) AS count FROM products GROUP BY category"
    )

    return res.status(200).json({
      success: true,
      data: {
        totalProducts: products[0].totalProducts,
        totalUsers: users[0].totalUsers,
        totalCategories: categories[0].totalCategories,
        productsPerCategory: categoryData
      }
    })

  } catch (error) {
    next(error)
  }
}