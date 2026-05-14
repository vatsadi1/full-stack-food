import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";

function Orders({url}) {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 

  const fetchOrders = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${url}/api/order/allOrder`
      );

      if (response.data.success) {
        setOrders(response.data.data);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {

  try {

    const response = await axios.post(
      `${url}/api/order/status`,
      {
        orderId,
        status
      }
    );

    if(response.data.success){
      fetchOrders();
    }

  } catch (error) {

    console.log(error);
  }
}

  useEffect(() => {
    fetchOrders();
  }, []);

  return (

    <div className="admin-orders">

      <div className="admin-header">

        <h1>All Orders</h1>

        <p>
          Manage and track customer orders
        </p>

      </div>

      {loading ? (

        <div className="spinner-container">
          <div className="spinner"></div>
        </div>

      ) : (

        <div className="orders-grid">

          {orders.map((order) => (

            <div
              className="admin-order-card"
              key={order._id}
            >

              {/* TOP */}

              <div className="admin-order-top">

                <div>

                  <h3>
                    #{order._id.slice(-6).toUpperCase()}
                  </h3>

                  <p>
                    {new Date(order.date).toLocaleString()}
                  </p>

                </div>

                <div className={`status ${order.status}`}>
                  {order.status}
                </div>

              </div>

              {/* CUSTOMER */}

              <div className="customer-info">

                <h4>Customer Details</h4>

                <p>
                  <strong>Name:</strong>{" "}
                  {order.address.firstName}{" "}
                  {order.address.lastName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.address.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.address.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.address.street},{" "}
                  {order.address.city},{" "}
                  {order.address.state}
                </p>

              </div>

              {/* ITEMS */}

              <div className="ordered-items">

                <h4>Ordered Items</h4>

                {order.items.map((item, index) => (

                  <div
                    className="ordered-item"
                    key={index}
                  >

                    <img
                      src={`${url}/images/${item.image}`}
                      alt=""
                    />

                    <div>

                      <h5>{item.name}</h5>

                      <p>
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>

                  </div>
                ))}

              </div>

              {/* STATUS DROPDOWN */}

<div className="status-update">

  <label>Update Status</label>

  <select
    value={order.status}
    onChange={(e) =>
      updateStatus(order._id, e.target.value)
    }
  >

    <option value="Food Processing">
      Food Processing
    </option>

    <option value="Out For Delivery">
      Out For Delivery
    </option>

    <option value="Delivered">
      Delivered
    </option>

  </select>

</div>

              {/* FOOTER */}

              <div className="admin-order-footer">

                <div>

                  <span>Payment</span>

                  <h4>
                    {order.payment
                      ? "Paid Online"
                      : "Pending"}
                  </h4>

                </div>

                <div>

                  <span>Total Amount</span>

                  <h2>₹{order.amount}</h2>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Orders;