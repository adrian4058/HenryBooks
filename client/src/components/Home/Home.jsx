import React from 'react';
function Home (props){
    return(<div>
        <h1>Bienvenidos a HenryBooks!</h1>
        <h3>Aqui podras encontrar tus libros preferidos</h3>
        <h3>Puedes buscar por nombre o autor:</h3>
        {/* *aqui iria la searchbar* */}
     

       <label>Filtrar categoria/genero</label> 
       <select>
            <option disabled>elige categoria</option>
            <option value="terror">Terror</option>
       </select>
      <label>Orden:</label>
      <select>
          <option disabled>elige orden</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
          <option value="PD">Precio(mayor-menor)</option>
          <option value="PA">Precio(menor-mayor</option>
      </select>
    

    </div>)
}


export default Home 