import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: { ...this.props.activeItem } // Make a copy to avoid mutating props directly
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        if (e.target.type === 'checkbox') {
            value = e.target.checked;
        }

        // Use a new object to ensure immutability
        this.setState((prevState) => ({
            activeItem: { ...prevState.activeItem, [name]: value }
        }));
    };

    validateForm = () => {
        const { title, description } = this.state.activeItem;
        return title.trim() && description.trim();
    };

    render() {
        const { toggle, onSave } = this.props;

        return (
            <Modal isOpen toggle={toggle}>
                <ModalHeader toggle={toggle}>Task Item</ModalHeader>
                <ModalBody>
                    <form>
                        <FormGroup>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={this.state.activeItem.title}
                                onChange={this.handleChange}
                                placeholder="Enter Task Title"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Enter Task Description"
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label>
                                <Input
                                    type="checkbox"
                                    name="completed"
                                    checked={this.state.activeItem.completed}
                                    onChange={this.handleChange}
                                />{' '}
                                Completed
                            </Label>
                        </FormGroup>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => onSave(this.state.activeItem)}
                        disabled={!this.validateForm()} // Disable Save button if fields are empty
                    >
                        Save
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

// Define PropTypes for the component
CustomModal.propTypes = {
    toggle: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    activeItem: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        completed: PropTypes.bool
    })
};

// Default Props
CustomModal.defaultProps = {
    activeItem: {
        title: '',
        description: '',
        completed: false
    }
};

export default CustomModal;
