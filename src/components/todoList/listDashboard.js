import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { addNewTask, deleteTask, getTasksAction, toggleTask } from '../../actions/listActions'
import listReducer from '../../reducers/listReducer'
import { addATask, completeTask, getActiveTasks, removeTask } from '../../server/db'
import DedicatedButton from './dedicatedButton'

const ListDashboard = () => {

    const [taskData, taskDispatch] = useReducer(listReducer, [])
    const [isThereAnError, setIsThereAnError] = useState(false)
    const [taskValue, setTaskValue] = useState('')
    const [firstClick, setFirstClick] = useState(true)


    useEffect(async () => {
        await getActiveTasks().then((res) => {
            taskDispatch(getTasksAction(res))
        })
    }, [])
    useEffect(async () => {
        if (!firstClick) {
            if (taskValue) { setIsThereAnError(false) }
            else { setIsThereAnError(true) }
        }
        setFirstClick(false)
    }, [taskValue])


    const currentCounter = useMemo(() => updateCount(taskData), [taskData]);
    const updateCount = (list) => {
        let count = list.reduce(function (accumulator, currentValue) {
            if (currentValue.active)
                return accumulator += 1
            return accumulator
        }, 0)
        return count
    }

    const onSendTask = async (e) => {
        e.preventDefault()
        if (!taskValue) {
            setIsThereAnError(true)
            return
        }
        await addATask(e.target.children[0].value).then((res) => {
            taskDispatch(addNewTask(res))
        })
    }

    return (
        <div className="list-container">
            <form onSubmit={onSendTask}>
                <input defaultValue='' onInput={(e) => {
                    setTaskValue(e.target.value)
                }} placeholder="enter your task" />
                <DedicatedButton />
                {isThereAnError && <div style={{ color: "red" }}>Cannot create empty task</div>}
            </form>
            <ul>
                <div className="counter">Currently active tasks - {currentCounter}</div>
                {taskData.length > 0 ? taskData.map((task, i) => {
                    return <li key={i}>
                        <input type="checkbox" defaultChecked={!task.active} onChange={async (e) => {
                            e.target.nextElementSibling.className = task.active ? "lined" : ""
                            await completeTask(task._id).then((res) => {
                                taskDispatch(toggleTask(res))
                            })
                        }} />
                        <span className={task.active ? "" : "lined"}>{task.description}</span>
                        <button onClick={async () => await removeTask(task._id).then((res) => {
                            taskDispatch(deleteTask(res))
                        })}>Remove</button>
                    </li>
                }) : <li>Your list is empty</li>}
            </ul>

        </div >
    )
}

export default ListDashboard