import { ShopItem } from "../ShoppingCart/ShoppingCartTypes";
import { useNavigate } from "react-router-dom";

interface catalogueListItemProps {
  item: ShopItem;
}

export const CatalogueListItem = ({ item }: catalogueListItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="catalogue-list-item"
      role="link"
      onClick={() => {
        navigate(`/catalogue/item/${item.id}`);
      }}
      aria-labelledby={`item-${item.id}`}
    >
      <div className="catalogue-item-image">
        <img src={item.image} alt="" />
      </div>

      <h3 className="catalogue-item-title" id={`item-${item.id}`}>
        {item.title}
      </h3>
      <div className="catalogue-list-item-price" aria-label="Price:">
        {"$" + item.price}
      </div>
    </div>
  );
};
