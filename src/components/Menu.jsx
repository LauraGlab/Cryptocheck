import { useState } from "react";
import SVG from "react-inlinesvg";
import { useCoinContext } from "../logic/CoinContext.jsx";
import CompareCoinsMenu from "./CompareCoinsMenu.jsx";
import FavoriteCoinsMenu from "./FavoriteCoinsMenu.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import Compare from "./../assets/icons/icon-compare.svg";
import Star from "./../assets/icons/star.svg";
import "./../css/components/Menu.css";

export default function Menu() {
  const { coins, setCoins, favoriteCoins, setFavoriteCoins } = useCoinContext();
  const [menuState, setMenuState] = useState({
    compare: false,
    favorite: false,
  });

  const openMenu = (menu) => {
    setMenuState((prev) => ({ ...prev, [menu]: true }));
  };

  const closeMenu = (menu) => {
    setMenuState((prev) => ({ ...prev, [menu]: false }));
  };

  return (
    <div className="menusBtnSection">
      <button className="favoriteMenuBtn" onClick={() => openMenu("favorite")}>
        <SVG className="menuIcon" src={Star} />
        <p className="favoriteMenuBtnTitle">Portfolio</p>
      </button>
      <button className="compareMenuBtn" onClick={() => openMenu("compare")}>
        <SVG className="menuIcon" src={Compare} />
        <p className="favoriteMenuBtnTitle">Compare</p>
      </button>
      <ThemeToggle />
      {menuState.favorite && (
        <FavoriteCoinsMenu
          close={() => closeMenu("favorite")}
          favoriteCoins={favoriteCoins}
          setFavoriteCoins={setFavoriteCoins}
        />
      )}
      {menuState.compare && (
        <CompareCoinsMenu coins={coins} close={() => closeMenu("compare")} />
      )}
    </div>
  );
}
