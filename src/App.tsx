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
        setTasks([newTitle, ...tasks])
    }


    let [filter, setFilter] = useState<FilterValuesType>('all')

    // const removeTask = (id: number) => {
    //     // мы должно отфильровать только те таски у которых id не равен на ту таску на которую мы нажали
    //     debugger
    //     let newTask = task1.filter((t) => {
    //         return (t.id !== id)
    //         // t это каждый елемент массива task1
    //
    //
    //         //если  task.id не равна id , то она проходит в истину, если она равна то в ложь
    //     })
    //     console.log(newTask)
    //
    // }


    const removeTask = (id: string) => {
        let newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }


    let tasksForTodoList = tasks
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    } else if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <div className="wrapper">

                <TodoList
                    task={tasksForTodoList}
                    subtitle={'Hello React!'}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                />
            </div>
        </div>
    );
}

export default App;
