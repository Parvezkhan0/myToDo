import React, { Component } from 'react';
import './App.css';
import CustomModal from './components/Model'; // Ensure this file exists and is implemented
import axios from 'axios'; // Add axios import

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      activeItem: { title: '', description: '', completed: false },
      modal: false,
    };
  }

  componentDidMount(){
    this.refreshList();
  }

  refreshList = () =>{
    axios
      .get('http://localhost:8000/api/tasks/')
      .then(res => this.setState({ todoList: res.data })) // Fix setState here
      .catch(err => console.log(err));
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggleModal();
    if (item.id){
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item) // Fix template literal here
        .then(res => this.refreshList());
    } else {
      axios
        .post('http://localhost:8000/api/tasks/', item)
        .then(res => this.refreshList());
    }
  };

  handleDelete = (item) => {
    if (item.id){
      axios
        .delete(`http://localhost:8000/api/tasks/${item.id}/`) // Fix template literal here
        .then(res => this.refreshList());
    }
  };

  createItem = () => {
    const newItem = { title: '', description: '', completed: false };
    this.setState({ activeItem: newItem, modal: true });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: true });
  };

  displayCompleted = (status) => {
    this.setState({ viewCompleted: status });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? 'active' : ''}
        >
          Completed
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? '' : 'active'}
        >
          Incompleted
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted, todoList } = this.state;
    const filteredItems = todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return filteredItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            viewCompleted ? 'completed-todo' : ''
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-info mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mr-2"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content p-3 mb-2 bg-info">
        <h1 className="text-white text-uppercase text-center my-4">
          Task Manager
        </h1>

        {this.renderTabList()}

        <ul className="list-group my-5">{this.renderItems()}</ul>

        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <button className="btn btn-warning" onClick={this.createItem}>
                Add Task
              </button>
            </div>
          </div>
        </div>

        <footer className="my-3 mb-2 bg-info text-white text-center">
          Copyright 2025 &copy; All Rights Reserved
        </footer>

        {this.state.modal && (
          <CustomModal
            activeItem={this.state.activeItem}
            toggle={this.toggleModal}
            onSave={this.handleSubmit}
          />
        )}
      </main>
    );
  }
}

export default App;
