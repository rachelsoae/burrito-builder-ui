import { useState } from "react";
import { postOrder } from '../../apiCalls'
import './OrderForm.css'

const OrderForm = ({setOrders}) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [cost, setCost] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    ingredients.includes(e.target.name) ? alert(`You already added ${e.target.name} to your burrito!`) : setIngredients(prevState => [...prevState, e.target.name])
    calculateCost()  
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

  const calculateCost = () => {
    console.log(ingredients)
    const cost = ingredients.reduce((currentIngredient, totalCost) => {
      console.log(currentIngredient)
          totalCost += possibleIngredients[currentIngredient].cost
        return totalCost;
    }, 0)
    setCost(cost)
    console.log(cost)
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
    {
      name: 'beans',
      cost: 1.00
    },
    {
      name: 'steak',
      cost: 3.50
    },
    {
      name: 'carnitas',
      cost: 3.50
    },
    {
      name: 'sofritas',
      cost: 3.00
    },
    {
      name: 'lettuce',
      cost: 0.50
    },
    {
      name: 'queso fresco',
      cost: 1.50
    },
    {
      name: 'pico de gallo',
      cost: 1.50
    },
    {
      name: 'hot sauce',
      cost: 1.00
    },
    {
      name: 'guacamole',
      cost: 2.50
    },
    {
      name: 'jalapenos',
      cost: 1.00
    },
    {
      name: 'cilantro',
      cost: 0.50
    },
    {
      name: 'sour cream',
      cost: 1.00
    }
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient.name}
        name={ingredient.name}
        onClick={(e) => handleClick(e)}
      >
        {ingredient.name} - ${ingredient.cost.toFixed(2)}
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

      <button onClick={(e) => handleSubmit(e)} className='submit'>Submit Order ${cost || '0.00'}</button>
    </form>
  );
}

export default OrderForm;
