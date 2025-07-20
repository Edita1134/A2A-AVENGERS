from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from main import Base, Transaction, FinancialGoal, Achievement, TransactionType, GoalCategory, Priority, Status

def create_sample_data():
    """Create sample data for the financial dashboard"""
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Clear existing data
        db.query(Transaction).delete()
        db.query(FinancialGoal).delete()
        db.query(Achievement).delete()
        db.commit()
        
        # Sample Transactions
        transactions = [
            Transaction(
                description="Salary Deposit",
                amount=8500,
                date=datetime.utcnow() - timedelta(days=1),
                category="Salary",
                type=TransactionType.income
            ),
            Transaction(
                description="Stock Investment - AAPL",
                amount=-2000,
                date=datetime.utcnow() - timedelta(days=2),
                category="Stocks",
                type=TransactionType.investment
            ),
            Transaction(
                description="Grocery Shopping",
                amount=-450,
                date=datetime.utcnow() - timedelta(days=3),
                category="Food",
                type=TransactionType.expense
            ),
            Transaction(
                description="Emergency Fund Transfer",
                amount=-1000,
                date=datetime.utcnow() - timedelta(days=5),
                category="Savings",
                type=TransactionType.expense
            ),
            Transaction(
                description="Freelance Project",
                amount=1200,
                date=datetime.utcnow() - timedelta(days=7),
                category="Freelance",
                type=TransactionType.income
            ),
            Transaction(
                description="Netflix Subscription",
                amount=-15.99,
                date=datetime.utcnow() - timedelta(days=10),
                category="Entertainment",
                type=TransactionType.expense
            ),
            Transaction(
                description="Gas Station",
                amount=-65,
                date=datetime.utcnow() - timedelta(days=12),
                category="Transportation",
                type=TransactionType.expense
            ),
            Transaction(
                description="ETF Investment",
                amount=-1500,
                date=datetime.utcnow() - timedelta(days=15),
                category="ETFs",
                type=TransactionType.investment
            ),
        ]
        
        for transaction in transactions:
            db.add(transaction)
        
        # Sample Financial Goals
        goals = [
            FinancialGoal(
                title="Emergency Fund",
                target_amount=50000,
                current_amount=32000,
                deadline=datetime.utcnow() + timedelta(days=365),
                category=GoalCategory.savings,
                priority=Priority.high,
                status=Status.active
            ),
            FinancialGoal(
                title="House Down Payment",
                target_amount=200000,
                current_amount=85000,
                deadline=datetime.utcnow() + timedelta(days=550),
                category=GoalCategory.savings,
                priority=Priority.high,
                status=Status.active
            ),
            FinancialGoal(
                title="Investment Portfolio",
                target_amount=100000,
                current_amount=75000,
                deadline=datetime.utcnow() + timedelta(days=365),
                category=GoalCategory.investment,
                priority=Priority.medium,
                status=Status.active
            ),
            FinancialGoal(
                title="Credit Card Debt",
                target_amount=0,
                current_amount=5000,
                deadline=datetime.utcnow() + timedelta(days=240),
                category=GoalCategory.debt,
                priority=Priority.high,
                status=Status.active
            ),
            FinancialGoal(
                title="Vacation Fund",
                target_amount=15000,
                current_amount=8500,
                deadline=datetime.utcnow() + timedelta(days=180),
                category=GoalCategory.savings,
                priority=Priority.low,
                status=Status.active
            )
        ]
        
        for goal in goals:
            db.add(goal)
        
        # Sample Achievements
        achievements = [
            Achievement(
                title="First $10K Saved",
                description="Reached your first major savings milestone",
                date_achieved=datetime.utcnow() - timedelta(days=45),
                category="Savings",
                value=10000
            ),
            Achievement(
                title="Debt-Free Month",
                description="Went a full month without adding new debt",
                date_achieved=datetime.utcnow() - timedelta(days=30),
                category="Debt Management",
                value=0
            ),
            Achievement(
                title="Investment Milestone",
                description="Portfolio reached $50K value",
                date_achieved=datetime.utcnow() - timedelta(days=60),
                category="Investment",
                value=50000
            ),
            Achievement(
                title="Budget Master",
                description="Stayed under budget for 6 consecutive months",
                date_achieved=datetime.utcnow() - timedelta(days=90),
                category="Budgeting",
                value=6
            ),
            Achievement(
                title="Emergency Fund Builder",
                description="Built emergency fund covering 3 months of expenses",
                date_achieved=datetime.utcnow() - timedelta(days=120),
                category="Savings",
                value=25000
            )
        ]
        
        for achievement in achievements:
            db.add(achievement)
        
        db.commit()
        print("✅ Sample data created successfully!")
        
    except Exception as e:
        print(f"❌ Error creating sample data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()
