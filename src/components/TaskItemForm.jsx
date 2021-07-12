import { Modal, Button,Form } from "react-bootstrap";
import { useState } from "react";

const TaskItemForm = ({ show, handleClose, addTaskItem }) => {
  const initialForm = { title: "", desc: "" };
  const [taskItem, setTaskItem] = useState();
  const [validated, setValidated] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskItem({ ...taskItem, [name]: value });
  };

  const handleSubmit=(e)=>{
    const form = e.currentTarget;
              e.preventDefault();
              if (form.checkValidity() === true) {
                addTaskItem(taskItem);
                setTaskItem(initialForm);
                setValidated(false)
              }else{
                setValidated(true);

              }

  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Task Item Form</Modal.Title>
          <span onClick={handleClose} className='modalClose'>x</span>  
        </Modal.Header>
        <Modal.Body>
         

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            <Form.Group controlId="validationCustom02">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="description"
                name="desc"
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" className="mt-3">
              Add List
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskItemForm;
