import React, { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios'

const Orders = ({url, resID}) => {

  const [orderList, setOrderList] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${url}/api/order/list`, {
        params: { resID }
      })
      
      if(response.data.success){
        setOrderList(response.data.data)
        console.log('Orders fetched:', response.data.data)
      } else {
        console.error('Failed to fetch orders:', response.data.message)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch orders when component mounts or resID changes
  useEffect(() => {
      fetchOrder()
  }, [])

 return (
    <div className="orders add flex-col">
      <h2>All Orders {loading && 'Loading...'}</h2>
      {orderList.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Table</b>
            <b>Items</b>
            <b>Income</b>
            <b>Time</b>
          </div>

          {orderList.map((order, index) => (
            <div key={order._id || index} className="list-table-format">
              <div>{order.tableID}</div>
              <div>
                {order.items.map((item, i) => (
                  <div key={i}>
                    {item.name} x{item.quantity}
                  </div>
                ))}
              </div>
              <div>${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</div>
              <div>{new Date(parseInt(order._id.toString().substring(0, 8), 16) * 1000).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
      <button onClick={fetchOrder} disabled={loading} className="refresh-button">
        {loading ? 'Loading...' : 'Refresh Orders'}
      </button>
    </div>
  )
}

export default Orders