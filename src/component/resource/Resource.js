import { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllResources ,searchResource} from "../../store/action/resource";

const Resource = () => {

    const resources = useSelector(state => state.resource);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(getAllResources());
    },[dispatch]);

    const showAll = (data) => {
        console.log('resource data')
        console.log(data);
        return data.map(x => <ul key={x.id}>{x.id} {x.details.map(x => x.value + '      ')}</ul>)
    }

    const handleOnChange = (event) => {
        // console.log(event.target.value);
        setSearch(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('I am Submitting ' + search);
        dispatch(searchResource(resources.filter(x => x.details.filter(y => y.value === search).length !== 0 ? true : false)));
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search.." name="search" onChange={handleOnChange}></input>
                <button type="submit">Submit</button>
            </form>
            <li>
                {resources&& showAll(resources)}
            </li>
        </div>
    );
}

export default Resource;