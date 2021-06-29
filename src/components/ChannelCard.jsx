import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { useHistory } from "react-router-dom";
import { HeartFill,Heart } from "react-bootstrap-icons";
import { Col,Card, Row } from "react-bootstrap";
import styles from "../css/Channels.module.css";

const ChannelCard = (props) => {
  const {favoriteChannelIds,deleteFavoriteChannel,addChannelToFavorites} = useContext(FavoriteContext);
  const { user } = useContext(UserContext);
  const [isChannelFavorite, setIsChannelFavorite] = useState(false);

  
  
  const history = useHistory();

  //fires the function
  useEffect(() => {
    if (user) {
      getFavHeart();
      console.log("hello")
    }

  }, [ favoriteChannelIds]);

  const getFavHeart = () => {
    if (favoriteChannelIds && props.channel) {
      let result = favoriteChannelIds.find(
        (fci) => fci.channelId == props.channel.id
      );
      if (result) {
        setIsChannelFavorite(true);
      } else {
        setIsChannelFavorite(false);
      }
    }
  };

  const handleClick = (channelId) => {
    history.push(`/programs/${channelId}`);
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

  return (
    <div>
      {" "}
      {props.channel && (
        <Card
          key={props.channel.id}
          className={styles.card}
          onClick={() => handleClick(props.channel.id)}
          
        >
          
          <Row className={styles.testi}>
            <Col xs={3}>
              <Card.Img src={props.channel.image} alt={"image"} />
            </Col>
            <Col xs={9}>
              <Card.Body>
                <Card.Title className={styles.Head}>{props.channel.name} </Card.Title>
                <Card.Text className={styles.Text}>{props.channel.tagline}</Card.Text>
              </Card.Body>
            </Col>
            {user && (
              <Col xs={1}>
                {isChannelFavorite ? (
                  <HeartFill
                    color="LightCoral "
                    size={20}
                    onClick={(e) => {
                      handleOnClickFullHeart(e, props.channel.id);
                    }}
                  />
                ) : (
                  <Heart
                    color="gray"
                    className={styles.heartIcon}
                    size={20}
                    onClick={(e) => {
                      handleOnClickEmptyHeart(e, props.channel.id);
                    }}
                  />
                )}
              </Col>
            )}
          </Row>
          
        </Card>
       
     
      )}
    </div>
  );
};

export default ChannelCard;
