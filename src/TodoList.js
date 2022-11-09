import React from 'react';
import { CreateTask } from "./CreateTask";
import { TasksList } from './TasksList';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showCaption: false
        };

        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    addItem(value) {
        const { items } = this.state;
        const lastElementIndex = items.length ? items.length - 1 : 0;
        const lastElement = items[lastElementIndex] || {}
        const { key } = lastElement
        const newKeyValue = (key || 0) + 1;

        let newItem = {
            text: value,
            key: newKeyValue,
            checked: false
        };

        if (newItem !== '') {
            let newState = [...this.state.items];
            newState.push(newItem);

            this.setState({
                items: newState
            });
        }
    }

    editItem(updatedItem, index) {
        let newList = [...this.state.items];
        newList.splice(index, 1, updatedItem);

        this.setState({
            items: newList
        });
    }

    removeItem(item) {
        let newList = [...this.state.items];
        newList.splice(item, 1);

        this.setState({
            items: newList
        });

    }

    render() {

        return (
            <div>
                <CreateTask
                    onHandleChange={this.handleChange}
                    onHandleAdd={this.addItem}
                />
                <TasksList
                    toDoItems={this.state.items}
                    removeItem={this.removeItem}
                    editItem={this.editItem}
                />
            </div>
        );
    }
}

export { ToDoList }