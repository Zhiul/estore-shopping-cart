import type { shoppingCartItems } from "./components/ShoppingCart/useShoppingCartItems";

import { createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./routes/Home";
import { CataloguePage } from "./routes/Catalogue";
import { CatalogueListItemModal } from "./components/Catalogue/CatalogueListItemModal";

import ShopItems from "./data/ShopItems.json";
import { useShoppingCartItems } from "./components/ShoppingCart/useShoppingCartItems";

export const ShoppingCartItemsContext = createContext({} as shoppingCartItems);

function App() {
  const shoppingCartItems = useShoppingCartItems();

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/catalogue/",
        element: <CataloguePage />,
        children: [
          {
            loader: ({ params }) => {
              const item = ShopItems.items.find(
                (item) => item.id === params.itemid
              );
              if (item) {
                return { item, isActive: true };
              }
              return { isActive: false };
            },
            path: "item/:itemid",
            element: <CatalogueListItemModal />,
          },
        ],
      },
    ],
    { basename: "/" }
  );

  return (
    <>
      <ShoppingCartItemsContext.Provider value={shoppingCartItems}>
        <RouterProvider router={router} />
      </ShoppingCartItemsContext.Provider>
    </>
  );
}

export default App;
