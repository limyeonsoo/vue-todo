import axios from 'axios';

async function hello(){
    return await axios.get('api/tasks')
}
// async function todoGet(){
//     return await axios.get('api/tasks')
// }
// async function todoGetId(req){
//     return await axios.get(`api/tasks+${req}`);
// }
// async function todoPost(req){
//     return await axios.post(`api/tasks+${req}`);
// }
// async function todoUpdate(req){
//
// }
// async function todoPatch(req){
//
// }





// export {hello, todoGet, todoGetId, todoPost, todoUpdate, todoPatch};
export {hello};