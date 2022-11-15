import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TaskRow } from './TaskRow';

function TasksList(props) {

    const [showCaption, setShowCaption] = useState(false);

    useEffect(() => {
        const newShowCaption = props.toDoItems.length > 0 && props.toDoItems.every(item => item.checked);

        setShowCaption(newShowCaption);

    }, [props.toDoItems]);

    const listItems = props.toDoItems.map((item, index) =>{
        return (
            <TaskRow
                item={item}
                key={item.key}
                checked={item.checked}
                handleEditItem={(updatedItemValue) => props.editItem({
                    ...item,
                    text: updatedItemValue
                }, index)}
                handleRemoveItem={() => props.removeItem(index)}
                handleCompleteItem={() => props.editItem({
                    ...item,
                    checked: !item.checked
                }, index)}
            />
        );
    });

    return (
        <div className="listItems">
            <ul>
                {listItems}
            </ul>
            {showCaption &&

                (
                    <form>
                        <h2>All tasks are completed!</h2>
                    </form>
                )

            }
        </div>
    );

}

TasksList.propTypes = {
    toDoItems: PropTypes.array,
    removeItem: PropTypes.func,
    editItem: PropTypes.func
};

export { TasksList };
