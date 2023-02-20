import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Nav } from "./components/Nav";
import { Home } from "./pages/Home";
import { Catalogue } from "./pages/Catalogue";

import { useShoppingCartItems } from "./components/ShoppingCart/useShoppingCartItems";

const ShoppingCartItemsContext = createContext({ items: [] });

function App() {
  const shoppingCartItems = useShoppingCartItems();

  return (
    <>
      <BrowserRouter>
        <Nav shoppingCartItems={shoppingCartItems.items} />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/catalogue" element={<Catalogue />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
