from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Trade
from ..schemas import TradeCreate, TradeResponse

router = APIRouter(prefix="/api/trades", tags=["Trades"])


@router.post("/upload")
def upload_trades(trades: List[TradeCreate], db: Session = Depends(get_db)):
    count = 0

    for t in trades:
        # simple deduplication
        exists = db.query(Trade).filter(
            Trade.symbol == t.symbol,
            Trade.time == t.time
        ).first()

        if not exists:
            new_trade = Trade(**t.dict())
            db.add(new_trade)
            count += 1

    db.commit()
    return {"saved": count}


@router.get("")
def get_trades(db: Session = Depends(get_db)):
    return db.query(Trade).order_by(Trade.time.desc()).all()