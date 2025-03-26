const db = require("../config/database");

exports.getAllDepartments = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    // Get total count of departments
    const [countResult] = await db.query(
      "SELECT COUNT(*) as total FROM departments"
    );
    const total = countResult[0].total;

    // Get paginated departments
    const [departments] = await db.query(
      `
            SELECT * FROM departments 
            WHERE status = 'active'
            LIMIT ? OFFSET ?
        `,
      [limit, offset]
    );

    res.json({
      departments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching departments", error: error.message });
  }
};
