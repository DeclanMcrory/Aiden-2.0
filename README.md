# A.I.D.E.N. (Artificial Intelligence Development and Engineering Network)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%3E%3D%206.0.0-green)](https://www.mongodb.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A sophisticated AI orchestration system for deploying and managing specialized AI agents. A.I.D.E.N. leverages natural language processing, machine learning, and distributed computing to provide seamless operation and management of AI tasks.

## Features

- 🤖 **Agent Management**
  - Multiple agent types (Developer, Sound Engineer, Content Creator, Marketing)
  - Real-time status monitoring
  - Performance tracking
  - Capability-based routing

- 📋 **Task Orchestration**
  - Automated task assignment
  - Priority-based queuing
  - Progress tracking
  - Result management

- 🔐 **Security**
  - JWT authentication
  - Role-based access control
  - Request validation
  - Secure communication

- 📊 **Monitoring**
  - Real-time agent status
  - Task completion metrics
  - Performance analytics
  - Error tracking

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Logging**: Winston
- **Security**: Helmet, CORS
- **Testing**: Jest
- **Documentation**: OpenAPI/Swagger

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB >= 6.0.0

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aiden.git
   cd aiden
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Agent Endpoints

#### GET /api/v1/agents
- List all agents
- Query parameters for filtering by status and type
- Returns array of agent objects

#### GET /api/v1/agents/:id
- Get detailed information about a specific agent
- Returns single agent object with performance metrics

#### POST /api/v1/agents
- Create a new agent
- Required fields: name, type, capabilities
- Returns created agent object

#### PATCH /api/v1/agents/:id/status
- Update agent status
- Allowed statuses: IDLE, BUSY, OFFLINE, ERROR
- Returns updated agent object

### Task Endpoints

#### GET /api/v1/tasks
- List all tasks
- Query parameters for filtering by status and type
- Returns array of task objects

#### GET /api/v1/tasks/:id
- Get detailed information about a specific task
- Returns single task object with assigned agent

#### POST /api/v1/tasks
- Create a new task
- Required fields: title, description, type, priority
- Returns created task object

#### POST /api/v1/tasks/:id/assign
- Assign task to an agent
- Required field: agentId
- Returns updated task object

#### PATCH /api/v1/tasks/:id/status
- Update task status
- Allowed statuses: PENDING, IN_PROGRESS, COMPLETED, FAILED
- Optional result object for completed tasks
- Returns updated task object

## Data Models

### Agent Model
```javascript
{
  name: String,          // Required, unique
  type: String,          // DEVELOPER, SOUND_ENGINEER, CONTENT_CREATOR, MARKETING
  status: String,        // IDLE, BUSY, OFFLINE, ERROR
  capabilities: [String],
  performance: {
    tasksCompleted: Number,
    successRate: Number,
    averageResponseTime: Number
  },
  lastActive: Date
}
```

### Task Model
```javascript
{
  title: String,         // Required
  description: String,   // Required
  type: String,         // CODE_GENERATION, CODE_REVIEW, SOUND_PROCESSING, CONTENT_CREATION
  status: String,       // PENDING, IN_PROGRESS, COMPLETED, FAILED
  priority: Number,     // 1-5
  assignedAgent: ObjectId,
  result: {
    output: Mixed,
    error: String
  },
  deadline: Date
}
```

## Project Structure

```
aiden/
├── src/
│   ├── config/
│   │   └── database.js     # Database configuration
│   ├── controllers/
│   │   ├── agentController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js         # JWT authentication
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Agent.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── agentRoutes.js
│   │   └── taskRoutes.js
│   ├── services/
│   │   ├── AgentService.js
│   │   └── TaskService.js
│   ├── utils/
│   │   └── logger.js
│   └── index.js           # Application entry point
├── tests/                 # Test files
├── .env                   # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Error Handling

The system implements comprehensive error handling:
- Validation errors (400)
- Authentication errors (401)
- Not found errors (404)
- Conflict errors (409)
- Internal server errors (500)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support:
- 📧 Email: support@aiden.ai
- 💬 Slack: [Join our community](https://aiden-community.slack.com)
- 📖 Documentation: [docs.aiden.ai](https://docs.aiden.ai)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/aiden/issues)