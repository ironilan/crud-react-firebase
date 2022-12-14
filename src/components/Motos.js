import React, { useEffect, useState } from "react";
import { Link} from 'react-router-dom'
import MotoForm from "./MotoForm";
import {db} from '../firebase'

import Swal from 'sweetalert2'


const Motos = (props) => {

    const [motos, setMotos] = useState([]);
    const [actualId, setActualId] = useState('');

    const addOrEdit = async (linkObject) => {
        try{
            if(actualId === ''){
                await db.collection('motos').doc().set(linkObject);
                await db.collection('logs').doc().set({
                    descripcion: 'se ha creado el registro del modelo '+linkObject.modelo,
                    documento: '',
                    fecha: Date.now()
                });
                Swal.fire(
                    'Creado!',
                    'Se ha creado con éxito.',
                    'success'
                );
            }else{
                await db.collection('motos').doc(actualId).update(linkObject);
                await db.collection('logs').doc().set({
                    descripcion: 'se ha actualizado el modelo '+linkObject.modelo,
                    documento: actualId,
                    fecha: Date.now()
                });
                Swal.fire(
                    'Actualizado!',
                    'Se ha actualizado con éxito.',
                    'success'
                );
            }
        }catch(error){
            console.log(error);
        }
    }


    const onDeleteMoto = (id) => {
        //console.log(id);
        Swal.fire({
            title: '¿Estas seguro?',
            text: "¡Se va a eliminar el registro!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
          }).then(async(result) => {
            if (result.isConfirmed) {
                //consultamos el documento para obtener el nombre
                const res = await db.collection('motos').doc(id).get();
                const moto = res.data();
                //console.log(moto.data());
                await db.collection('motos').doc(id).delete();

                await db.collection('logs').doc().set({
                    descripcion: 'se ha eliminado el registro de '+moto.modelo,
                    documento: actualId,
                    fecha: Date.now()
                });

              Swal.fire(
                'Eliminado!',
                'Se ha eliminado con éxito.',
                'success'
              );
            }
          })
    }

   

    const getMotos = () => {
        db.collection('motos').onSnapshot(querySnapshot => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id: doc.id});
            });
            setMotos(docs);
        });
    }


    useEffect(() => {
        
        getMotos();
    }, []);


    


    return (
        <div className="row">
            <div className="col-md-12 mt-4 mb-2 text-center">
                <h2>MOTOS</h2>
                <span>(<Link to="/">Inicio</Link>)</span>
                <hr />
            </div>
            <div className="col-md-4 p-2">
                <MotoForm {...{addOrEdit, actualId, motos}} />
            </div>
            <div className="col-md-8 p-2">
                {motos.map(moto => (
                    <div className="card card-body" key={moto.id}>
                        <div className="d-flex justify-content-between">
                            <h4 className="m-0">{moto.modelo}</h4>
                            <div>
                                <i className="material-icons text-danger" role="button" onClick={() => onDeleteMoto(moto.id)}>close</i>
                                <i className="material-icons" role="button" onClick={() => setActualId(moto.id)}>create</i>
                            </div>
                        </div>
                        <p className="m-0">{moto.marca}</p>
                        <a href="{moto.link}" target="_blank" className="text-primary" rel="noopener noreferrer">Ir al sitio</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Motos;