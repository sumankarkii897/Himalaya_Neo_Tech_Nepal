import {
  create,
  getAll,
  getSolutionById,
  deleteSolutionById,
  updateSolutionById,
  getSolutionsByCategory,
  searchSolutions,
} from "../models/solutionModel.js";

export const createSolution = async (req, res, next) => {
  try {
    const { name, description, category, price } = req.body;
    if (!name || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be positive number",
      });
    }

    const newSolution = await create(name, description, category, price);
    return res.status(201).json({
      success: true,
      message: "Solution created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSolutions = async (req, res, next) => {
  try {
    const solutions = await getAll();
    return res.status(200).json({
      success: true,
      message: "Solutions fetched successfully",
      data: solutions,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleSolution = async (req, res, next) => {
  try {
    const id = req.params.id;
    const solution = await getSolutionById(id);
    if (!solution) {
      return res.status(404).json({
        success: false,
        message: "Solution not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Solution fetched successfully",
      data: solution,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSolutions = async (req, res, next) => {
  try {
    const id = req.params.id;
    const isExistingSolution = await getSolutionById(id);
    if (!isExistingSolution) {
      return res.status(404).json({
        success: false,
        message: "Solution not found",
      });
    }
    const { name, description, category, price } = req.body;
    if (!name || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be positive number",
      });
    }
    const updatedSolution = await updateSolutionById(
      id,
      name,
      description,
      category,
      price,
    );
    if (updatedSolution.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Solution not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Solution updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSolutions = async (req, res, next) => {
  try {
    const id = req.params.id;
    const isExistingSolution = await getSolutionById(id);
    if (!isExistingSolution) {
      return res.status(404).json({
        success: false,
        message: "Solution not found",
      });
    }
    await deleteSolutionById(id);
    return res.status(200).json({
      success: true,
      message: "Solution deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getSolutionsByCategoryController = async (req, res, next) => {
    try {
        const category = req.params.category;
        const solutions = await getSolutionsByCategory(category);
        if(solutions.length === 0) {
            return res.status(404).json({
                success : false,
                message : `No solutions found in category ${category}`
            })
        }
        return res.status(200).json({
            success : true,
            message : "Solutions fetched successfully",
            data : solutions
        })
    } catch (error) {
        next(error);
    }
}

export const searchSolutionsController = async (req, res, next) => {
    try {
        const query = req.query.q;
        if(!query) {
            return res.status(400).json({
                success : false,
                message : "Search query is required"
            })
        }
        const solutions = await searchSolutions(query);
        if(solutions.length === 0) {
            return res.status(404).json({
                success : false,
                message : `No solutions found matching query ${query}`
            })
        }
        return res.status(200).json({
            success : true,
            message : "Solutions fetched successfully",
            data : solutions
        })

    } catch (error) {
        next(error);
    }
}

