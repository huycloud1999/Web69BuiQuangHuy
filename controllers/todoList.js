import { todoList } from "../index.js";
const todolistController= {
    getALL:(req, res) => {
        res.send({
          message: "sucess",
          data: todoList,
          success: true,
        });
      },
      getId:(req, res) => {
        const { id } = req.params;
        const crrTodo = todoList.find((item) => {
          return (item.id = id);
        });
        res.send({
          message: "sucess",
          data: crrTodo,
          success: true,
        });
      },
      post:(req,res)=>{
        const {todoName,date}=req.body;
        const newtodo={
            id:crypto.randomUUID(),
            todoName:todoName,
            date:date
        }
        todoList.push(newtodo)
        res.send({
            message:'add success',
            data:todoList,
            success:true
        })
},
        remove: (req, res) => {
          const { id } = req.params;
          const index = todoList.findIndex((item) => item.id === id);
          if (index !== -1) {
            todoList.splice(index, 1);
            res.send({
              message: "remove success",
              data: todoList,
              success: true,
            });
          } else {
            res.send({
              message: "error",
              success: false,
            });
          }
        },
        updateTodoName: (req, res) => {
          const { id } = req.params;
          const { todoName } = req.body;
          const todoItem = todoList.find((item) => item.id === id);
          if (todoItem) {
            todoItem.todoName = todoName;
            res.send({
              message: "update success",
              data: todoList,
              success: true,
            });
          } else {
            res.send({
              message: "error",
              success: false,
            });
          }
        },
        removeDuplicate: (req, res) => {
          const uniqueTodoList = [];
          todoList.forEach((item) => {
            const index = uniqueTodoList.findIndex(
              (todo) => todo.todoName === item.todoName
            );
            if (index === -1) {
              uniqueTodoList.push(item);
            }
          });
          while (todoList.length > 0) {
            todoList.pop();
          }
          uniqueTodoList.forEach((item) => {
            todoList.push(item);
          });
          res.send({
            success: true,
            message: "Duplicate items removed",
            data: todoList,
          });
        },
        delAll:(req, res) => {
          todoList.splice(0, todoList.length);
          res.send({
            success: true,
            message: "All items removed",
            data: todoList,
          });
        },
        paginated:(req, res) => {
          let{page,pageSize} =req.query;
          if(!page||!pageSize){
              page=1;
              pageSize=5;
            
          }
          page=parseInt(page);
          pageSize=parseInt(pageSize);
        
          const startIndex = (page - 1) * pageSize;
          const endIndex = page * pageSize;
        
          const paginatedData = todoList.slice(startIndex, endIndex);
        
          res.send({
            success: true,
            message: "Chiapage thành công",
            currentPage: page,
            pageSize: pageSize,
            totalItems: todoList.length,
            totalPages: Math.ceil(todoList.length / pageSize),
            data: paginatedData,
          });
        }
        
       
};
export default todolistController;