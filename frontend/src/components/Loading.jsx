import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeLoading } from "../store/actions/appActions";

function Loading () {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeLoading(true))

        return () => dispatch(changeLoading(false))
    },[])
    return (<></>);
}

export default Loading ;