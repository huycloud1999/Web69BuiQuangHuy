import express from "express";
import crypto from "crypto";
const app = express();
const todoList = [];
// tạo ra 1 biến lưu trữ todoList const todoList=[]
/*
*viết end point trả ra dữ liệu của todoList
* viết 1 ep thêm dữ liệu vào mảng todoList
* mỗi 1 todolist có dnag như sau: {
    id,
    todoName,
    createAt
    * trả về cho client todolist hiện tại
}
 */
app.get("/welcome", (req, res) => {
  ///send,end,json
  // res.end('xin chao client');
  // res.json(888)
  // res.send(888)
});
app.get("/TodoList/add", (req, res) => {
  const { todoName } = req.query;
  if (!todoName) {
    res.send({
      message: "fail",
      data: todoList,
      success: false,
    });
  } else {
    const newTodo = {
      id: crypto.randomUUID(),
      todoName: todoName,
      creatAt: new Date().getTime(),
    };
    todoList.push(newTodo);
    res.send({
      success: true,
      message: "thanh cong",
      data: todoList,
    });
  }
});
//bài1

app.get("/todoList", (req, res) => {
  res.send({
    message: "thanh cong",
    data: todoList,
    success: true,
  });
});
app.listen(8888, () => {
  console.log("hello world");
});
