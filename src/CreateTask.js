import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateTask = (props) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleAdd = (event) => {
        props.onHandleAdd(value);

        setValue('');

        event.preventDefault();
    };

    return (
        <form>
            <h1>TODO LIST</h1>
            <b>Task:</b>
            <input type="text" value={value} onChange={handleChange} />
            <button type="submit" onClick={handleAdd}> Add </button>
        </form>
    );

};

CreateTask.propTypes = {
    onHandleAdd: PropTypes.func
};

export { CreateTask };
