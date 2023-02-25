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
      <ShoppingCartItemsContext.Provider value={shoppingCartItems}>
        <BrowserRouter>
          <Nav toggleShoppingCartIsOpen={toggleShoppingCartIsOpen} />
          {ShoppingCartModal}

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/catalogue/item?/:itemid?"
              element={<CataloguePage />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </ShoppingCartItemsContext.Provider>
    </>
  );
}

export default App;
