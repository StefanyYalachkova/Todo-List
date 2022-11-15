import { getStateWithNewItem, getNewList } from './utilsItemsReducer';

const reducer = (state, action) => {
    switch (action.type) {
        case 'addItem':
        {
            const newState = getStateWithNewItem(action.payload.value, state.items);

            return { ...state, items: newState };
        }
        case 'editItem':
        {
            const newList = getNewList(state.items, action.payload.index, action.payload.updatedItem);

            return { ...state, items: newList };
        }
        case 'removeItem':
        {
            const newList = getNewList(state.items, action.payload.index);

            return { ...state, items: newList };
        }
        default:
            return state.initialValue;
    }
};

export { reducer };