import { useContext } from "react";
import { ChannelContext } from "../contexts/ChannelContext";
import ChannelCard from "./ChannelCard";
import { Container, Row } from "react-bootstrap";


function Channels() {
  const { channels } = useContext(ChannelContext);
  return (
    <Container className="d-flex justify-content-center flex-wrap">
      <Row lg={2}>
        {channels &&
          channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
      </Row>
    </Container>
  );
}

export default Channels;
