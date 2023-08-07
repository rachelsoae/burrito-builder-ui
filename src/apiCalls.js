const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders")
  .then((response) => response.json());
};

const postOrder = (data) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json());

}

export { getOrders, postOrder } 
