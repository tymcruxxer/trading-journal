from sqlalchemy import Column, Integer, String, Float, DateTime
from .database import Base

class Trade(Base):
    __tablename__ = "trades"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String)
    profit = Column(Float)
    volume = Column(Float)
    price = Column(Float)
    trade_type = Column(String)
    time = Column(DateTime)