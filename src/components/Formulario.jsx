import React, {useContext, useState} from 'react'
import { CategoriasContext } from '../context/CategoriasContext'
import { RecetasContext } from '../context/RecetasContext'

export const Formulario = () => {

    const [busqueda, setBusqueda] = useState({
        nombre: 'cafe',
        categoria: 'Cocoa'
    })
    const {categorias} = useContext(CategoriasContext);
    const {setBuscarReceta, guardarConsultar} = useContext(RecetasContext);

    
    const obtenerDatosRecetas = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }
    console.log(busqueda);
    return (
        <form className='col-md-12'
              onSubmit={e => {
                e.preventDefault();
                setBuscarReceta(busqueda);
                guardarConsultar(true)
              }}
              >
            <fieldset className="text-center">
                <legend>Buscar bebidas por Categoria o Ingrediente</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4">
                    <input type="text"
                           className="form-control"
                           name="nombre"
                           placeholder="Buscar por ingrediente"
                           onChange={obtenerDatosRecetas} />
                </div>
                <div className="col-md-4">
                    <select className="form-control"
                            name = "categoria"
                            onChange={obtenerDatosRecetas}
                    >
                        <option value="">-- Seleccione Categoria --</option>
                        {categorias.map(categoria => (
                            <option key={categoria.strCategory}
                                    value={categoria.strCategory}
                            > {categoria.strCategory} </option>
                        ) )}
                    </select>
                        
                </div>

                <div className="col-md-4">
                    <input type="submit"
                           className="btn btn-primary btn-block"
                           value='Buscar Bebida' />
                </div>

            </div>
        </form>
    )
}
