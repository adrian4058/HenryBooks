import "./BookCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Modal from "react-modal";
import { editBook, emptyMessage } from "../../../../../actions";

const BookCard = (props) => {
  const dispatch = useDispatch();
  const message = useSelector(state => state.message)

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openEditModal = () => {
    setModalIsOpen(true);
  }

  const closeEditModal = () => {
    setModalIsOpen(false);
    dispatch(emptyMessage());
    window.location.reload();
  }

  const [updateBook, setUpdatedBook] = useState({
    name: props.name,
    autor: props.name,
    editorial: props.editorial,
    reviews: [],
    image: props.image,
    genero: props.genre,
    stock: props.stock,
    price: props.price,
    estado: props.state,
  });

  const handleUpdateForm = (e) => {
    setUpdatedBook({
      ...updateBook,
      [e.target.name]: e.target.value
    })
  };

  const handleChangeStatus = (e) => {
    const updatedBook = {
      ...updateBook,
      estado: updateBook.estado === "activo" ? "desactivado" : "activo"
    }
    setUpdatedBook(updateBook);
    dispatch((editBook(props.id, updatedBook)))
    window.location.reload();
  }

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    if (updateBook.name === "" || updateBook.autor === "" || updateBook.editorial === "" || updateBook.genero === "" || updateBook.stock === "" || updateBook.price === "" || updateBook.image === "")
      return alert('You must complete the fields');
    dispatch((editBook(props.id, updateBook)))
  };

  return (
    <div className="Dash-BookCard" key={props.id}>
      <div className="Dash-BookCard-Content">
        <div className="Dash-BC-Info"><span>ID:</span> {props.id}</div>
        <div className="Dash-BC-Info"><span>Name:</span> {props.name}</div>
        <div className="Dash-BC-Info"><span>Author:</span> {props.author}</div>
        <div className="Dash-BC-Info"><span>Editorial:</span> {props.editorial}</div>
        <div className="Dash-BC-Info"><span>Genre:</span> {props.genre}</div>
        <div className="Dash-BC-Info"><span>Stock:</span> {props.stock}</div>
        <div className="Dash-BC-Info"><span>Price:</span> ${props.price}</div>
        <div className="Dash-BC-Info"><span>State:</span> {props.state}</div>
      </div>
      <div>
        <img className="Dash-BookCard__img" src={props.image} alt={props.name} />
      </div>
      <div className="Dash-BookCard-Options">
        <div>
          <button onClick={openEditModal}>Edit Properties</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeEditModal}
            ariaHideApp={false}
          >
            <form className="BC-CreateBooks" onSubmit={handleSubmitUpdate}>
              <div className="BC-CreateBooks-input">
                <label>Book Name: </label>
                <input
                  className="Input-CreateBooks"
                  type="text"
                  name="name"
                  value={updateBook.name}
                  onChange={handleUpdateForm}
                />
              </div>
              <div className="BC-CreateBooks-input">
                <label>Author: </label>
                <input
                  className="Input-CreateBooks"
                  type="text"
                  name="autor"
                  value={updateBook.autor}
                  onChange={handleUpdateForm}
                />
              </div>
              <div className="BC-CreateBooks-input">
                <label>Editorial: </label>
                <input
                  className="Input-CreateBooks"
                  type="text"
                  name="editorial"
                  value={updateBook.editorial}
                  onChange={handleUpdateForm}
                />
              </div>
              <div className="BC-CreateBooks-input">
                <label>Genre: </label>
                <input
                  className="Input-CreateBooks"
                  type="text"
                  name="genero"
                  value={updateBook.genero}
                  onChange={handleUpdateForm}
                />
              </div>
              <div className="BC-CreateBooks-input">
                <label>Stock: </label>
                <input
                  className="Input-CreateBooks"
                  min="0"
                  type="number"
                  name="stock"
                  value={updateBook.stock}
                  onChange={handleUpdateForm}
                />
              </div>
              <div className="BC-CreateBooks-input">
                <label>Price: </label>
                <input
                  className="Input-CreateBooks"
                  min="0"
                  type="number"
                  name="price"
                  value={updateBook.price}
                  onChange={handleUpdateForm}
                />
              </div>
              <div className="BC-CreateBooks-input">
                <label>Image: </label>
                <input
                  className="Input-CreateBooks"
                  type="text"
                  name="image"
                  value={updateBook.image}
                  onChange={handleUpdateForm}
                />
              </div>
              <input type="submit" value="Edit Book" />
              {
                message.length ? <div>Book Edited Succesfully</div> : null
              }
            </form>
          </Modal>
        </div>
        <button onClick={handleChangeStatus}>{updateBook.estado === "activo" ? "Desactivar" : "Activar"}</button>
      </div>
    </div>
  )
}







export default BookCard;