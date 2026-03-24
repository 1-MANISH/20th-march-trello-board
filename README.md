# Trello Clone

A simple, file-based Trello clone built with Node.js and React. This project implements core Trello-like functionality including organizations, boards, issues, and drag-and-drop task management. It's designed as a learning project or lightweight alternative for small teams.

## Features

### Authentication
- **Sign Up / Login**: Cookie-based authentication using JWT tokens
- Secure password hashing with bcrypt
- Session management via HTTP-only cookies

### Organizations
- Create and manage organizations
- Admin role for organization management
- Member invitation and management

### Boards & Issues
- Create boards within organizations
- Add issues to boards with titles and descriptions
- Drag-and-drop issue status updates (Next Up → In Progress → Done)
- Real-time UI updates for the current user
- Persistent storage in file system

### User Roles
- **Admin**: Create organizations, boards, issues; add/remove members
- **Member**: View organization boards, manage issues, update status

### Data Persistence
- File-based storage (no database required)
- JSON file storage for simplicity and portability
- All changes persist across sessions

## Tech Stack

### Frontend
- **React**: Component-based UI
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **React Icons**: Icon library
- **SCSS**: Styling with CSS variables

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **cookie-parser**: Cookie handling
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Installation - Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trello-clone
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   ```
   Look into sample.env
     ```

5. **Start the backend**
   ```bash
   cd backend
   npm start or npm run dev
   ```

6. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173 (or your Vite port)
   - Backend: http://localhost:4001

## Usage

### Getting Started
1. Sign up for a new account or login
2. Create an organization
3. Add members to your organization
4. Create boards within organizations
5. Add issues to boards
6. Drag issues between columns to update status

### Key Workflows
- **Admin Workflow**: Create org → Add members → Create boards → Add issues
- **Member Workflow**: Login → View assigned organizations → Work on issues → Drag to update status

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout

### Organizations
- `POST /api/v1/organization/create` - Create organization
- `GET /api/v1/organization/all` - Get all user organizations
- `GET /api/v1/organization/:id` - Get organization details

### Members
- `GET /api/v1/member/allow-member-lists/:orgId` - Get allowed members
- `POST /api/v1/member/add-member-to-organization/:orgId` - Add member
- `DELETE /api/v1/member/delete-member-from-organization` - Remove member

### Boards
- `POST /api/v1/board/create` - Create board

### Issues
- `POST /api/v1/issue/create` - Create issue
- `PUT /api/v1/issue/update-status` - Update issue status

## Project Structure

```
trello-clone/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   └── trello_space/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## Issues & Solutions

This project addresses common issues in similar repositories:

- **File-based storage**: No database setup required, making it easy to run locally
- **Frontend & backend**: Worked can be done on ui
- **Simple authentication**: JWT with cookies for secure session management
- **Drag-and-drop**: Native HTML5 drag API for smooth issue management
- **Role-based access**: Clear separation between admin and member permissions
- **Responsive design**: Works on desktop and mobile devices


## Acknowledgments

- Inspired by Trello for the kanban board concept
- Built as a learning project for full-stack development
- Uses modern React patterns and Express best practices
