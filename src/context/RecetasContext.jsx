import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const RecetasContext = createContext();
const RecetasProvider = (props) => {

    const [recetas, setRecetas] = useState([])
    const [busquedaReceta, setBuscarReceta] = useState({
        nombre: '',
        categoria: ''
    })
    const [consultar, guardarConsultar] = useState(false);

    const {nombre,categoria} = busquedaReceta;
    useEffect(() => {
        if (consultar) {
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`

                const resultado = await axios.get(url);

                setRecetas(resultado.data.drinks);
            }

            obtenerRecetas();
        }
        
        
    }, [busquedaReceta])

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                setBuscarReceta,
                guardarConsultar
            }}
        >
            {props.children}        
        </RecetasContext.Provider>
    );
}
export default RecetasProvider;