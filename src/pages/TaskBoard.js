import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from '../Styles/TaskBoard.module.css';
import TaskCard from '../components/TaskCard';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TaskBoard = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    const updatedTasks = [...tasks, { title, description, date }];
    setTasks(updatedTasks);
    setTitle('');
    setDescription('');
    setDate('');

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setModalIsOpen(false);
  }
  
  const deleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter((task) => task!==taskToDelete);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  const editTask = (taskToEdit, newTitle, newDescription, newDate) => {
    const updatedTasks = tasks.map((task) =>
      task === taskToEdit ? { title: newTitle, description: newDescription, date: newDate } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};


  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  },[]);
  
  return (
    <div>
      <Navbar />
      <button className={styles.addTaskBtn} onClick={()=>setModalIsOpen(true)}>+</button>

      <Modal 
        isOpen={modalIsOpen}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <button className={styles.closeBtn} onClick={()=>setModalIsOpen(false)}>X</button>
        <form className={styles.submitTask} onSubmit={addTask}>
          <div>
            <label className={styles.label}>
              Title:
            </label>
              <input 
                type="text" 
                placeholder='Enter Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
              />
          </div>

          <div>
            <label className={styles.label}>
              Description:
            </label>
              <textarea 
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
          </div>

          <div>
            <label className={styles.label}>
              Date:
            </label>
              <input 
                type="date" 
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
          </div>
          <button type="submit">Add</button>
        </form>
      </Modal>

      <div className={styles.renderedTask}>
      {tasks.map((task, index)=>(
          <TaskCard tasks={task} key={index} onDelete={deleteTask} onEdit={editTask} />
      ))}
      </div>
    </div>
  );
}

export default TaskBoard;