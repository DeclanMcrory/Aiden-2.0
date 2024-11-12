import { Agent } from '../models/Agent.js';
import { logger } from '../utils/logger.js';

class AgentService {
  async createAgent(agentData) {
    try {
      const agent = new Agent(agentData);
      await agent.save();
      logger.info(`Agent created: ${agent.name}`);
      return agent;
    } catch (error) {
      logger.error('Error creating agent:', error);
      throw error;
    }
  }

  async getAgents(filter = {}) {
    try {
      return await Agent.find(filter);
    } catch (error) {
      logger.error('Error fetching agents:', error);
      throw error;
    }
  }

  async getAgentById(id) {
    try {
      const agent = await Agent.findById(id);
      if (!agent) {
        throw new Error('Agent not found');
      }
      return agent;
    } catch (error) {
      logger.error(`Error fetching agent ${id}:`, error);
      throw error;
    }
  }

  async updateAgentStatus(id, status) {
    try {
      const agent = await Agent.findByIdAndUpdate(
        id,
        { 
          status,
          lastActive: Date.now()
        },
        { new: true }
      );
      if (!agent) {
        throw new Error('Agent not found');
      }
      logger.info(`Agent ${id} status updated to ${status}`);
      return agent;
    } catch (error) {
      logger.error(`Error updating agent ${id}:`, error);
      throw error;
    }
  }
}

export const agentService = new AgentService();