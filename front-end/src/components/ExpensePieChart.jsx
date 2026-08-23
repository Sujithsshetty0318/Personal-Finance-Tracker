import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpensePieChart({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return <p>No data to display.</p>;
  }

  // Grouping backend data by category
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
        data: values,
        backgroundColor: [
          "#3b82f6",
          "#ef4444",
          "#10b981",
          "#6366f1",
          "#f59e0b",
          "#14b8a6",
          "#8b5cf6",
          "#ec4899",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Pie data={data} options={options} />;
}

export default ExpensePieChart;
