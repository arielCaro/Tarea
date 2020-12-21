import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1/";

export default {

    task(url = baseUrl + 'tasks/') {
        return {
            GetAllTask: () => axios.get(url),
            GetTaskById: id => axios.get(url + id),
            CreateTask: newRecord => axios.post(url, newRecord),
            UpdateTask: (id, updateRecord) => axios.put(url + id, updateRecord),
            DeleteTask: id => axios.delete(url + id)
        }
    }
}