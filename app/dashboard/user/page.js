"use client";
import { useEffect, useState } from "react";
import UserChart from "@/components/user/UserChart";
import Loading from "@/app/loading";

export default function UserDashboard() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/chart`);
      const data = await response.json();

      setChartData(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead text-center">User Dashboard</p>
          <UserChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
