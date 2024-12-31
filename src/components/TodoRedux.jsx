import { useSelector, useDispatch } from "react-redux";
import  { setValue, addTask, removeTask, updateTask } from "../redux/todoSlice";

function TodoRedux() {
    const list = [];
    const dispatch = useDispatch();
    const { value, todoList } = useSelector((state) => state.todo);

    const handleChange = (e) => {
        dispatch(setValue(e.target.value));
    }
    return (
        <>
        <h2>Todo</h2>
        <div className="flex space-x-2">
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="" id="" placeholder="Add todo" value={value} onChange={handleChange}/>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => dispatch(addTask())}>Add Todo</button>
        </div>
        <div>
            <ul className="max-w-md space-y-1 text-black-500 list-disc list-inside dark:text-black-400 ml-5">
                {todoList.map((item, index) => {
                    return <li key={index}>{item}</li>
                })}
            </ul>
        </div>
        </>

    )
}

export default TodoRedux