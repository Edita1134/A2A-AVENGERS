from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Enum as SQLEnum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
import enum

app = FastAPI(title="Financial Strategy & Achievements API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./financial_dashboard.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Enums
class TransactionType(str, enum.Enum):
    income = "income"
    expense = "expense"
    investment = "investment"

class GoalCategory(str, enum.Enum):
    savings = "savings"
    investment = "investment"
    debt = "debt"
    income = "income"

class Priority(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Status(str, enum.Enum):
    active = "active"
    completed = "completed"
    paused = "paused"

# Database Models
class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, index=True)
    amount = Column(Float)
    date = Column(DateTime, default=datetime.utcnow)
    category = Column(String)
    type = Column(SQLEnum(TransactionType))

class FinancialGoal(Base):
    __tablename__ = "financial_goals"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    target_amount = Column(Float)
    current_amount = Column(Float, default=0)
    deadline = Column(DateTime)
    category = Column(SQLEnum(GoalCategory))
    priority = Column(SQLEnum(Priority))
    status = Column(SQLEnum(Status), default=Status.active)
    created_at = Column(DateTime, default=datetime.utcnow)

class Achievement(Base):
    __tablename__ = "achievements"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    date_achieved = Column(DateTime, default=datetime.utcnow)
    category = Column(String)
    value = Column(Float)

# Pydantic Models
class TransactionCreate(BaseModel):
    description: str
    amount: float
    category: str
    type: TransactionType
    date: Optional[datetime] = None

class TransactionResponse(BaseModel):
    id: int
    description: str
    amount: float
    date: datetime
    category: str
    type: TransactionType
    
    class Config:
        from_attributes = True

class FinancialGoalCreate(BaseModel):
    title: str
    target_amount: float
    current_amount: float = 0
    deadline: datetime
    category: GoalCategory
    priority: Priority

class FinancialGoalUpdate(BaseModel):
    title: Optional[str] = None
    target_amount: Optional[float] = None
    current_amount: Optional[float] = None
    deadline: Optional[datetime] = None
    category: Optional[GoalCategory] = None
    priority: Optional[Priority] = None
    status: Optional[Status] = None

class FinancialGoalResponse(BaseModel):
    id: int
    title: str
    target_amount: float
    current_amount: float
    deadline: datetime
    category: GoalCategory
    priority: Priority
    status: Status
    created_at: datetime
    
    class Config:
        from_attributes = True

class AchievementCreate(BaseModel):
    title: str
    description: str
    category: str
    value: float
    date_achieved: Optional[datetime] = None

class AchievementResponse(BaseModel):
    id: int
    title: str
    description: str
    date_achieved: datetime
    category: str
    value: float
    
    class Config:
        from_attributes = True

class FinancialMetrics(BaseModel):
    total_assets: float
    monthly_income: float
    monthly_expenses: float
    savings_rate: float
    investment_returns: float
    debt_to_income_ratio: float

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create tables
Base.metadata.create_all(bind=engine)

# Routes
@app.get("/")
async def root():
    return {"message": "Financial Strategy & Achievements API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Transaction endpoints
@app.post("/api/transactions", response_model=TransactionResponse)
async def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    db_transaction = Transaction(
        description=transaction.description,
        amount=transaction.amount,
        category=transaction.category,
        type=transaction.type,
        date=transaction.date or datetime.utcnow()
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.get("/api/transactions", response_model=List[TransactionResponse])
async def get_transactions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    transactions = db.query(Transaction).order_by(Transaction.date.desc()).offset(skip).limit(limit).all()
    return transactions

@app.get("/api/transactions/{transaction_id}", response_model=TransactionResponse)
async def get_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@app.delete("/api/transactions/{transaction_id}")
async def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    db.delete(transaction)
    db.commit()
    return {"message": "Transaction deleted successfully"}

# Financial Goals endpoints
@app.post("/api/goals", response_model=FinancialGoalResponse)
async def create_goal(goal: FinancialGoalCreate, db: Session = Depends(get_db)):
    db_goal = FinancialGoal(
        title=goal.title,
        target_amount=goal.target_amount,
        current_amount=goal.current_amount,
        deadline=goal.deadline,
        category=goal.category,
        priority=goal.priority
    )
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal

@app.get("/api/goals", response_model=List[FinancialGoalResponse])
async def get_goals(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    goals = db.query(FinancialGoal).offset(skip).limit(limit).all()
    return goals

@app.get("/api/goals/{goal_id}", response_model=FinancialGoalResponse)
async def get_goal(goal_id: int, db: Session = Depends(get_db)):
    goal = db.query(FinancialGoal).filter(FinancialGoal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    return goal

@app.put("/api/goals/{goal_id}", response_model=FinancialGoalResponse)
async def update_goal(goal_id: int, goal_update: FinancialGoalUpdate, db: Session = Depends(get_db)):
    goal = db.query(FinancialGoal).filter(FinancialGoal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    update_data = goal_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(goal, field, value)
    
    db.commit()
    db.refresh(goal)
    return goal

@app.delete("/api/goals/{goal_id}")
async def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    goal = db.query(FinancialGoal).filter(FinancialGoal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    db.delete(goal)
    db.commit()
    return {"message": "Goal deleted successfully"}

# Achievement endpoints
@app.post("/api/achievements", response_model=AchievementResponse)
async def create_achievement(achievement: AchievementCreate, db: Session = Depends(get_db)):
    db_achievement = Achievement(
        title=achievement.title,
        description=achievement.description,
        category=achievement.category,
        value=achievement.value,
        date_achieved=achievement.date_achieved or datetime.utcnow()
    )
    db.add(db_achievement)
    db.commit()
    db.refresh(db_achievement)
    return db_achievement

@app.get("/api/achievements", response_model=List[AchievementResponse])
async def get_achievements(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    achievements = db.query(Achievement).order_by(Achievement.date_achieved.desc()).offset(skip).limit(limit).all()
    return achievements

@app.get("/api/achievements/{achievement_id}", response_model=AchievementResponse)
async def get_achievement(achievement_id: int, db: Session = Depends(get_db)):
    achievement = db.query(Achievement).filter(Achievement.id == achievement_id).first()
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    return achievement

@app.delete("/api/achievements/{achievement_id}")
async def delete_achievement(achievement_id: int, db: Session = Depends(get_db)):
    achievement = db.query(Achievement).filter(Achievement.id == achievement_id).first()
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    db.delete(achievement)
    db.commit()
    return {"message": "Achievement deleted successfully"}

# Analytics endpoints
@app.get("/api/metrics", response_model=FinancialMetrics)
async def get_financial_metrics(db: Session = Depends(get_db)):
    # Get all transactions
    transactions = db.query(Transaction).all()
    
    # Calculate metrics
    total_income = sum(t.amount for t in transactions if t.type == TransactionType.income)
    total_expenses = sum(abs(t.amount) for t in transactions if t.type == TransactionType.expense)
    total_investments = sum(abs(t.amount) for t in transactions if t.type == TransactionType.investment)
    
    # Monthly averages (assuming we have at least some data)
    monthly_income = total_income / max(1, len([t for t in transactions if t.type == TransactionType.income]))
    monthly_expenses = total_expenses / max(1, len([t for t in transactions if t.type == TransactionType.expense]))
    
    # Calculate ratios
    savings_rate = ((monthly_income - monthly_expenses) / monthly_income * 100) if monthly_income > 0 else 0
    total_assets = total_income - total_expenses + total_investments
    debt_to_income_ratio = 15.2  # Mock value for now
    investment_returns = 11.8  # Mock value for now
    
    return FinancialMetrics(
        total_assets=total_assets,
        monthly_income=monthly_income,
        monthly_expenses=monthly_expenses,
        savings_rate=savings_rate,
        investment_returns=investment_returns,
        debt_to_income_ratio=debt_to_income_ratio
    )

@app.get("/api/dashboard")
async def get_dashboard_data(db: Session = Depends(get_db)):
    """Get all dashboard data in one request"""
    transactions = db.query(Transaction).order_by(Transaction.date.desc()).limit(5).all()
    goals = db.query(FinancialGoal).filter(FinancialGoal.status == Status.active).all()
    achievements = db.query(Achievement).order_by(Achievement.date_achieved.desc()).limit(4).all()
    
    # Get metrics
    metrics = await get_financial_metrics(db)
    
    return {
        "transactions": transactions,
        "goals": goals,
        "achievements": achievements,
        "metrics": metrics
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
