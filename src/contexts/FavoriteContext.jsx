import { UserContext } from "./UserContext"
import { useContext ,useState,createContext,useEffect } from "react";

export const FavoriteContext = createContext();

const FavoriteContextProvider = (props) => {
  const [favoriteProgramIds, setFavoriteProgramIds] = useState(null);
  const [favoriteChannelIds, setFavoriteChannelIds] = useState(null);
  const { user } = useContext(UserContext);
  const [showSchedule, setShowSchedule] = useState(null);

  useEffect(() => {
    if (user) {
      getAllFavoriteChannelIds();
      getAllFavoriteProgramIds();
    }
  }, [user]);

  //favorites program id 
  const getAllFavoriteProgramIds = async () => {
    let favoritePrograms = await fetch(`/api/v1/favorites/programs`);
    favoritePrograms = await favoritePrograms.json();
    setFavoriteProgramIds(favoritePrograms);
  };

 //add prg to fav
 const addProgramToFavorites = async (programId, channelId) => {
  let result = await fetch(`/api/v1/programs/${channelId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(programId),
  });
  result = await result.json();
  getAllFavoriteProgramIds();
  return result;
};

  //favorites channel id
  const getAllFavoriteChannelIds = async () => {
    let favoriteChannelIds = await fetch(`/api/v1/favorites/channels`);
    favoriteChannelIds = await favoriteChannelIds.json();
    setFavoriteChannelIds(favoriteChannelIds);
  };

//add channel to fav
  const addChannelToFavorites = async (channelId) => {
    let result = await fetch(`/api/v1/channels`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(channelId),
    });
    result = await result.json();
    await getAllFavoriteChannelIds();
    return result;
  };

 // delete fav prg
 const deleteFavoriteProgram = async (e, programId) => {
  e.stopPropagation();
  let result = await fetch(`/api/v1/favorites/programs/${programId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  result = await result.json();
  setFavoriteProgramIds(
    favoriteProgramIds.filter((p) => programId !== p.programId)
  );
  if (result.success) {
    console.log(result.success);
  } else {
    console.log(result.error);
  }
};


//delete fav channel
  const deleteFavoriteChannel = async (e, channelId) => {
    e.stopPropagation();
    let result = await fetch(`/api/v1/favorites/channels/${channelId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    setFavoriteChannelIds(
      favoriteChannelIds.filter((ch) => channelId !== ch.channelId)
    );
    if (result.success) {
      console.log(result.success);
    } else {
      console.log(result.error);
    }
  };


  const values = {
    setShowSchedule,
    deleteFavoriteProgram,
    showSchedule,
    deleteFavoriteChannel,
    favoriteChannelIds,
    favoriteProgramIds,
    addProgramToFavorites,
    addChannelToFavorites,
 
  };

  return (
    <FavoriteContext.Provider value={values}>
      {props.children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
