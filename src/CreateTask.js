import React from 'react';

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

export { CreateTask }