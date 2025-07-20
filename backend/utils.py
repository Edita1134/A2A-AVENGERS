from datetime import datetime, timedelta
from typing import Optional
import random

def calculate_financial_health_score(
    savings_rate: float,
    debt_to_income_ratio: float,
    emergency_fund_months: float,
    investment_return: float,
    goal_completion_rate: float
) -> tuple[float, str]:
    """
    Calculate financial health score based on various metrics
    Returns (score, status)
    """
    score = 0
    
    # Savings rate (0-3 points)
    if savings_rate >= 20:
        score += 3
    elif savings_rate >= 10:
        score += 2
    elif savings_rate >= 5:
        score += 1
    
    # Debt-to-income ratio (0-2 points)
    if debt_to_income_ratio <= 10:
        score += 2
    elif debt_to_income_ratio <= 30:
        score += 1
    
    # Emergency fund (0-2 points)
    if emergency_fund_months >= 6:
        score += 2
    elif emergency_fund_months >= 3:
        score += 1
    
    # Investment returns (0-2 points)
    if investment_return >= 10:
        score += 2
    elif investment_return >= 5:
        score += 1
    
    # Goal completion rate (0-1 point)
    if goal_completion_rate >= 80:
        score += 1
    
    # Convert to 10-point scale
    final_score = (score / 10) * 10
    
    if final_score >= 8:
        status = "Excellent"
    elif final_score >= 6:
        status = "Good"
    elif final_score >= 4:
        status = "Fair"
    else:
        status = "Needs Improvement"
    
    return final_score, status

def generate_insights(transactions, goals, achievements) -> list[str]:
    """Generate financial insights based on user data"""
    insights = []
    
    if not transactions:
        insights.append("Start tracking your transactions to get personalized insights.")
        return insights
    
    # Analyze spending patterns
    recent_expenses = [t for t in transactions if t.type == "expense" and 
                      (datetime.utcnow() - t.date).days <= 30]
    
    if recent_expenses:
        total_expenses = sum(abs(t.amount) for t in recent_expenses)
        if total_expenses > 5000:
            insights.append("Your monthly expenses are higher than average. Consider reviewing your budget.")
        
        # Category analysis
        categories = {}
        for t in recent_expenses:
            categories[t.category] = categories.get(t.category, 0) + abs(t.amount)
        
        if categories:
            top_category = max(categories, key=categories.get)
            insights.append(f"Your highest spending category this month is {top_category}.")
    
    # Goal progress analysis
    if goals:
        overdue_goals = [g for g in goals if g.deadline < datetime.utcnow() and g.status == "active"]
        if overdue_goals:
            insights.append(f"You have {len(overdue_goals)} overdue goals. Consider reviewing your timeline.")
        
        high_progress_goals = [g for g in goals if (g.current_amount / g.target_amount) > 0.8]
        if high_progress_goals:
            insights.append(f"Great progress! {len(high_progress_goals)} of your goals are almost complete.")
    
    # Achievement analysis
    if achievements:
        recent_achievements = [a for a in achievements if 
                              (datetime.utcnow() - a.date_achieved).days <= 30]
        if recent_achievements:
            insights.append(f"Congratulations! You've earned {len(recent_achievements)} achievements this month.")
    
    return insights

def format_currency(amount: float) -> str:
    """Format currency for display"""
    return f"${amount:,.2f}"

def calculate_goal_progress(current: float, target: float) -> float:
    """Calculate goal progress percentage"""
    if target <= 0:
        return 0
    return min(100, (current / target) * 100)

def get_time_until_deadline(deadline: datetime) -> str:
    """Get human-readable time until deadline"""
    now = datetime.utcnow()
    diff = deadline - now
    
    if diff.days < 0:
        return "Overdue"
    elif diff.days == 0:
        return "Due today"
    elif diff.days == 1:
        return "1 day left"
    elif diff.days < 30:
        return f"{diff.days} days left"
    elif diff.days < 365:
        months = diff.days // 30
        return f"{months} month{'s' if months != 1 else ''} left"
    else:
        years = diff.days // 365
        return f"{years} year{'s' if years != 1 else ''} left"

def validate_transaction_amount(amount: float, transaction_type: str) -> float:
    """Validate and format transaction amount based on type"""
    if transaction_type == "expense" and amount > 0:
        return -amount
    elif transaction_type in ["income", "investment"] and amount < 0:
        return abs(amount)
    return amount
