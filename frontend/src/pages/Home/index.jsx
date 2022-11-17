import { useDispatch } from "react-redux";
import { changeLoading } from '../../store/actions/appActions';
import './Home.scss';

function Home() {
    const dispatch = useDispatch();
    const handleClick = (loading) => {
        dispatch(changeLoading(loading))
    }
    return (
        <div className="page__home">
            <h1 onClick={() => handleClick(true)}>ON</h1>
            <h1 onClick={() => handleClick(false)}>OFF</h1>
        </div>
    );
}

export default Home;