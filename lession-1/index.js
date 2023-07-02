import express from "express";
import crypto from "crypto";
const app = express();
let todoList = [];
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
//bài1 : remove theo id
app.get("/TodoList/remove", (req, res) => {
  const { todoId } = req.query;

  if (!todoId) {
    res.send({
      success: false,
      message: "Remove fail: missing todoId",
      data: todoList,
    });
  }

  const updatedTodoList = todoList.filter((item) => item.id !== todoId);

  if (updatedTodoList.length === todoList.length) {
    res.send({
      success: false,
      message: "Remove fail: Không tìm thấy id",
      data: todoList,
    });
  }

  todoList = updatedTodoList;

  return res.send({
    success: true,
    message: "Remove success",
    data: todoList,
  });
});
//Tìm kiếm todoName theo các ký tự truyền qua query param
app.get("/TodoList/find", (req, res) => {
  const { todoName } = req.query;
  if (!todoName) {
    res.send({
      message: "Find fail:missing todoName",
      data: todoList,
      success: false,
    });
  } else {
    const updatedTodoList = todoList.filter(
      (item) => item.todoName == todoName
    );
    if (updatedTodoList.length == 0) {
      res.send({
        success: false,
        message: "Không tìm thấy ",
        data: updatedTodoList,
      });
    }

    res.send({
      success: true,
      message: "Tìm kiếm thành công",
      data: updatedTodoList,
    });
  }
});

//- Xoá mảng todoList (làm rỗng array)
app.get("/TodoList/removeAll", (req, res) => {
  todoList = [];
  res.send({
    message: "xóa tất cả todolist thành công",
    data: todoList,
    success: true,
  });
});
//update
app.get("/TodoList/update", (req, res) => {
  const { todoId, todoName } = req.query;
  if (!todoId || !todoName) {
    return res.send({
      success: false,
      message: "Update fail: Missing todoId or updatedTodo",
      data: todoList,
    });
  }
  const todoIndex = todoList.findIndex((item) => item.id === todoId);
  if (todoIndex === -1) {
    return res.send({
      success: false,
      message: "Update fail: không tìm thấy Id",
      data: todoList,
    });
  }
  const updatedTodoList = {
    id: todoId,
    todoName: todoName,
    createdAt: new Date().getTime(),
  };
  todoList[todoIndex] = updatedTodoList;

  return res.send({
    success: true,
    message: "Update thành công",
    data: todoList,
  });
});
///xóa trùng
app.get("/TodoList/removeduplicate", (req, res) => {
    const uniqueTodoList = [];
  
    todoList.forEach((item) => {
      const index = uniqueTodoList.findIndex((todo) => todo.todoName === item.todoName);
      if (index !== -1) {
        uniqueTodoList[index] = item;
      } else {
        uniqueTodoList.push(item);
      }
    });
  todoList=uniqueTodoList
    return res.send({
      success: true,
      message: "Duplicate items removed",
      data: todoList,
    });
  });
  //phân trang
  // Đường dẫn: /TodoList?page=<page>&pageSize=<pageSize>
app.get("/TodoList", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
  
    const paginatedData = todoList.slice(startIndex, endIndex);
  
    return res.send({
      success: true,
      message: "Chiapage thành công",
      currentPage: page,
      pageSize: pageSize,
      totalItems: todoList.length,
      totalPages: Math.ceil(todoList.length / pageSize),
      data: paginatedData,
    });
  });
 



/*-------------------------------------*/
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
