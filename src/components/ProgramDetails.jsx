import { useContext } from "react";
import { ProgramContext } from "../contexts/ProgramContext";
import Tillbaka from "./Tillbaka"
import { Card } from "react-bootstrap";
import styles from "../css/ProgramDetails.module.css";


const ProgramDetails = () => {
  const { program } = useContext(ProgramContext);
  const renderProgram = () => {
    return (
      <Card className={styles.card}>
        <Card.Header className={styles.Head} as="h5">About the program</Card.Header>
        <Card.Body>
          <Card.Title className={styles.Head}>{program.name}</Card.Title>
          <Card.Text className={styles.Text}>{program.description}</Card.Text>
          <div className={styles.info}>
            <p>Info: {program.broadcastinfo}</p>
          </div>
          <div className={styles.info}>
            <span>Email: {program.email}</span>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return ( 
    <div  >
    <Tillbaka /> 
    <div className={styles.ProgramDetails}>
      {program && renderProgram()}
    </div>

    </div>
  ) 
};
export default ProgramDetails;
