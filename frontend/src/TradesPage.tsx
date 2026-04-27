import { useEffect, useState } from "react";
import { api } from "./api";
import type { Trade } from "./types";

export default function TradesPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [period, setPeriod] = useState(30);

  useEffect(() => {
    api.get(`/api/trades`)
      .then((res) => setTrades(res.data))
      .catch((err) => console.error(err));
  }, [period]);

  // 🔢 Calculations
  const totalPnL = trades.reduce((sum, t) => sum + t.profit, 0);
  const wins = trades.filter((t) => t.profit > 0).length;
  const winRate = trades.length ? (wins / trades.length) * 100 : 0;

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      
      {/* HEADER */}
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Trading Dashboard</h1>

      {/* FILTER */}
      <div style={{ marginTop: 16, marginBottom: 20 }}>
        {[7, 30, 90, 365].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            style={{
              marginRight: 10,
              padding: "6px 12px",
              borderRadius: 8,
              border: "1px solid #ccc",
              background: period === p ? "#111" : "#fff",
              color: period === p ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {p}D
          </button>
        ))}
      </div>

      {/* STATS CARDS */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        
        <div style={cardStyle}>
          <p style={label}>Total PnL</p>
          <h2 style={{ color: totalPnL >= 0 ? "green" : "red" }}>
            ${totalPnL.toFixed(2)}
          </h2>
        </div>

        <div style={cardStyle}>
          <p style={label}>Total Trades</p>
          <h2>{trades.length}</h2>
        </div>

        <div style={cardStyle}>
          <p style={label}>Win Rate</p>
          <h2>{winRate.toFixed(1)}%</h2>
        </div>

      </div>

      {/* TABLE */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>PnL</th>
            <th>Volume</th>
            <th>Price</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {trades.map((t) => (
            <tr key={t.id} style={rowStyle}>
              <td>{t.symbol}</td>
              <td style={{ color: t.profit >= 0 ? "green" : "red" }}>
                ${t.profit.toFixed(2)}
              </td>
              <td>{t.volume}</td>
              <td>{t.price}</td>
              <td>{new Date(t.time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

// 🎨 styles
const cardStyle = {
  flex: 1,
  padding: 16,
  borderRadius: 12,
  background: "#f5f5f5",
};

const label = {
  fontSize: 12,
  color: "#666",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const rowStyle = {
  borderBottom: "1px solid #eee",
};