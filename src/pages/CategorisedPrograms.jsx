import { useEffect, useContext } from "react";
import ProgramCard from "../components/ProgramCard";
import { ProgramContext } from "../contexts/ProgramContext";
import { Row, Container} from "react-bootstrap";
import { CategoryContext } from "../contexts/CategoryContext";
import styles from "../css/CategorisedPrograms.module.css";

const CategorisedPrograms = (props) => {
  const { categoryId } = props.match.params;
  const { CategorisedPrograms, getCategorisedPrograms } = useContext(ProgramContext);
  const { category, getCategoryById } = useContext(CategoryContext);


  useEffect(() => {
    getCategoryById(categoryId);
    getCategorisedPrograms(categoryId);
    // eslint-disable-next-line
  }, [categoryId, CategorisedPrograms]);

  const renderTopMenu = () => {
    return <h2 className="title">{category}</h2>;
  };
  return (
    <div className={styles.ProgramList}>
      {renderTopMenu()}
      <hr />
      <Container>
        <Row>
          {CategorisedPrograms &&
            CategorisedPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
        </Row>
      </Container>
    </div>
  );
};
export default CategorisedPrograms;
