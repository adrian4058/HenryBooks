import React,{useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getBookDetail, cleanDetail }from '../../actions/index'

function Details (props){
    const {id} = useParams()
    const details = useSelector(state=> state.detail)
    const dispatch = useDispatch()
    useEffect(()=>{
     dispatch(getBookDetail(id))
     return ()=> dispatch(cleanDetail()) },[])


 return (<div>
     {details.name ? <h1>{details.name}</h1>: <h1>Loading</h1>}
    {details.image && <img src={details.image} alt="imagen-libro"/>}
    {details.autor && <h4>{details.autor}</h4>}
    {details.editorial && <h4>Editorial: </h4>}
    {details.editorial && <p>{details.editorial}</p>}
    {details.genero && <h4>Genero: {details.genero}</h4> }
    {details.price  && <h4>Precio: {details.price}</h4> }


       </div>)

}