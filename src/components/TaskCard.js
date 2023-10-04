import { useState } from 'react';
import styles from '../Styles/TaskCard.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TaskCard = ({ tasks, onDelete, onEdit }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editDate, setEditDate] = useState('');

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    const toggleEditModal = () => {
        setEditModalIsOpen(!editModalIsOpen);
        setEditTitle(tasks.title);
        setEditDescription(tasks.description);
        setEditDate(tasks.date);
    };

    const handleDelete = () => {
        onDelete(tasks);
        setModalIsOpen(false);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        onEdit(tasks, editTitle, editDescription, editDate);
        setEditModalIsOpen(false);
    }
    
  return (
    <div className={styles.taskCard}>
        <h2 className={styles.title}>{tasks.title}</h2>
        <p className={styles.description}>
            {tasks.description.length > 20 ? (
                <>
                    {tasks.description.slice(0,20)}
                    <span className={styles.readMore} onClick={toggleModal}>
                        ...Read More
                    </span>
                </>
            ) : (
                tasks.description
            )
            }
        </p>
        <p className={styles.date}>{tasks.date}</p>

        <div className={styles.buttonContainer}>
            <button onClick={toggleEditModal}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={toggleModal}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2>{tasks.title}</h2>
            <p>{tasks.description}</p>
            <p>{tasks.date}</p>
            <button onClick={toggleModal}>Close</button>
        </Modal>

        <Modal
            isOpen={editModalIsOpen}
            onRequestClose={toggleEditModal}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <form className={styles.submitTask} onSubmit={handleEdit}>
                <label className={styles.label}>Title</label>
                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                
                <label className={styles.label}>Description</label>
                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                
                <label className={styles.label}>Date</label>
                <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />

                <button type="submit">Save Changes</button>
            </form>
        </Modal>
    </div>
  )
}

export default TaskCard;
