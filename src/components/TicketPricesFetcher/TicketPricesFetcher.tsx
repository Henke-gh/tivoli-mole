import React, { useState, useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import stampMap from "@/lib/stampMap";

interface TicketPricesData {
  basicPrice: number;
  stampId: number;
  stampName: string;
}

export const TicketPricesFetcher: React.FC = () => {
  const [data, setData] = useState<TicketPricesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTicketPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("game-settings")
        .select("cost, stamp_id")
        .single();

      if (error) throw error;

      setData({
        basicPrice: data.cost,
        stampId: data.stamp_id,
        stampName: stampMap[data.stamp_id] || "Unknown",
      });
    } catch (error: any) {
      setError(error.message || "Error fetching ticket prices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketPrices();
  }, []);

  if (loading) {
    return (
      <div className="ticket-prices-display loading">
        <p>Loading ticket prices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ticket-prices-display error">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={fetchTicketPrices} type="button">
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="ticket-prices-display">
      <h3>Deal of the month</h3>
      <div className="price-list">
        <div className="price-item basic">
          <span className="ticket-type">Total cost:</span>
          <span className="price">${data.basicPrice}</span>
        </div>
        <div className="price-item premium">
          <span className="ticket-type">Included in price:</span>
          <span className="price">{data.stampName}</span>
        </div>
      </div>
    </div>
  );
};
