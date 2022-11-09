import React from 'react';

class TaskRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            value: ''
        }

        this.internalHandleEditItem = this.internalHandleEditItem.bind(this);
        this.setUpdate = this.setUpdate.bind(this);
        this.handleChangeElement = this.handleChangeElement.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    internalHandleEditItem() {
        const { item, handleEditItem } = this.props;

        if (!this.state.isEditing) {
            this.setState({
                isEditing: true,
                value: item.text
            });
        }

        handleEditItem(item);
    }

    handleChangeElement(event) {
        this.setState({
            value: event.target.value,
        });
    }

    setUpdate(item) {
        item = this.props.item;

        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleChangeElement} />
                <button type="submit" value={item} onClick={this.updateItem}>Finish</button>
            </div>
        );
    }

    updateItem() {
        this.setState({
            isEditing: false
        });

        this.props.handleEditItem(this.state.value);
    }

    defaultItem(item, checked) {
        item = this.props.item;
        checked = this.props.checked;

        return (
            <div>
                <input type="checkbox" id="accept" value={checked} onChange={this.props.handleCompleteItem}></input>
                <span className={checked ? "checked" : "unchecked"}>{item.text}</span>
                <button type="submit" value={item} onClick={this.internalHandleEditItem}>Edit</button>
                <button type="submit" value={item} onClick={this.props.handleRemoveItem}>Remove</button>
            </div>
        );
    }

    render() {
        const { item } = this.props;

        return (
            <li key={item.key} >
                {
                    this.state.isEditing
                        ? this.setUpdate()
                        : this.defaultItem()
                }
            </li>
        );
    }
}

export { TaskRow }