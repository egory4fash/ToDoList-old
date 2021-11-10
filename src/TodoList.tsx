import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    id:string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string,todoListID: string) => void
    changeFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string ) => void
    removeTodoList : (todoListID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const errorStyles = {color:"red"}
    const jsxTaskElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id,props.id)
        const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)

        }
        return (
            <li
                className={task.isDone ? "is-done" : ''}
                key={task.id}>
                <input type='checkbox'
                       checked={task.isDone}
                       onChange={changeStatus}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>)
    })

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle,props.id)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const setAll = () => props.changeFilter('all',props.id)
    const setActive = () => props.changeFilter('active',props.id)
    const setCompleted = () => props.changeFilter('completed',props.id)

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(event.currentTarget.value)
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const allBtnClass = props.filter === "all" ? "active-filter" : ""
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const completedBtnClass = props.filter === "completed" ? "active-filter" : ""

    const errorMessage = error ? <div style={errorStyles}>Title required!</div> : null

    return (
        <div className='todoList'>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    placeholder='Enter your task...'
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
            </div>
            {errorMessage}
            <ul>
                {jsxTaskElements}
            </ul>
            <div>
                <button className={allBtnClass} onClick={setAll}>All</button>
                <button className={activeBtnClass} onClick={setActive}>Active</button>
                <button className={completedBtnClass} onClick={setCompleted}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;