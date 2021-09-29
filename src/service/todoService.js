import axios from 'axios';

async function todoGet(){
    return await axios.get('api/tasks')
}
// async function todoGetId(req){
//     return await axios.get(`api/tasks+${req}`);
// }
async function todoPost(id, content){
    return await axios.post(`api/tasks`,{
        id: id,
        details: content
    });
}
async function todoDelete(id){
    return await axios.delete(`api/tasks/${id}`);
}

async function todoUpdate(id, content, status){
    return await axios.put(`api/tasks/${id}`,{
        id: id,
        details: content,
        status: status == 'Active' ? 'active' : 'done'
    });
}

async function todoPatchContent(id, content){
    return await axios.patch(`api/tasks/${id}`, {
        details: content
    })
}
async function todoPatchStatus(id, status){
    return await axios.patch(`api/tasks/${id}`, {
        status: status
    })
}

export {todoGet, todoPost, todoDelete, todoUpdate, todoPatchContent, todoPatchStatus};