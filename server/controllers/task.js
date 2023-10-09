const Task = require("../models/Task.js");

exports.createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (title === "") {
            return next(new Error("Title cannot be empty"));
        }
        if (description === "") {
            return next(new Error("Description cannot be empty"));
        }
        user = req.user._id;
        const task = await Task.create({
            title,
            description,
            user
        })
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        })
    } catch (error) {
        return next(new Error(error.message))
    }
}

exports.getAllTasksOfLoggedInUser = async (req, res, next) => {
    try {
        const user = req.user._id;
        const tasks = await Task.find({ user });
        if (!tasks) {
            return res.status(404).json({
                success: false,
                message: "No tasks found"
            })
        }
        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        return next(new Error(error.message));
    }
}

exports.updateTask = async (req, res, next) => {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
        return next(new Error("Task with this id does not exists"));
    }
    task.isComplete = !task.isComplete;
    await task.save();
    res.status(200).json({
        sucess: true,
        message: "Task updated successfully",
        task
    })
}

exports.deleteTask = async (req, res, next) => {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
        return next(new Error("Task with this id does not exists"));
    }
    await task.deleteOne();
    res.status(200).json({
        success: true,
        message: "Task deleted successfully",
    })
}