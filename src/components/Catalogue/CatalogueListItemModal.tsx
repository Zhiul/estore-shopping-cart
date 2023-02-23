import { ShopItem } from "../ShoppingCart/ShoppingCartTypes";

interface catalogueListItemProps {
  item: ShopItem;
}

export const CatalogueListItemModal = ({ item }: catalogueListItemProps) => {
  return (
    <div className="catalogue-list-item-modal">
      <div className="catalogue-item-modal-image">
        <img src={item.image} alt="" />
      </div>

      <h3>{item.title}</h3>
      <div className="catalogue-list-item-price">${item.price}</div>

      <button className="main-button">Add to cart</button>
    </div>
  );
};
