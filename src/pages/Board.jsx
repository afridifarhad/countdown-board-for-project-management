import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'; 

const initialTasks = {
  todo: {
    name: 'To Do',
    items: [],
    bgColor: 'bg-danger', 
  },
  'in-progress': {
    name: 'In Progress',
    items: [],
    bgColor: 'bg-warning',
  },
  completed: {
    name: 'Completed',
    items: [],
    bgColor: 'bg-success', 
  },
};

const Board = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedSection, setSelectedSection] = useState('todo'); // Default to "To Do"
  const [newTaskName, setNewTaskName] = useState(''); // State to store input value

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      const newTask = {
        id: `task-${Date.now()}`,
        content: newTaskName,
        section: selectedSection, // Store section for each task
      };
      setTasks((prevTasks) => ({
        ...prevTasks,
        [selectedSection]: {
          ...prevTasks[selectedSection],
          items: [...prevTasks[selectedSection].items, newTask],
        },
      }));
      setNewTaskName(''); // Clear the input after adding the task
    }
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceItems = [...tasks[source.droppableId].items];
    const [removed] = sourceItems.splice(source.index, 1);

    const destinationItems = [...tasks[destination.droppableId].items];
    destinationItems.splice(destination.index, 0, removed);

    setTasks({
      ...tasks,
      [source.droppableId]: {
        ...tasks[source.droppableId],
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...tasks[destination.droppableId],
        items: destinationItems,
      },
    });
  };

  const handleMoveTask = (taskId, targetSection) => {
    let movedTask;
    let sourceSection;

    // Find the task and its current section
    Object.entries(tasks).forEach(([sectionKey, section]) => {
      const taskIndex = section.items.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        movedTask = section.items[taskIndex];
        sourceSection = sectionKey;
        section.items.splice(taskIndex, 1);
      }
    });

    if (movedTask && sourceSection !== targetSection) {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [targetSection]: {
          ...prevTasks[targetSection],
          items: [...prevTasks[targetSection].items, movedTask],
        },
        [sourceSection]: {
          ...prevTasks[sourceSection],
          items: [...prevTasks[sourceSection].items],
        },
      }));
    }
  };

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-center">
          <Form.Select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-auto me-2"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Form.Select>
          <Form.Control
            type="text"
            placeholder="Enter a new task"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="w-auto me-2"
          />
          <Button onClick={handleAddTask} variant="primary">
            Add Task
          </Button>
        </Col>
      </Row>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Row>
          {Object.entries(tasks).map(([key, section]) => (
            <Col key={key} xs={12} md={6} lg={4} className="mb-4">
              <Card className={`p-3 ${section.bgColor}`}>
                <Card.Header as="h5">{section.name}</Card.Header>
                <Card.Body>
                  <Droppable droppableId={key}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="task-list"
                      >
                        {section.items.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2"
                              >
                                <Card bg="light" text="dark">
                                  <Card.Body>
                                    {task.content}
                                    <Form.Select
                                      size="sm"
                                      className="mt-2"
                                      onChange={(e) =>
                                        handleMoveTask(task.id, e.target.value)
                                      }
                                      value={key} // Set the current section as the default value
                                    >
                                      <option value="todo">To Do</option>
                                      <option value="in-progress">
                                        In Progress
                                      </option>
                                      <option value="completed">
                                        Completed
                                      </option>
                                    </Form.Select>
                                  </Card.Body>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </DragDropContext>
    </Container>
  );
};

export default Board;
