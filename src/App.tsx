import type { shoppingCartItems } from "./components/ShoppingCart/useShoppingCartItems";

import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CreateModal } from "./utils/createModal";
import { Nav } from "./components/Nav/Nav";
import { Home } from "./pages/Home";
import { CataloguePage } from "./pages/Catalogue";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart";

import { useShoppingCartItems } from "./components/ShoppingCart/useShoppingCartItems";

export const ShoppingCartItemsContext = createContext({} as shoppingCartItems);

function App() {
  const shoppingCartItems = useShoppingCartItems();
  const [shoppingCartIsOpen, setShoppingCartIsOpen] = useState(false);

  const ShoppingCartModal = CreateModal(
    ShoppingCart,
    {},
    false,
    shoppingCartIsOpen,
    setShoppingCartIsOpen,
    "overlay"
  );

  function toggleShoppingCartIsOpen() {
    const newShoppingCartIsOpen = !shoppingCartIsOpen;
    setShoppingCartIsOpen(newShoppingCartIsOpen);
  }

  return (
    <>
      <BrowserRouter>
        <ShoppingCartItemsContext.Provider value={shoppingCartItems}>
          <Nav toggleShoppingCartIsOpen={toggleShoppingCartIsOpen} />
          {ShoppingCartModal}
        </ShoppingCartItemsContext.Provider>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/catalogue" element={<CataloguePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
