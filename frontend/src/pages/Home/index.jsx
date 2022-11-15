import { useDispatch } from "react-redux";
import { changeLoading } from '../../store/actions/appActions';

function Home() {
    const dispatch = useDispatch();
    const handleClick = (loading) => {
        dispatch(changeLoading(loading))
    }
    return (
        <>
            <h1 onClick={() => handleClick(true)}>ON</h1>
            <h1 onClick={() => handleClick(false)}>OFF</h1>
        </>
    );
}

export default Home;