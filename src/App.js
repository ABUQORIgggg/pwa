import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  let TOKEN = '6766416075:AAH2aT09v6vwsVE_DuhHzc7c9XYtrCvHR20'
  let CHAT_ID = '6962381750'

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', 'night');
  }, []);

  const getProduct = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const addToBasket = (product) => {
    sendMessage(`Product added to basket:
      ${product.title}
      Price: $${product.price}
      Image: ${product.thumbnail}
    `);
  };

  const sendMessage = async (message) => {
    try {
      const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        })
      });
      const data = await response.json();
      console.log("Message sent successfully: ", data);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div>
        <input type='text'/>
      </div>
      <div>
        {loading ? (
          <div className='h-screen flex justify-center items-center'>
            <span className='loading loading-infinity loading-lg text-primary'></span>
          </div>
        ) : (
          <div className='flex flex-wrap gap-x-[3%] gap-y-10 p-10'>
            {product.products.map((item, id) => (
              <div key={id} className='bg-base-300 flex-1 min-w-[22%] w-full rounded-lg shadow-lg shadow-primary'>
                <img src={item.thumbnail} className='w-full' alt='' />
                <div className='p-3'>
                  <p className='text-primary'>{item.title}</p>
                  <p className='text-secondary'>{item.price}</p>
                  <button className='btn btn-accent w-full' onClick={() => addToBasket(item)}>Buy</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;