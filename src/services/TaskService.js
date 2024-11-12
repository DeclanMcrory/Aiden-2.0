import { Task } from '../models/Task.js';
import { Agent } from '../models/Agent.js';
import { logger } from '../utils/logger.js';

class TaskService {
  async createTask(taskData) {
    try {
      const task = new Task(taskData);
      await task.save();
      logger.info(`Task created: ${task.title}`);
      return task;
    } catch (error) {
      logger.error('Error creating task:', error);
      throw error;
    }
  }

  async getTasks(filter = {}) {
    try {
      return await Task.find(filter).populate('assignedAgent');
    } catch (error) {
      logger.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async getTaskById(id) {
    try {
      const task = await Task.findById(id).populate('assignedAgent');
      if (!task) {
        throw new Error('Task not found');
      }
      return task;
    } catch (error) {
      logger.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  }

  async assignTask(taskId, agentId) {
    try {
      const [task, agent] = await Promise.all([
        Task.findById(taskId),
        Agent.findById(agentId)
      ]);

      if (!task || !agent) {
        throw new Error('Task or Agent not found');
      }

      if (agent.status !== 'IDLE') {
        throw new Error('Agent is not available');
      }

      task.assignedAgent = agentId;
      task.status = 'IN_PROGRESS';
      agent.status = 'BUSY';

      await Promise.all([task.save(), agent.save()]);
      logger.info(`Task ${taskId} assigned to agent ${agentId}`);
      
      return task;
    } catch (error) {
      logger.error(`Error assigning task ${taskId}:`, error);
      throw error;
    }
  }

  async updateTaskStatus(id, status, result = null) {
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw new Error('Task not found');
      }

      task.status = status;
      if (result) {
        task.result = result;
      }

      if (status === 'COMPLETED' || status === 'FAILED') {
        if (task.assignedAgent) {
          await Agent.findByIdAndUpdate(task.assignedAgent, { status: 'IDLE' });
        }
      }

      await task.save();
      logger.info(`Task ${id} status updated to ${status}`);
      return task;
    } catch (error) {
      logger.error(`Error updating task ${id}:`, error);
      throw error;
    }
  }
}

export const taskService = new TaskService();