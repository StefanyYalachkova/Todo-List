import React from 'react';
import { TaskRow } from './TaskRow';

class TasksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCaption: false
        };
    }

    componentDidUpdate(prev) {
        const newShowCaption = this.props.toDoItems.length > 0 && this.props.toDoItems.every(item => item.checked);
        const prevShow = prev.toDoItems.length && prev.toDoItems.every(item => item.checked);

        if (prevShow !== newShowCaption) {
            this.setState({
                showCaption: newShowCaption
            });
        }
    }

    render() {
        const listItems = this.props.toDoItems.map((item, index) => {
            return (
                <TaskRow
                    item={item}
                    key={item.key}
                    checked={item.checked}
                    handleEditItem={(updatedItemValue) => this.props.editItem({
                        ...item,
                        text: updatedItemValue
                    }, index)}
                    handleRemoveItem={() => this.props.removeItem(index)}
                    handleChangeElement={this.handleChangeElement}
                    handleCompleteItem={() => this.props.editItem({
                        ...item,
                        checked: !item.checked
                    }, index)}
                />
            );
        });

        return (
            <div className='listItems'>
                <ul>
                    {listItems}
                </ul>
                {this.state.showCaption &&

                    (
                        <form>
                            <h2>All tasks are completed!</h2>
                        </form>
                    )

                }
            </div>
        );
    }
}

export { TasksList }