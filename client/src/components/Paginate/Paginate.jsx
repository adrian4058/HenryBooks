import React from "react"

import s from '../Paginate/Paginate.module.css'


export default function Paginado ({booksPerPage, allBooks, paginado}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allBooks/booksPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <nav className={s.contenido}>
            <ul>
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        
                        <button className={s.botonpgn} key={number} onClick={() => paginado(number)}>{number}</button>
                        
                    ))
                }
            </ul>
        </nav>
    )
}