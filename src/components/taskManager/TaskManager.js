import {useState, useRef, useEffect} from "react";
import Task from "./Task";

const TaskManager = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("")
  const [tasks, setTasks] = useState([])

  const [taskID, setTaskID] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!name && !date || !name || !date){
      alert("Please enter class name and date");
    } else if(name && date && isEditing){
      setTasks(tasks.map((task) => {
        if(task.id === taskID){
          return {...task, name, date, complete: false}
        }
        return task;
      }))

      setName("")
      setDate("")
      setIsEditing(false)
      setTaskID(null);
    } 
 
    else{
      const newTask = {
        id: Date.now(),
        name,
        date,
        complete: false
      }
      setTasks([...tasks, newTask])
      setName("");
      setDate("");
    }
  }

  const editTask = (id) => {
    const thisTask = tasks.find((task) => task.id === id)

    setIsEditing(true);
    setTaskID(id);
    setName(thisTask.name);
    setDate(thisTask.date);
  }

  const deleteTask = (id) => {
    if(window.confirm("Delete this task" === "true")){
      const newTasks = tasks.filter((task) => task.id !== id)
       setTasks(newTasks);
    }
  }

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if(task.id === id){
          return{...task, complete: true}
        }
        return task;
      })
    )
  }

  return <div className="--bg-primary">
    <h1 className="--text-center --text-light">Task Manager</h1>
  <div className="--flex-center --p">
    <div className="--card --bg-light --width-500px --p --flex-center">
      <form onSubmit={handleSubmit} className="form --form-control">
          <div>
            <label htmlFor="name">Task Name</label>
            <input ref={nameInputRef} type="text" placeholder="Task name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="date">Task Date</label>
            <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          </div>
          <button className="--btn --btn-success --btn-block">{isEditing ? "Edit task" : "Save task"}</button>
      </form>
    </div>
  </div>
    <div>

    </div>
    {/* Display task */}
    <article className="--flex-center --my2">
        <div className="--width-500px --p">
          <h2 className="--text-light">Task List</h2>
          <hr style={{background: "fff"}}/>
          {tasks.length === 0 ? (
            <p className="--color-light">No tasks...</p>
          ) : (
            <div>
              {tasks.map((task) => {
                return <Task {...task} editTask={editTask} deleteTask={deleteTask} completeTask={completeTask}/>
              })}
            </div>
          )}
          <Task/>
        </div>
    </article>
  </div>;
};

export default TaskManager;
