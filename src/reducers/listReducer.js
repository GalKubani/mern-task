const listReducer = (tasks, action) => {
    switch (action.type) {
        case "GET_TASKS":
            return [...action.tasks];
        case "ADD_TASK":
            return [...tasks, action.task]
        case "DELETE_TASK":
            return [...tasks.filter((task) => task._id !== action.task._id)]
        case "TOGGLE_TASK":
            let updatedState = []
            for (let task of tasks) {
                if (task._id === action.task._id) {
                    let updatedTask = { _id: task._id, description: task.description, active: !task.active }
                    updatedState.push(updatedTask)
                }
                else { updatedState.push(task) }
            }
            return updatedState
        default:
            return [...tasks]
    }
}
export default listReducer