import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity >= product.quantity) {
          alert('Quantidade máxima atingida para este produto.');
          return prevItems;
        }

        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1, maxQuantity: product.quantity }];
    });
  };

  const increment = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {

          if (item.quantity >= item.maxQuantity) {
            alert('Quantidade máxima atingida para este produto.');
            return item;
          }

          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decrement = (id) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const quantity = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
        quantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
