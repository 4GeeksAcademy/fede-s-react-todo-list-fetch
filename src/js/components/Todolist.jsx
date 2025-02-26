import React, { useEffect, useState } from "react";

const Todolist = () => {

    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.target.value.length > 0 && e.target.value !== " ") {
            addTodo(e.target.value)
            setInputValue("");

        }
    }

    // CREATE TODO TASK
    const addTodo = async (todo) => {

        let payload = {
            "label": todo,
            "is_done": false
        }

        try {
            const response = await fetch('https://playground.4geeks.com/todo/todos/fede_serron', {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })

            if (!response.ok) {
                console.log("There was an error trying to create the todo task: ", response.statusText);
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setTasks([data, ...tasks])

        } catch (error) {
            console.log("There was an error trying to create the todo task, inside the catch", error)
            return error;
        }

    };


    //LIST TODO TASKS
    const getTodos = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/fede_serron', {
                method: "GET",
            });

            if (response.statusText === 'Not Found') {
                createUser();
            } else if (!response.ok) {
                throw new Error(response.statusText);
            }

            let data = await response.json();
            setTasks([...data.todos].reverse())

        } catch (error) {
            console.log("There was an error, this is inside the catch into de getTodos function.", error);
            return error;
        }
    };


    //DELET TODO TASK
    const deleteTodo = async (idx) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${idx}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error("There was an error trying to delete the task, ", response.statusText);
            }
            const data = await response.json();
            setTasks([...data].reverse());

        } catch (error) {
            console.log("There was an error trying to delete the task, this is inside the catch into de deleteTodo function, ", error)
            return error;
        }
    };


    //CREATE USER IF IT DOESN'T EXISTS
    const createUser = async () => {
        try {
            let payload = {
                "name": "fede_serron"
            }
            const response = await fetch('https://playground.4geeks.com/todo/users/fede_serron', {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }

            });

            if (!response.ok) {
                throw new Error("There was an error into the createUser function", response.statusText);

            }

        } catch (error) {
            console.log("There was an error, this is inside the catch into the createUser function, ", error)
            return error
        }
    };


    useEffect(() => {
        getTodos();
    }, [tasks]);



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
                                    {tasks.map((task) => (
                                        <li key={task.id} className="list-group-item border-0 d-flex align-items-center ps-0 bg-light li border-bottom">
                                            {task.label}
                                            <i className="fa-regular fa-circle-xmark ms-auto hide" onClick={() => deleteTodo(task.id)}></i>
                                        </li>

                                    ))}
                                </ul>
                                <p className="pt-3"><small>{`${tasks.length} items left`}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todolist;