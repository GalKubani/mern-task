import Axios from 'axios'

const DB_URL = `http://localhost:4040`
export const getActiveTasks = async () => {
    try {
        const res = await Axios.get(DB_URL + "/tasks")
        return res.data;
    } catch (err) {
        console.log(err);
    }
}
export const addATask = async (description) => {
    try {
        const res = await Axios.post(DB_URL + "/tasks", { description })
        return res.data;
    } catch (err) {
        console.log(err);
    }
}
export const removeTask = async (taskId) => {
    try {
        const res = await Axios.delete(DB_URL + "/tasks?id=" + taskId)
        return res.data;
    } catch (err) {
        console.log(err)
    }
}
export const completeTask = async (taskId) => {
    try {
        const res = await Axios.patch(DB_URL + "/tasks?id=" + taskId)
        return res.data;
    } catch (err) {
        console.log(err)
    }
}