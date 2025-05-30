import React from "react";
import "./OrderPage.css";

const OrderPage = () => {
  const orders = [
    {
      id: "ORD001",
      customerName: "John Doe",
      date: "2025-04-20",
      totalPrice: "$150",
      status: "Shipped",
      address: "123 Main St, Springfield, IL, 62701",
      items: [
        { name: "Lavender Perfume", quantity: 1, price: "$50" },
        { name: "Rose Perfume", quantity: 2, price: "$50" },
      ],
    },
    {
      id: "ORD002",
      customerName: "Jane Smith",
      date: "2025-04-21",
      totalPrice: "$120",
      status: "Processing",
      address: "456 Oak St, Springfield, IL, 62701",
      items: [
        { name: "Vanilla Perfume", quantity: 1, price: "$60" },
        { name: "Jasmine Perfume", quantity: 1, price: "$60" },
      ],
    },
    {
      id: "ORD003",
      customerName: "John Doe",
      date: "2025-04-22",
      totalPrice: "$60",
      status: "Shipped",
      address: "123 Main St, Springfield, IL, 62701",
      items: [
        { name: "Vanilla Perfume", quantity: 1, price: "$60" },
      ],
    },
  ];

  const perfumeUserMap = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const perfumeName = item.name;
      if (!perfumeUserMap[perfumeName]) {
        perfumeUserMap[perfumeName] = new Set();
      }
      perfumeUserMap[perfumeName].add(order.customerName);
    });
  });

  const perfumeUserStats = Object.entries(perfumeUserMap).map(
    ([perfume, users]) => ({
      perfume,
      userCount: users.size,
    })
  );

  return (
    <div className="order-page">
      <h1>Orders</h1>

      <div className="perfume-summary">
        <h2>Perfume Orders by Users</h2>
        <ul>
          {perfumeUserStats.map((item) => (
            <li key={item.perfume}>
              {item.perfume}: {item.userCount} user{item.userCount > 1 ? "s" : ""}
            </li>
          ))}
        </ul>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h2>Order ID: {order.id}</h2>
              <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <div className="order-details">
              <p><strong>Customer:</strong> {order.customerName}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Total:</strong> {order.totalPrice}</p>
              <p><strong>Address:</strong> {order.address}</p> {/* New address field */}
            </div>
            <div className="order-items">
              <h3>Items:</h3>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    <p>{item.name} (x{item.quantity}) - {item.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
