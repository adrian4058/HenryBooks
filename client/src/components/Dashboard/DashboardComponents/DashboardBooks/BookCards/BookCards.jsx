import BookCard from "../BookCard/BookCard";
import { getAllBooksDashboard } from "../../../../../actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBook, emptyMessage } from "../../../../../actions";
import Modal from "react-modal";
import "./BookCards.css";

const BookCards = () => {

  const dispatch = useDispatch();
  const allBooks = useSelector(state => state.allBooksDashboard)

  useEffect(() => {
    dispatch(getAllBooksDashboard())
  }, [dispatch])

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
    dispatch(emptyMessage());
    window.location.reload();
  }

  return (

    <div className="BookCards">
      <div>
        <button className="create-btn" onClick={openModal}>Create New Book</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
        >
          <FormCreateBook />
        </Modal>
      </div>
      <div className="Dash-BookCards">
        {
          allBooks.map(elem =>
            <div className="Dash-BookCards-Container" key={elem.id}>
              <BookCard
                genre={elem.genero}
                editorial={elem.editorial}
                stock={elem.stock}
                state={elem.estado}
                author={elem.Autor.nombre}
                image={elem.image}
                name={elem.name}
                id={elem.id}
                price={elem.price} />
            </div>)}
      </div>
    </div>
  )
}


const FormCreateBook = () => {
  const message = useSelector(state => state.message)
  const dispatch = useDispatch();
  const [book, setBook] = useState({
    name: "",
    autor: "",
    editorial: "",
    reviews: [],
    genero: "",
    stock: "",
    price: "",
    image: "",
  });

  const handleForm = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitCreate = (e) => {
    e.preventDefault();
    if (book.name === "" || book.autor === "" || book.editorial === "" || book.genero === "" || book.stock === "" || book.price === "" || book.image === "")
      return alert('You must complete the fields');
    dispatch(addNewBook(book));
    setBook({
      name: "",
      autor: "",
      editorial: "",
      reviews: [],
      genero: "",
      stock: "",
      price: "",
      image: "",
    })
  };

  return (
    <form className="BC-CreateBooks" onSubmit={handleSubmitCreate}>
      <div className="BC-CreateBooks-input">
        <label>Book Name: </label>
        <input
          className="Input-CreateBooks"
          type="text"
          name="name"
          value={book.name}
          onChange={handleForm}
        />
      </div>
      <div className="BC-CreateBooks-input">
        <label>Author: </label>
        <input
          className="Input-CreateBooks"
          type="text"
          name="autor"
          value={book.autor}
          onChange={handleForm}
        />
      </div>
      <div className="BC-CreateBooks-input">
        <label>Editorial: </label>
        <input
          className="Input-CreateBooks"
          type="text"
          name="editorial"
          value={book.editorial}
          onChange={handleForm}
        />
      </div>
      <div className="BC-CreateBooks-input">
        <label>Genre: </label>
        <input
          className="Input-CreateBooks"
          type="text"
          name="genero"
          value={book.genero}
          onChange={handleForm}
        />
      </div>
      <div className="BC-CreateBooks-input">
        <label>Stock: </label>
        <input
          className="Input-CreateBooks"
          min="0"
          type="number"
          name="stock"
          value={book.stock}
          onChange={handleForm}
        />
      </div>
      <div className="BC-CreateBooks-input">
        <label>Price: </label>
        <input
          className="Input-CreateBooks"
          min="0"
          type="number"
          name="price"
          value={book.price}
          onChange={handleForm}
        />
      </div>
      <div className="BC-CreateBooks-input">
        <label>Image: </label>
        <input
          className="Input-CreateBooks"
          type="text"
          name="image"
          value={book.image}
          onChange={handleForm}
        />
      </div>
      <input type="submit" value="Crear Nuevo Libro" />
      {
        message.length ? <div>Book Created Succesfully</div> : null
      }
    </form>
  )
}

export default BookCards;