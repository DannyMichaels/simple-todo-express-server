const Todo = require('../models/todo');
const { logRequest, handleError } = require('../lib');

// To Create a Todo
exports.createTodo = async (req, res) => {
  try {
    logRequest(req);
    const todo = new Todo(req.body);
    const createdTodo = await todo.save();
    return res.status(201).json({
      status: 'Success',
      message: 'Todo Created Successfully!',
      todo: {
        ...createdTodo._doc,
        todoId: createdTodo._id,
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// To get list of Todos
exports.getTodos = async (req, res) => {
  try {
    logRequest(req);
    const todos = await Todo.find().sort({ onDate: -1 });
    return res.status(todos.length ? 200 : 404).json({
      status: 'Success',
      message: todos.length ? 'Todos Fetched Successfully!' : 'No Todos found!',
      todos,
      todoCount: todos.length,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// To get a specific Todo
exports.getTodo = async (req, res) => {
  try {
    logRequest(req);
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) {
      return res.status(404).json({
        status: 'Success',
        message: 'No Todo found with that Id!',
        todo: null,
      });
    }
    return res.status(200).json({
      status: 'Success',
      message: 'Todo Fetched Successfully!',
      todo,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// To Update a Todo
exports.updateTodo = async (req, res) => {
  try {
    logRequest(req);
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.todoId,
      {
        ...req.body,
        'timestamps.modifiedOn': Date.now(),
      },
      { new: true }
    );
    return res.status(200).json({
      status: 'Success',
      message: 'Todo Updated Successfully!',
      todo: updatedTodo,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// To Mark todo Complete
exports.completeTodo = async (req, res) => {
  try {
    logRequest(req);
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.todoId,
      {
        isCompleted: true,
        'timestamps.modifiedOn': Date.now(),
        'timestamps.completedOn': Date.now(),
      },
      { new: true }
    );
    return res.status(200).json({
      status: 'Success',
      message: 'Todo Marked as Completed!',
      todo: updatedTodo,
    });
  } catch (error) {
    return handleError(res, error);
  }
};

// To Delete a Todo
exports.deleteTodo = async (req, res) => {
  try {
    logRequest(req);
    await Todo.findByIdAndDelete(req.params.todoId);
    return res.status(200).json({
      status: 'Success',
      message: 'Todo Deleted Successfully!',
    });
  } catch (error) {
    return handleError(res, error);
  }
};
