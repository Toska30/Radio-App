import { useHistory } from 'react-router-dom';
import { CaretLeft } from 'react-bootstrap-icons';


function Tillbaka() {
    const history = useHistory();
    const handleHistory = () => {
        history.goBack();
    }
    return (
        <CaretLeft className="back-button" size={25} color="gray" onClick={handleHistory} />
    )
}

export default Tillbaka
