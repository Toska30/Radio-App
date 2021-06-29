import React, { useContext, useEffect, useState, Suspense } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { ChannelContext } from "../contexts/ChannelContext";
import { HeartFill, Heart,  } from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/ProgramList.module.css";
import ChannelSchedule from "../components/ChannelSchedule";
import ProgByChannelId from "../components/ProgByChannelId";

const ProgramList = (props) => {
  const {favoriteChannelIds,deleteFavoriteChannel,addChannelToFavorites} = useContext(FavoriteContext);
  const { user } = useContext(UserContext);
  const [isChannelFavorite, setIsChannelFavorite] = useState(false);
  const { channelId } = props.match.params;
  const { singleChannel, getChannelById } = useContext(ChannelContext);
  const [showPrograms, setShowPrograms] = useState(true);


  useEffect(() => {
    getChannelById(channelId);
    // eslint-disable-next-line 
  
  }, [user]);
  useEffect(() => {
    getFavHeart();

    console.log("hello");
    // eslint-disable-next-line 
  
  }, [channelId, favoriteChannelIds]);

  const getFavHeart = () => {
    if (favoriteChannelIds ) {
      let result = favoriteChannelIds.find(
        (fci) => fci.channelId === channelId
      );
      if (result) {
        setIsChannelFavorite(true);
      } else {
        setIsChannelFavorite(false);
      }
    }
  };


//when the user clicks  fires the function

  const handleOnclickSchedule = () => {
    setShowPrograms(false);
  };


  const handleOnclickProgram = () => {
    setShowPrograms(true);
  };



  const handleOnClickEmptyHeart = async (e, channelId) => {
    e.stopPropagation();
    setIsChannelFavorite(!isChannelFavorite);
    let favoriteChannel = {
      channelId,
    };

    let result = await addChannelToFavorites(favoriteChannel);
    if (result.success) {
      console.log(result.success);
    } else {
      console.log(result.error);
    }
  };


  const handleOnClickFullHeart = (e, channelId) => {
    setIsChannelFavorite(!isChannelFavorite);
    deleteFavoriteChannel(e, channelId);
  };

  const renderTopMenu = () => {
    return (
      <ul className={styles.menuList}>
        <li className={styles.listItem}>
          <img
            className={styles.channelImage}
            src={singleChannel.image}
            alt="channel"
          />
        </li>
        <li
          className={`${styles.listItem} ${
            showPrograms ? styles.inactive : styles.active
          }`}
          onClick={() => handleOnclickSchedule()}
        >
          Schedule
        </li>
        <li
          className={`${styles.listItem} ${
            showPrograms ? styles.active : styles.inactive
          }`}
          onClick={() => handleOnclickProgram()}
        >
          {singleChannel.name} Program
        </li>
        {user && (
          <li>
            {isChannelFavorite ? (
              <HeartFill
                color="IndianRed"
                size={25}
                onClick={(e) => {
                  handleOnClickFullHeart(e, singleChannel.id);
                }}
              />
            ) : (
              <Heart
                color="gray"
                className={styles.heartIcon}
                size={25}
                onClick={(e) => {
                  handleOnClickEmptyHeart(e, singleChannel.id);
                }}
              />
            )}
          </li>
        )}
      </ul>
    );
  };

  return (
    <div>
      {singleChannel && (
        <div className={styles.programPage}>
          {renderTopMenu()}
          <Suspense
            className="text-center"
            fallback={<Spinner animation="border" variant="secondary" />}
          >
            {showPrograms ? (
              <ProgByChannelId channelId={singleChannel.id} />
            ) : (
              <ChannelSchedule channelId={singleChannel.id} />
            )}
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default ProgramList;
