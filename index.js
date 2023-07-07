import express from "express";
import crypto from "crypto";
import todolistController from "./controllers/todoList.js";

const app = express();
app.use(express.json());

export  const todoList = [
  {
    id:crypto.randomUUID(),
    todoName:'học bài',
    date:"7/7/2020"
  },  {
    id:crypto.randomUUID(),
    todoName:'học bài',
    date:"7/7/2020"
  },  {
    id:crypto.randomUUID(),
    todoName:'học bài',
    date:"7/7/2020"
  }
];
///hello
app.get("/api/v1/todoList/:id", todolistController.getId);
app.get("/api/v1/todoList/papaginated", todolistController.getId);
app.get("/api/v1/todoList", todolistController.getALL);
app.post("/api/v1/todolist", todolistController.post);
app.put("/api/v1/todolist/:id", todolistController.remove);
app.put("/api/v1/todolist/:id/update", todolistController.updateTodoName);
app.delete("/api/v1/todolist", todolistController.removeDuplicate);
app.delete("/api/v1/todolist/delAll", todolistController.delAll);
app.get("/", (req, res) => {
  res.send({
    message: "success",
  });
});

app.listen(8888, () => {
  console.log("Server is running on port 8888");
});
