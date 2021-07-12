import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

const TaskListForm = ({ show, handleClose, addTaskList }) => {
  const initialForm = { title: "" };
  const [taskList, setTaskList] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskList({ ...taskList, [name]: value });
  };

  const handleSubmit=(e)=>{
    const form = e.currentTarget;
              e.preventDefault();
              if (form.checkValidity() === true) {
                addTaskList(taskList);
                setTaskList(initialForm)
                setValidated(false)
              }else{
                setValidated(true);
              }

  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Task List Form</Modal.Title>
          <span onClick={handleClose} className='modalClose'>x</span>  
        </Modal.Header>
        <Modal.Body>
          

          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="validationCustom01">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="title"
                name="title"
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" className='mt-3'>Add List</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskListForm;
