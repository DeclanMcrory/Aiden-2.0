import { agentService } from '../services/AgentService.js';
import { logger } from '../utils/logger.js';

export const agentController = {
  async getAllAgents(req, res, next) {
    try {
      const agents = await agentService.getAgents();
      res.json(agents);
    } catch (error) {
      next(error);
    }
  },

  async getAgentById(req, res, next) {
    try {
      const agent = await agentService.getAgentById(req.params.id);
      res.json(agent);
    } catch (error) {
      next(error);
    }
  },

  async createAgent(req, res, next) {
    try {
      const agent = await agentService.createAgent(req.body);
      res.status(201).json(agent);
    } catch (error) {
      next(error);
    }
  },

  async updateAgentStatus(req, res, next) {
    try {
      const { status } = req.body;
      const agent = await agentService.updateAgentStatus(req.params.id, status);
      res.json(agent);
    } catch (error) {
      next(error);
    }
  }
};