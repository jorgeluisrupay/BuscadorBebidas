import React, {useContext, useState} from 'react'
import { ModalContext } from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        height: '100%',
        maxHeight: 500,
        display: 'block'
        },
        header: {
        padding: '12px 0',
        borderBottom: '1px solid darkgrey'
        },
        content: {
        padding: "12px 0",
        overflow: 'scroll'
        }
}));


export const Receta = ({receta}) => {

    //configuracion de material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    //extraer los valores del context
    const {informacion, setIdReceta, guardarReceta} = useContext(ModalContext); 
    //Muestra y formatea los ingredientes
    const mostrarIngredientes = informacion => {
        let ingredientes = [];
        for(let i=1; i < 16; i++){
            if (informacion[`strIngredient${i}`]) {
                ingredientes.push(
                    <li> {informacion[`strIngredient${i}`]} 
                         {informacion[`strMeasure${i}`]}
                    </li>
                )
            }
        }

        return ingredientes;
        
    }   

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header"> {receta.strDrink} </h2>
                <img src={receta.strDrinkThumb} alt={receta.strDrink} 
                     className="card-img-top" />
                
                <div className="card-body">
                    <button type="button" className="btn btn-block btn-primary"
                            onClick={()=> {
                                setIdReceta(receta.idDrink)
                                handleOpen();
                            }}
                    >Ver Receta</button>

                    <Modal open={open}
                           onClose={()=> {
                               setIdReceta(null)
                               guardarReceta({})
                               handleClose();
                           }}
                        >
                        <div style={modalStyle} className={classes.paper}>
                            <h2> {informacion.strDrink} </h2>
                            <h3 className="mt-4">Intrucciones</h3>
                            <p> {informacion.strInstructions} </p>
                            <img src={informacion.strDrinkThumb} className="img-fluid my-4" />
                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {mostrarIngredientes(informacion)}
                            </ul>
                        </div>
                    </Modal>
                </div>
                
            </div>
        </div>
    )
}
