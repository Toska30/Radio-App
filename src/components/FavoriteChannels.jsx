import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import { Trash } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { Col, Row ,Card, Container } from "react-bootstrap";
import ChannelSchedule from "./ChannelSchedule";
import styles from "../css/Channels.module.css";

const FavoriteChannels = () => {
  const { channels } = useContext(ChannelContext);
  const {setShowSchedule,deleteFavoriteChannel,favoriteChannelIds,showSchedule,} = useContext(FavoriteContext);
  const [channelIdToSchedule, setChannelIdToSchedule] = useState(null);
  const [favoriteChannels, setFavoriteChannels] = useState(null);


  const history = useHistory();
  useEffect(() => {
    if (channels) {
      getChannelsByFavoriteChannelIds();
    }
   
  }, [favoriteChannelIds]);


  const getChannelsByFavoriteChannelIds = () => {
    let result = channels.filter((c) =>
      favoriteChannelIds.find((ci) => c.id === ci.channelId)
    );
  //Sort them out by using array sort
    let sorted = [...result].sort((a, b) => (a.name > b.name ? 1 : -1));
    setFavoriteChannels(sorted);
  };

  const handleOnClickCard = (channelId) => {
    history.push(`/programs/${channelId}`);
  };

  const handleSchedule = (e, channelId) => {
    e.stopPropagation();
    setChannelIdToSchedule(channelId);
    setShowSchedule(true);
  };

  const renderFavoriteChannels = () => {
    return favoriteChannels.map((channel) => (
      <Card
        key={channel.id}
        className={styles.favoritecard}
        onClick={() => {
          handleOnClickCard(channel.id);
        }}
      >
        <Row className={styles.row}>
          <Col xs={3} style={{ padding: "1.25rem" }}>
            <Card.Img src={channel.image} alt={"channelmage"} />
          </Col>
          <Col xs={7}>
            <Card.Body>
              <Card.Title className={styles.Head}>{channel.name} </Card.Title>
              <Card.Text className={styles.Text}>{channel.tagline}</Card.Text>
              <p
                className={styles.goToSchedule}
                onClick={(e) => handleSchedule(e, channel.id)}
              >
                {" "}
                Schedule &gt; &gt; &gt;
              </p>
            </Card.Body>
          </Col>
          <Col xs={1} style={{ paddingTop: "1.25rem" }}>
            <Trash
              onClick={(e) => {
                deleteFavoriteChannel(e, channel.id);
              }}
              color="Gray"
              size={25}
            />
          </Col>
        </Row>
      </Card>
    ));
  };

  return (
    <div>
      <h2 className="title">Channels</h2>
      {showSchedule ? (
        <ChannelSchedule channelId={channelIdToSchedule} />
      ) : (
        <Container className="d-flex justify-content-center flex-wrap">
          {!favoriteChannels ? (
            <p>Loading...</p>
          ) : favoriteChannels.length === 0 ? (
            <p>There are no favourite channels</p>
          ) : (
            <Row lg={2}>{renderFavoriteChannels()}</Row>
          )}
        </Container>
      )}
    </div>
  );
};

export default FavoriteChannels;
