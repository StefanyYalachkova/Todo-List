import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TaskRow(props) {

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState('');

    const internalHandleEditItem = () => {
        const { item, handleEditItem } = props;

        if (!isEditing) {
            setIsEditing(true);
            setValue(item.text);
        }

        handleEditItem(item);
    };

    const handleChangeElement = (event) => {
        setValue(event.target.value);
    };

    const setUpdate = (item) => {
        item = props.item;

        return (
            <div>
                <input type="text" value={value} onChange={handleChangeElement} />
                <button type="submit" value={item} onClick={updateItem}>Finish</button>
            </div>
        );
    };

    const updateItem = () => {
        setIsEditing(false);

        props.handleEditItem(value);
    };

    const defaultItem = (item, checked) => {
        item = props.item;
        checked = props.checked;

        return (
            <div>
                <input type="checkbox" id="accept" value={checked} onChange={props.handleCompleteItem}></input>
                <span className={checked ? 'checked' : 'unchecked'}>{item.text}</span>
                <button type="submit" value={item} onClick={internalHandleEditItem}>Edit</button>
                <button type="submit" value={item} onClick={props.handleRemoveItem}>Remove</button>
            </div>
        );
    };

    const { item } = props;

    return (
        <li key={item.key} >
            {
                isEditing
                    ? setUpdate()
                    : defaultItem()
            }
        </li>
    );

}

TaskRow.propTypes = {
    item: PropTypes.object,
    handleEditItem: PropTypes.func,
    checked: PropTypes.bool,
    handleCompleteItem: PropTypes.func,
    handleRemoveItem: PropTypes.func
};

export { TaskRow };
