import { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // load cart items from local storage on component mount
  useEffect(() => {
    const storedCartItmes = JSON.parse(localStorage.getItem("cartItems"));
    setCartItems(storedCartItmes);
  }, []);

  // save cart items to local storage when cart items change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // add to cart
  const addToCart = (product, quantity) => {
    const existingProduct = cartItems.find((item) => item._id === product._id);

    if (existingProduct) {
      const updatedCartItems = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  // remove from cart
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
    // update local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  //update quantity
  const updateQuantity = (product, quantity) => {
    const udpatedItems = cartItems.map((item) =>
      item._id === product._id ? { ...item, quantity } : item
    );
    setCartItems(udpatedItems);
    localStorage.setItem("cartItems", JSON.stringify(udpatedItems));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
