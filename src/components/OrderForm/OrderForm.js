import { useState } from "react";

const OrderForm = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    // when button is clicked, push name of ingredient into array
    setIngredients(prevState => [...prevState, e.target.name])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkForm()) {
      clearInputs();
    }
  }

  const checkForm = () => {
    let result = name && ingredients.length ? true : alert('false')
    return result;
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

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
