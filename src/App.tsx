import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"
export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type globalDate = { [key: string]: Array<TaskType> }

function App() {


    // const [filter, setFilter] = useState<FilterValuesType>("all")
    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //                    {id: v1(), title: "HTML", isDone: true},
    //                    {id: v1(), title: "CSS", isDone: true},
    //                    {id: v1(), title: "JS/TS", isDone: false},
    //                ])
    let todoListId1 = v1()
    let todoListId2 = v1()


    let [todolists, setTodolists] = useState<Array<todolistsType>>(
        [
            {id: todoListId1, title: 'What to learn', filter: 'all'},
            {id: todoListId2, title: 'What to buy', filter: 'all'}
        ]
    )

    let [tasks, setTasks] = useState<globalDate>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "HTML&CSS222", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter} : m))
    }
    const removeTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== id)})
        // setTasks(tasks.filter(t => t.id !== id))
    }
    const addTask = (todolistId: string, title: string) => {
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]})
        // setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone} : t)})
        // setTasks(tasks.map(t => t.id === id ? {...t, isDone} : t))
    }


    // const getTasksForRender = () => {
    //     switch (filter) {
    //         case "completed":
    //             return tasks.filter(t => t.isDone)
    //         case "active":
    //             return tasks.filter(t => !t.isDone)
    //         default:
    //             return tasks
    //     }
    // }


    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(f => f.id !== todolistId))
        delete tasks[todolistId]
    }

    //UI:
    return (
        <div className="App">
            {todolists.map(m => {
                let tasksForTodolist = tasks[m.id];

                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => !t.isDone);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone);
                }
                return (
                    <TodoList
                        key={m.id}
                        todolistId={m.id}
                        filter={m.filter}
                        title={m.title}
                        tasks={tasksForTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                    />
                )
            })}

        </div>
    )
}

export default App;


