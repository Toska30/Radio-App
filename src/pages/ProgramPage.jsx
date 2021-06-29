import React, { useContext, useEffect, useState, Suspense } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProgramContext } from "../contexts/ProgramContext";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { Spinner } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import styles from "../css/ProgramList.module.css";
import ProgramDetails from "../components/ProgramDetails"

const ProgramPage = (props) => {
  const { program, getProgramByProgramId } = useContext(ProgramContext);
  const { programId } = props.match.params;
  const {favoriteProgramIds,addProgramToFavorites,deleteFavoriteProgram,} = useContext(FavoriteContext);
  const { user } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(null);

  useEffect(() => {
    getProgramByProgramId(programId);
    // eslint-disable-next-line
  }, [user]);
  useEffect(() => {
    getFavHeart();
    // eslint-disable-next-line
  }, [programId, favoriteProgramIds]);

  const getFavHeart = () => {
    if (favoriteProgramIds ) {
      let result = favoriteProgramIds.find((fpi) => fpi.programId === programId);
      if (result) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  };
  const handleOnClickEmptyHeart = async (e, programId) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    let favoriteProgram = {
      programId,
    };
    let result = await addProgramToFavorites(favoriteProgram);
    if (result.success) {
      console.log(result.success);
    } else {
      console.log(result.error);
    }
  };
  const handleOnClickFullHeart = (e, programId) => {
    setIsFavorite(!isFavorite);
    deleteFavoriteProgram(e, programId);
  };

  const renderTopMenu = () => {
    return (
      <ul className={styles.menuList}>
        <li className={styles.listItem}>
          <img
            className={styles.channelImage}
            src={program.programimagewide}
            alt="program"
          />
        </li>
        <li className={styles.programName}>{program.name}</li>
        {user && (
          <li>
            {isFavorite ? (
              <HeartFill
                color="IndianRed"
                size={25}
                onClick={(e) => {
                  handleOnClickFullHeart(e, program.id);
                }}
              />
            ) : (
              <Heart
                color="gray"
                className={styles.heartIcon}
                size={25}
                onClick={(e) => {
                  handleOnClickEmptyHeart(e, program.id);
                }}
              />
            )}
          </li>
        )}
      </ul>
    );
  };

  return (
    <Suspense
      className="text-center"
      fallback={<Spinner animation="border" variant="secondary" />}
    >
      {program && renderTopMenu()}
      {program && <ProgramDetails />}
    </Suspense>
  );
};

export default ProgramPage;
