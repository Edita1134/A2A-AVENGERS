# Financial Strategy & Achievements Dashboard - Backend

A comprehensive FastAPI backend for the Financial Strategy & Achievements Dashboard.

## Features

- **Transaction Management**: Create, read, update, and delete financial transactions
- **Goal Tracking**: Set and monitor financial goals with progress tracking
- **Achievement System**: Track and celebrate financial milestones
- **Analytics**: Calculate financial metrics and health scores
- **RESTful API**: Clean, documented API endpoints
- **Database**: SQLite database with SQLAlchemy ORM

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Transactions
- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/{id}` - Get specific transaction
- `DELETE /api/transactions/{id}` - Delete transaction

### Financial Goals
- `POST /api/goals` - Create a new goal
- `GET /api/goals` - Get all goals
- `GET /api/goals/{id}` - Get specific goal
- `PUT /api/goals/{id}` - Update goal
- `DELETE /api/goals/{id}` - Delete goal

### Achievements
- `POST /api/achievements` - Create achievement
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/{id}` - Get specific achievement
- `DELETE /api/achievements/{id}` - Delete achievement

### Analytics
- `GET /api/metrics` - Get financial metrics
- `GET /api/dashboard` - Get all dashboard data

## Database Schema

The API uses SQLite with the following main tables:
- `transactions` - Financial transactions
- `financial_goals` - User financial goals
- `achievements` - Completed achievements

## Environment Variables

Create a `.env` file for configuration:
```
DATABASE_URL=sqlite:///./financial_dashboard.db
SECRET_KEY=your-secret-key-here
```

## Development

The API includes:
- CORS middleware for frontend integration
- Pydantic models for data validation
- SQLAlchemy ORM for database operations
- Comprehensive error handling
- Type hints throughout
