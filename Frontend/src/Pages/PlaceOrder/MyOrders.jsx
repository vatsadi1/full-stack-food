import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./MyOrders.css";
import { StoreContext } from "../../Context/StoreContext";

function MyOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token, url } = useContext(StoreContext);

  const fetchOrders = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${url}/api/order/myorders`,
        {
          headers: { token }
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    if (token) {
      fetchOrders();
    }

  }, [token]);

  return (
    <div className="my-orders">

      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track your recent food orders</p>
      </div>

      {loading ? (

        <div className="spinner-container">
          <div className="spinner"></div>
        </div>

      ) : orders.length === 0 ? (

        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>Your delicious orders will appear here.</p>
        </div>

      ) : (

        <div className="orders-container">

          {orders.map((order, index) => (

            <div className="order-card" key={index}>

              {/* TOP */}

              <div className="order-top">

                <div>

                  <h3>
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>

                  <p className="order-date">
                    {new Date(order.date).toLocaleString()}
                  </p>

                </div>

                <div className={`status ${order.status}`}>
                  {order.status}
                </div>

              </div>

              {/* ITEMS */}

              <div className="order-items">

                {order.items.map((item, idx) => (

                  <div className="order-item" key={idx}>

                    <div className="item-left">

                      <img
                        src={`${url}/images/${item.image}`}
                        alt=""
                      />

                      <div>

                        <h4>{item.name}</h4>

                        <p>
                          Quantity: {item.quantity}
                        </p>

                      </div>

                    </div>

                    <div className="item-price">
                      ₹{item.price * item.quantity}
                    </div>

                  </div>
                ))}

              </div>

              {/* DELIVERY INFO */}

              <div className="delivery-info">

                <div>
                  <span>Delivery To</span>
                  <p>
                    {order.address.street},{" "}
                    {order.address.city}
                  </p>
                </div>

                <div>
                  <span>Phone</span>
                  <p>{order.address.phone}</p>
                </div>

              </div>

              {/* FOOTER */}

              <div className="order-footer">

                <div className="payment-info">

                  <span>Payment</span>

                  <h4>
                    {order.payment ? "Paid Online" : "Pending"}
                  </h4>

                </div>

                <div className="total-info">

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

export default MyOrders;