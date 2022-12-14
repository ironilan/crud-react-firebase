import React, { useEffect, useState } from "react";
import { Link} from 'react-router-dom'
import {db} from '../firebase'
import moment from 'moment'

const Logs = (props) => {

    const [logs, setLogs] = useState([]);

    const getLogs = () => {
        db.collection('logs').orderBy("fecha", "desc").onSnapshot(querySnapshot => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id: doc.id});
            });
            //console.log(docs);
            let ordenado = docs.sort((a, b) => new Date(a.fecha).getTime() > new Date(b.fecha).getTime());
            setLogs(ordenado);
        });
    }


    useEffect(() => {
        
        getLogs();
    }, []);

    


    return (
        <div className="row">
            <div className="col-md-12 mt-4 mb-2 text-center">
                <h2>Logs</h2>
                <span>(<Link to="/">Inicio</Link>)</span>
                <hr />
            </div>
           
            <div className="col-md-12 p-2">
            {logs.map(log => (
                    <div className="card card-body" key={log.id}>
                        <h4 className="m-0">{log.descripcion}</h4>
                        <p className="m-0">{moment(log.fecha).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Logs;