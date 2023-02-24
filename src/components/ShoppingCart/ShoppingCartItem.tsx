import { shoppingCartItem } from "./useShoppingCartItems";

interface ShoppingCartProps {
  item: shoppingCartItem;
}

export function ShoppingCartItem({ item }: ShoppingCartProps) {
  const totalPrice = parseInt(item.price) * item.quantity;

  function handleQuantityInput(e: React.ChangeEvent<HTMLInputElement>) {
    const quantity = e.target.value;
  }

  return (
    <div className="shopping-cart-item">
      <div className="shopping-cart-item-img"></div>

      <div className="shopping-cart-item-container">
        <h4>{item.title}</h4>

        <input
          value={item.quantity}
          type="number"
          className="shopping-cart-quantity"
          onChange={(e) => {
            handleQuantityInput(e);
          }}
        />

        <div className="shopping-cart-item-total-price">{}</div>
      </div>
    </div>
  );
}
