import { useState } from "react"

export default function Project(){
        const [projectname,setProjectname] = useState("");
        const [description,setDescription] = useState("");
        const [startdate,setStartdate] = useState("");
        const [enddate, setEnddate]= useState("");
        const[projectstatus,setProjectStatus] = useState("");
        const[Noteammembers,setNoteammembers] = useState(0);
        const [project,setProject] =useState([]);
        const [error,setError] = useState("");
        const [message,setMessage] = useState("");
        const apiUrl = "http://localhost:8000"

    const handleSubmit = () =>{
        if(projectname.trim()!== '' && description.trim()!== ''){
            fetch(apiUrl+"/project", {
                method:"POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({projectname,description,startdate,enddate,projectstatus,Noteammembers})
            }).then((res)=>{
                if(res.ok){
                    setProject([...project,{projectname,description,startdate,enddate,projectstatus,Noteammembers}])
                    setMessage("Item added successfully")
            }else{
                //set error
                setError("Unable to create project item")

            }
        })
           //add projects to list
            
        }
    }
    return <>
    <div className="row p-3 bg-primary text-light">
        <h1>Create Projects</h1>
    </div>

    <div className="row">
        <h3>Add Project</h3>
        {message && <p className="test-success">{message}</p>}
        <div className="form-group">
                    <input
                        placeholder="Project Name"
                        onChange={(e) => setProjectname(e.target.value)}
                        value={projectname}
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder="Start Date"
                        onChange={(e) => setStartdate(e.target.value)}
                        value={startdate}
                        className="form-control"
                        type="date"
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder="End Date"
                        onChange={(e) => setEnddate(e.target.value)}
                        value={enddate}
                        className="form-control"
                        type="date"
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder="Project Status"
                        onChange={(e) => setProjectStatus(e.target.value)}
                        value={projectstatus}
                        className="form-control"
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder="Number of Team Members"
                        onChange={(e) => setNoteammembers(e.target.value)}
                        value={Noteammembers}
                        className="form-control"
                        type="number"
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-dark" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                {error && <p className="text-danger">{error}</p>}
            </div>
        </>
};
