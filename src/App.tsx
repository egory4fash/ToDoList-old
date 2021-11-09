import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type todolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type  FilterValuesType = 'all' | 'active' | 'completed'

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todolists, setTodolists] = useState<Array<todolistType>>([
        {id: todoListID_1, title: "What to learn", filter: 'all'},
        {id: todoListID_2, title: "What to byu", filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>(
        {
            [todoListID_1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'JS, REACT', isDone: false},
                {id: v1(), title: 'Redux', isDone: false},
            ],
            [todoListID_2]:
                [{id: v1(), title: 'Meat', isDone: true},
                    {id: v1(), title: 'Vodka', isDone: true},
                    {id: v1(), title: 'Beer', isDone: false},
                    {id: v1(), title: 'Candies', isDone: false},
                ]
        })

    const removeTask = (taskID: string, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].filter(task => task.id !== taskID)
        })
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({
            ...tasks,
            [todoListID]: [newTask, ...tasks[todoListID]]
        })
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        })
    }
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodolists(todolists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }

    const removeTodoList = (todoListID: string,todoListID: string ) => {
        setTodolists(todolists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    // UI:

    const TodoListsComponents =todolists.map( tl=>{
        let tasksForRender:<Array<TaskType>> = tasks[tl.id]
        if (tl. filter === 'active') {
            tasksForRender = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForRender = tasks[tl.id].filter(t => t.isDone)
        }
        return (
            <TodoList
                key = {tl.key}
                id={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })




    return (
        <div className="App">
            {TodoListsComponents}

        </div>
    );
}

export default App;
