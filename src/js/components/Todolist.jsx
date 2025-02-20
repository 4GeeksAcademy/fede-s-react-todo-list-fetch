import React, { useEffect, useState } from "react";

const Todolist = () => {

    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.target.value.length > 0 && e.target.value !== " ") {
            setTasks([...tasks, e.target.value])
            setInputValue("");

        }
    }

    const handleDeleteTask = (idx) => {
        // e.target.parentElement.remove();
        const updatedTasks = tasks.filter((_, i) => i !== idx);
        setTasks([...updatedTasks]);

    }

    return (
        <div className="vh-50" >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-8 col-xl-6">
                        <div className="card bg-light rounded-3">
                            <div className="card-body p-4">

                                <p className="mb-2"><span className="h2 me-2">ToDo List</span> <span
                                    className="badge bg-danger">Pending</span></p>
                                <p className="text-muted pb-2">20/02/2025</p>

                                <div className="input-group mb-3">
                                    <input onKeyDown={handleKeyDown} type="text" className="form-control" onChange={e => { setInputValue(e.target.value) }} placeholder="Add a Task" aria-label="TaskInput" value={inputValue} />
                                </div>
                                <ul className="list-group rounded-0">
                                    {tasks.length === 0 ? <div className='list-group-item border-0 d-flex  align-items-center bg-light ps-0'>Please add something to do</div> : ""}
                                    {tasks.map((task, index) => (
                                        <li key={index} className={`list-group-item border-0 d-flex align-items-center ps-0 bg-light li ${index === tasks.length - 1 ? "" : "border-bottom"} `}>
                                            {task}
                                            <i className="fa-regular fa-circle-xmark ms-auto hide" onClick={() => handleDeleteTask(index)}></i>
                                        </li>

                                    ))}
                                </ul>
                                <p><small>{`${tasks.length} items left`}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todolist;