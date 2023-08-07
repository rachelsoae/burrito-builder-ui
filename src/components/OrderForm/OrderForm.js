import { useState } from "react";
import { postOrder } from '../../apiCalls'
import './OrderForm.css'

const OrderForm = ({setOrders}) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    setIngredients(prevState => [...prevState, e.target.name])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkForm()) {
      const newOrder = {name, ingredients}
      postOrder(newOrder)
      .then(response => setOrders(prevState => [...prevState, response]))
      clearInputs();
    }
  }

  const checkForm = () => {
    if (!name && ingredients.length < 1) {
      alert('Please fill out the order form.')
    } else if (!name) {
      alert('Please enter a name for this order.')
    } else if (ingredients.length < 1) {
      alert('Please select at least one ingredient.')
    } else {
      return true
    }
  }

  const clearInputs = () => {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => handleClick(e)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className='buttons'>
        {ingredientButtons}
      </div>

      <p className='order-summary'>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)} className='submit'>Submit Order</button>
    </form>
  );
}

export default OrderForm;
