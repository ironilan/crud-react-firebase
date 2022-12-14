import React, {useState, useEffect} from "react";
import { db } from "../firebase";

const MotoForm = (props) => {
    const inicialStateValues = {
        modelo: '',
        marca: '',
        link: ''
    };
    const [values, setValues] = useState(inicialStateValues);

    const handleInputChange = e => {
        
        const { name, value } = e.target;
        setValues({...values, [name]: value });
 
    }

    const handleSubmit = e => {
        e.preventDefault();
        //console.log(values);
        props.addOrEdit(values);
        setValues({...inicialStateValues});
    }

   

    const getMotoId = async (id) => {
        const doc = await db.collection('motos').doc(id).get();
        //console.log(doc.id,doc.data());
        setValues({...doc.data()});
    }

    useEffect(() => {
        if(props.actualId === ''){
            setValues({...inicialStateValues});
        }else{
            getMotoId(props.actualId);
            //console.log(props);
        }
    }, [props.actualId]);

    return (
        <div className="card card-body">
            
            <form className="" onSubmit={handleSubmit}>
                <div className="form-group input-group mb-2">
                    <div className="input-group-text bg-light">
                        <i className="material-icons">brightness_auto</i>
                    </div>
                    <input type="text" className="form-control" placeholder="Modelo" onChange={handleInputChange} name="modelo" value={values.modelo} required/>
                </div>
                <div className="form-group input-group mb-2">
                    <div className="input-group-text bg-light">
                        <i className="material-icons">branding_watermark</i>
                    </div>
                    <input type="text" className="form-control" placeholder="Marca" onChange={handleInputChange} name="marca" value={values.marca} required/>
                </div>
                <div className="form-group input-group">
                    <div className="input-group-text bg-light">
                        <i className="material-icons">insert_link</i>
                    </div>
                    <input type="text" className="form-control" placeholder="Link" onChange={handleInputChange} name="link" value={values.link} required/>
                </div>

                <button className="btn btn-primary btn-block mt-2">
                    {props.actualId === '' ? 'Guardar' : 'Actualizar'}
                    
                </button>
            </form>
        </div>
    );
}

export default MotoForm;