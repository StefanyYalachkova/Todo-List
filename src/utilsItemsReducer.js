const getStateWithNewItem = (value, items) => {
    let newState = [...items];
    const lastElementIndex = items.length ? items.length - 1 : 0;
    const lastElement = items[lastElementIndex] || {};
    const { key } = lastElement;
    const newKeyValue = (key || 0) + 1;

    let newItem = {
        text: value,
        key: newKeyValue,
        checked: false
    };

    if (newItem !== '') {
        newState.push(newItem);
    }

    return newState;
};

const getNewList = (items, index, updatedItem) => {
    let newList = [...items];

    if (updatedItem) {
        newList.splice(index, 1, updatedItem);
    } else {
        newList.splice(updatedItem, 1);
    }

    return newList;
};

export { getStateWithNewItem, getNewList };