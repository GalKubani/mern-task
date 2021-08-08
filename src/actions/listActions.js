export const getTasksAction = (tasks) => ({
    type: "GET_TASKS",
    tasks
})
export const addNewTask = (task) => ({
    type: "ADD_TASK",
    task
})
export const deleteTask = (task) => ({
    type: "DELETE_TASK",
    task
})
export const toggleTask = (task) => ({
    type: "TOGGLE_TASK",
    task
})