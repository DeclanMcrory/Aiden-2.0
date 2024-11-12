import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['DEVELOPER', 'SOUND_ENGINEER', 'CONTENT_CREATOR', 'MARKETING']
  },
  status: {
    type: String,
    enum: ['IDLE', 'BUSY', 'OFFLINE', 'ERROR'],
    default: 'IDLE'
  },
  capabilities: [{
    type: String
  }],
  performance: {
    tasksCompleted: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 },
    averageResponseTime: { type: Number, default: 0 }
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export const Agent = mongoose.model('Agent', agentSchema);