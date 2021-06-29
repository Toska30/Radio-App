import  { useContext, useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import {Heart, HeartFill,Tag } from 'react-bootstrap-icons';
import { UserContext } from "../contexts/UserContext";
import { Row, Card, Col} from "react-bootstrap";
import { FavoriteContext } from "../contexts/FavoriteContext";
import styles from "../css/ProgramList.module.css"



const ProgramCard=(props)=> {
  const { user } = useContext(UserContext);
  const { deleteFavoriteProgram, addProgramToFavorites,favoriteProgramIds} = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if(user){
    getFavHeart();
    console.log("hello")
    }
  }, [favoriteProgramIds]);



  const getFavHeart = () => {
    if (favoriteProgramIds && props.program) {
      let result = favoriteProgramIds.find((fpi) => fpi.programId == props.program.id);
      if (result) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  };

  const handleClick=(programId)=>{
    history.push(`/programs/allprogram/${programId}`)
  }


  const handleOnClickFullHeart = (e, programId) => {
    setIsFavorite(!isFavorite);
    deleteFavoriteProgram(e, programId);
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


  
  return (
    <>
      {props.program && 
       <Col key={props.program.id} xs={12} md={12} lg={6}   onClick={() => handleClick(props.program.id) }>
       <Card className={styles.card} >
       <Row>
        <Col xs={3} style={{padding:"1.25rem"}}>
          <Card.Img src={props.program.programimagewide} alt={"program image"}/>
        </Col>
        <Col xs={7} >
        <Card.Body>
          <Card.Title className={styles.Head}>{props.program.name}</Card.Title>
          <div className ={styles.cardTag}>
            {props.program.channel&&
          <Card.Text className={styles.Text}>
           <Tag color="white" size={25} />
            {props.program.channel["name"]} </Card.Text>}
            {props.program.programcategory&&
          <Card.Text className={styles.Text}>
           <Tag color="white" size={25} />
            {props.program.programcategory["name"]} </Card.Text>}
          </div>
        </Card.Body>
        </Col>
        {user && (
          <Col style={{padding:"1.25rem"}}  xs={1}>
            {isFavorite ? (
              <HeartFill
                color="IndianRed"
                size={25}
                onClick={(e) => {
                  handleOnClickFullHeart(e, props.program.id);
                }}
              />
            ) : (
              <Heart
                color="gray"
                className={styles.heartIcon}
                size={25}
                onClick={(e) => {
                  handleOnClickEmptyHeart(e, props.program.id);
                }}
              />
            )}
          </Col>
        )}  
        </Row>
      </Card>
       </Col>}
       </>
  )
}

export default ProgramCard
