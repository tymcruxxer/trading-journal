from pydantic import BaseModel
from datetime import datetime

class TradeCreate(BaseModel):
    symbol: str
    profit: float
    volume: float
    price: float
    trade_type: str
    time: datetime

class TradeResponse(TradeCreate):
    id: int

    class Config:
        from_attributes = True