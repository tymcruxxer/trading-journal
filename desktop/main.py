import requests
from mt5_service import connect_mt5, get_trades, shutdown_mt5

BACKEND_URL = "http://127.0.0.1:8000/api/trades/upload"


def send_to_backend(trades):
    response = requests.post(BACKEND_URL, json=trades)

    if response.status_code == 200:
        print("✅ Sent to backend:", response.json())
    else:
        print("❌ Failed:", response.text)


def run():
    if not connect_mt5():
        return

    trades = get_trades()

    # convert trades to backend format
    formatted = []
    for t in trades:
        formatted.append({
            "symbol": t["symbol"],
            "profit": t["profit"],
            "volume": t["volume"],
            "price": t["price"],
            "trade_type": str(t["type"]),
            "time": t["time"].isoformat()
        })

    send_to_backend(formatted)

    shutdown_mt5()


if __name__ == "__main__":
    run()