import { useContext, useEffect } from "react";
import ProgramCard from "./ProgramCard";
import { Row, Container } from "react-bootstrap";
import { ProgramContext } from "../contexts/ProgramContext";
import Tillbaka from "./Tillbaka";
import styles from "../css/ProgramList.module.css";




const ProgByChannelId = (props) => {
  const { programs, getProgByChannelId } = useContext(ProgramContext);

  useEffect(() => {
    getProgByChannelId(props.channelId);

  }, [props.channelId, programs]);

  return (
    <div className={styles.programs}>
      <Tillbaka />
      <h2>Program A-Z</h2>
      <hr />
      <Container>
        <Row>
          {programs &&
            programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProgByChannelId;
