import React, { useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler } from 'chart.js';
import './AdminDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  Filler // Register the Filler plugin
);

const AdminDashboard = () => {
  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [1000, 2000, 1500, 2500, 3500],
        borderColor: '#2d72d9',
        backgroundColor: 'rgba(45, 114, 217, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const orderData = {
    labels: ['Completed', 'Pending', 'Cancelled'],
    datasets: [
      {
        label: 'Order Distribution',
        data: [200, 120, 30],
        backgroundColor: ['#28a745', '#ffbc00', '#dc3545'],
      },
    ],
  };

  const productData = {
    labels: ['Perfume A', 'Perfume B', 'Perfume C', 'Perfume D'],
    datasets: [
      {
        label: 'Products Sold',
        data: [50, 80, 60, 30],
        backgroundColor: '#17a2b8',
        borderColor: '#17a2b8',
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    // No cleanup logic needed anymore
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="stat-card">
        <h3>Total Sales</h3>
        <p>$12,340</p>
        <Line data={salesData} options={{ responsive: true }} />
      </div>
      <div className="stat-card">
        <h3>Total Products</h3>
        <p>120</p>
        <Bar data={productData} options={{ responsive: true }} />
      </div>
      <div className="stat-card">
        <h3>Total Orders</h3>
        <p>350</p>
        <Pie data={orderData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default AdminDashboard;
