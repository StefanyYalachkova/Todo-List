import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.renderComplitioCaption = this.renderComplitioCaption.bind(this);
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

  renderComplitioCaption() {
    const showCaption = this.state.items.every(item => item.checked);

    if (showCaption && this.state.items.length) {
      return (
        <div>
          <h2>All tasks are completed!</h2>
        </div>
      )
    }
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
        {this.renderComplitioCaption()}
      </div>
    );
  }
}

class CreateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleAdd(event) {
    this.props.onHandleAdd(this.state.value);

    this.setState({
      value: ''
    });

    event.preventDefault();
  }

  render() {
    return (
      <form>
        <h1>TODO LIST</h1>
        <b>Task:</b>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button type="submit" onClick={this.handleAdd}> Add </button>
      </form>
    );
  }
}

class TasksList extends React.Component {

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
      </div>
    );
  }
}

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ToDoList />);

