import { useDispatch } from "react-redux";
import { logout } from '../store/action/auth';
import { useHistory } from "react-router-dom";

const Logout = () => {

    const dispatch = useDispatch();
    let history = useHistory();

    const handleSignOut = (event) => {
        event.preventDefault();
        alert('log out');
        dispatch(logout());
        console.log(history);
        history.push('home');
    }

    return <button onClick={handleSignOut} >Logout</button>
}

export default Logout;