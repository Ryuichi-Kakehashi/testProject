import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "user_db",
});

app.get("/api/data", (_req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/search", (req, res) => {
  const { name } = req.query;

  db.query(
    "SELECT * FROM users WHERE name LIKE ?",
    [`%${name}%`],
    (err, results) => {
      if (err) {
        console.error("検索エラー:", err);
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

app.post("/api/data", (req, res) => {
  const { name, gender, birthdate, hobby, other } = req.body;

  db.query(
    "INSERT INTO users (name, gender, birthdate, hobby, other) VALUES (?, ?, ?, ?, ?)",
    [name, gender, birthdate, hobby, other],
    (err) => {
      if (err) {
        console.error("DBエラー:", err);
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: "登録成功" });
      }
    }
  );
});

app.delete("/api/data/:id", (req, res) => {
  const userId = req.params.id;

  db.query("DELETE FROM users WHERE id = ?", [userId], (err) => {
    if (err) {
      console.error("削除エラー:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: "削除成功" });
    }
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
