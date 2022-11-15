import React, { useReducer } from 'react';
import { CreateTask } from './CreateTask';
import { TasksList } from './TasksList';
import { reducer } from './itemsReducer';

const initialValue = {
    items: []
};

function ToDoList() {
    const [state, dispatch] = useReducer(reducer, initialValue);

    const addItem = (value) => {
        dispatch({ type: 'addItem', payload: { value } });
    };

    const editItem = (updatedItem, index) => {
        dispatch({ type: 'editItem', payload: { updatedItem, index } });
    };

    const removeItem = (item) => {
        dispatch({ type: 'removeItem', payload: { item } });
    };

    return (
        <div>
            <CreateTask
                onHandleAdd={addItem}
            />
            <TasksList
                toDoItems={state.items}
                removeItem={removeItem}
                editItem={editItem}
            />
        </div>
    );
}

export { ToDoList };
