import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ExpenseBarChart({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return <p>No data to display.</p>;
  }

  // Calculate total spent per category using backend data
  const categoryTotals = expenses.reduce((acc, expense) => {
    const cat = expense.category || "Other";
    const amount = parseFloat(expense.amount) || 0;
    acc[cat] = (acc[cat] || 0) + amount;
    return acc;
  }, {});

  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  const data = {
    labels,
    datasets: [
      {
        label: "Amount Spent (₹)",
        data: values,
        backgroundColor: "#6366f1", // Indigo
        borderRadius: 6,
        barThickness: 35,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#374151", font: { size: 12, weight: "500" } },
      },
      y: {
        grid: { color: "#e5e7eb" },
        ticks: { color: "#374151", font: { size: 12 } },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default ExpenseBarChart;
