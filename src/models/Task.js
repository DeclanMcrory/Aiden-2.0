import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['CODE_GENERATION', 'CODE_REVIEW', 'SOUND_PROCESSING', 'CONTENT_CREATION']
  },
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
  },
  priority: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent'
  },
  result: {
    output: mongoose.Schema.Types.Mixed,
    error: String
  },
  deadline: {
    type: Date
  }
}, {
  timestamps: true
});

export const Task = mongoose.model('Task', taskSchema);