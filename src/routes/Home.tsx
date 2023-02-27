import { Hero } from "../components/Hero";
import { Header } from "../components/Header/Header";
import { useShoppingCartModal } from "../components/ShoppingCart/useShoppingCartModal";

export const Home = () => {
  const [ShoppingCartModal, toggleShoppingCartModal] = useShoppingCartModal();

  return (
    <>
      <Header toggleShoppingCartModal={toggleShoppingCartModal} />
      {ShoppingCartModal}
      <Hero></Hero>
    </>
  );
};
