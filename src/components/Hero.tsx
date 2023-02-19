import HeroImage from "../assets/hero-img.png";

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-img">
        <img src={HeroImage} alt="" />
      </div>

      <div className="hero-text">
        <h2>Build your dream PC</h2>
        <p>
          Building your dream PC with our store components is an exciting
          experience that starts with choosing the right parts. Our store offers
          a wide range of high-quality components, including processors,
          graphics cards, motherboards, RAM and cases.
        </p>
        <button className="main-button" type="button">
          Buy now
        </button>
      </div>
    </div>
  );
};
