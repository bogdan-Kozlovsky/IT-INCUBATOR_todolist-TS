import React, {useState} from 'react';
import './App.scss';
import {TodoList} from './component/TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: 'React!', isDone: false},
        {id: v1(), title: 'TypeScript!', isDone: false},
        {id: v1(), title: 'Todo!', isDone: true},
        {id: v1(), title: 'JavaScript!', isDone: false},
    ])

    const addTask = (title: string) => {
        let newTitle = {id: v1(), title: title, isDone: false}
        setTasks([...tasks, newTitle])
    }


    let [filter, setFilter] = useState<FilterValuesType>('all')


    const removeTask = (id: string) => {
        let newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }


    let tasksForTodoList = tasks
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    } else if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }

    // function to change the status
    const changeStatus = (checked: boolean, id: string) => {
        setTasks([...tasks.map(t => t.id === id ? {...t, isDone: checked} : t)])
    }
    console.log('test')

    return (
        <div className="App">
            <div className="wrapper">

                <TodoList
                    task={tasksForTodoList}
                    subtitle={'Hello React!'}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={filter}
                />
            </div>
        </div>
    );
}

export default App;
