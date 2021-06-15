import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../store/action/project";

const Project = () => {
    const projects = useSelector(state => state.project);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProjects());
    },[dispatch]);

    const showAllProjects = (data) => {
        console.log('daata')
        console.log(data);
        return data.map(x => <ul key={x.id}>{x.id}</ul>)
    }
    
    return (
        <div>
            <h1>project page</h1>
            <li>
                {projects && showAllProjects(projects)}
            </li>
        </div>
    );
}

export default Project;