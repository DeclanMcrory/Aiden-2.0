import { taskService } from '../services/TaskService.js';
import { logger } from '../utils/logger.js';

export const taskController = {
  async getAllTasks(req, res, next) {
    try {
      const tasks = await taskService.getTasks();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },

  async getTaskById(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },

  async assignTask(req, res, next) {
    try {
      const { agentId } = req.body;
      const task = await taskService.assignTask(req.params.id, agentId);
      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  async updateTaskStatus(req, res, next) {
    try {
      const { status, result } = req.body;
      const task = await taskService.updateTaskStatus(req.params.id, status, result);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
};