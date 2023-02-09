import "./BookCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import FormData from "form-data";
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

  }

  const [file, setFile] = useState(null)

  const [updateBook, setUpdatedBook] = useState({
    name: props.name,
    autor: props.author,
    editorial: props.editorial,
    reviews: [],
    genero: props.genre,
    stock: props.stock,
    price: props.price,
    estado: props.state,
  });

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  }

  const handleUpdateForm = (e) => {
    setUpdatedBook({
      ...updateBook,
      [e.target.name]: e.target.value
    })
  };

  const handleChangeStatus = (e) => {
    e.preventDefault();
    let updatedBooks = {
      ...updateBook,
      estado: updateBook.estado === "activo" ? "desactivado" : "activo"
    }
    setUpdatedBook(updatedBooks);
    dispatch((editBook(props.id, updatedBooks)))
    // window.location.reload();
  }

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    if (updateBook.name === "" || updateBook.autor === "" || updateBook.editorial === "" || updateBook.genero === "" || updateBook.stock === "" || updateBook.price === "")
      return alert('You must complete the fields');
    const formData = new FormData();
    console.log(file);
    if (file){
      formData.append('image', file)
    }else{
      formData.append('image',props.image)
    }
    formData.append('name', updateBook.name);
    formData.append('autor', updateBook.autor);
    formData.append('editorial', updateBook.editorial);
    formData.append('genero', updateBook.genero);
    formData.append('stock', updateBook.stock);
    formData.append('price', updateBook.price);
    formData.append('estado', updateBook.estado);
    dispatch((editBook(props.id, formData)))
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
          <button className="edit-btn" onClick={openEditModal}>Edit Properties</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeEditModal}
            ariaHideApp={false}
            className="modal-form"
          >
            <form className="BC-CreateBooks" onSubmit={(e)=>handleSubmitUpdate(e)}>
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
                  type="file"
                  name="image"
                  onChange={handleFileUpload}
                />
              </div>
              <img className="image-form" src={props.image} alt="image" />
              {/* {
                file==null?(null):(<img className="image-form" src={file} alt="image2" />)
              } */}
              {/* <img className="image-form" src={file} alt="image2" /> */}
              <input className="input-btn-dash-form" type="submit" value="Edit Book" />
              {
                message.length ? <div>Book Edited Succesfully</div> : null
              }
            </form>
          </Modal>
        </div>
        <button className="status-btn" onClick={(e)=>handleChangeStatus(e)}>{updateBook.estado === "activo" ? "Desactive" : "Active"}</button>
      </div>
    </div>
  )
}







export default BookCard;