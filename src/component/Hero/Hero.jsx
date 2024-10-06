import SearchBar from "../../components/ui/searchbar/SearchBar";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero">
      <div className="text-box">
        <h2>Find car for sale and for rent near you</h2>
        <h2> Find Your Dream Car</h2>
      </div>
      <SearchBar />
      <img className="heroimage" src="https://www.pngplay.com/wp-content/uploads/8/White-Volkswagen-Car-No-Background.png" />
    </div>
  );
}

export default Hero;
