import { shoppingCartItem } from "./ShoppingCartTypes";

interface ShoppingCartProps {
  shoppingCartItem: shoppingCartItem;
  changeItemQuantity: (id: string, quantity: string) => void;
}

export function ShoppingCartItem({
  shoppingCartItem,
  changeItemQuantity,
}: ShoppingCartProps) {
  const totalPrice =
    parseInt(shoppingCartItem.price) * shoppingCartItem.quantity;

  function handleQuantityInput(e: React.ChangeEvent<HTMLInputElement>) {
    const quantity = e.target.value;
    changeItemQuantity(shoppingCartItem.id, quantity);
  }

  return (
    <div className="shopping-cart-item">
      <div className="shopping-cart-item-img"></div>

      <div className="shopping-cart-item-container">
        <h4>{shoppingCartItem.title}</h4>

        <input
          value={shoppingCartItem.quantity}
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
