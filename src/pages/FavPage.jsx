import React, { Suspense, useState, useContext, useEffect } from "react";
import FavPrograms from "../components/FavPrograms";
import { Spinner } from "react-bootstrap";
import { FavoriteContext } from "../contexts/FavoriteContext";
import styles from "../css/ProgramList.module.css";
import FavoriteChannels from "../components/FavoriteChannels";

const FavPage = () => {
  
  const { setShowSchedule } = useContext(FavoriteContext);
  const [showChannels, setShowChannels] = useState(null);
  
  useEffect(() => {
    setShowChannels(true);
  }, []);

  const handleOnclickChannels = () => {
    setShowChannels(true);
    setShowSchedule(false);
  };


  const handleOnclickPrograms = () => {
    setShowChannels(false);
  };


  const renderTopMenu = () => {
    return (
      <ul className={styles.favoriteMenuList}>
        <li
          className={`${styles.favoriteListItem} ${
            showChannels ? styles.active : styles.inactive
          }`}
          onClick={() => handleOnclickChannels()}
        >
          My channels
        </li>
        <li
          className={`${styles.favoriteListItem} ${
            showChannels ? styles.inactive : styles.active
          }`}
          onClick={() => handleOnclickPrograms()}
        >
          My programs
        </li>
      </ul>
    );
  };

  return (
    <div>
      <Suspense
        className="text-center"
        fallback={<Spinner animation="border" variant="secondary" />}
      >
        {renderTopMenu()}
        {showChannels ? <FavoriteChannels /> : <FavPrograms />}
      </Suspense>
    </div>
  );
};
export default FavPage;
