import Project from "../models/project.js";

export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const project = await Project.create({
      title,
      description,
      userId,
    });

    return res
      .status(201)
      .json({ msg: "Project created successfully", project });
  } catch (err) {
    console.error("Error creating project:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await Project.findAll({
      where: { userId },
    });
    res.json(projects);
  } catch (err) {
    console.error("Error fetching user projects:", err);
    res.status(500).json({ msg: "Error fetching projects" });
  }
};

// Get all projects (admin-only)
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    console.error("Error fetching all projects:", err);
    res.status(500).json({ msg: "Error fetching projects" });
  }
};
