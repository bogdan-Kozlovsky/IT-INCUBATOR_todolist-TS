import React, {useState} from 'react';
import './App.scss';
import {TodoList} from './component/TodoList';

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: 'React!', isDone: false},
        {id: 2, title: 'TypeScript!', isDone: false},
        {id: 3, title: 'Todo!', isDone: true},
        {id: 4, title: 'JavaScript!', isDone: false},
    ])


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


    const removeTask = (id: number) => {
        let newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)
    }
    const changeFilter = (value:FilterValuesType) => {
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
                />
            </div>
        </div>
    );
}

export default App;
