const listReducer = (tasks, action) => {
    switch (action.type) {
        case "GET_TASKS":
            return [...action.tasks];
        case "ADD_TASK":
            return [...tasks, action.task]
        case "DELETE_TASK":
            return [...tasks.filter((task) => task._id !== action.task._id)]
        case "TOGGLE_TASK":
            return [...tasks.filter((task) => {
                if (task._id === action.task._id) { task.active = !task.active }
                return true
            })]
        default:
            return [...tasks]
    }
}
export default listReducer