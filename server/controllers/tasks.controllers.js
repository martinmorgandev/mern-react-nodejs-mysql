import { pool } from "./../db.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM tasks ORDER BY createAt ASC"
    );
    res.json(result);
    console.log(result);
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(result);
    // res.send('recibido')
    console.log(result);
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};

export const createTasks = async (req, res) => {
  try {
    const { title, description } = req.body;
    const [result] = await pool.query(
      "INSERT INTO tasks(title, description) VALUES (?, ?)",
      [title, description]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      title,
      description,
    });
  } catch (error) {
    return res.status(500).json({message: error.message})
    
  }
};

export const updateTasks = async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await pool.query("UPDATE tasks SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result)
    // res.send("actualizando tareas");
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
      req.params.id,
    ]);
    // console.log(req.params.id)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.sendStatus(204);
    // res.json(result)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};
