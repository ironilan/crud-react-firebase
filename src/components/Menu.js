import React from "react";
import { Link} from 'react-router-dom'


const Menu = (props) => {

    return (
        <div className="row">
            <div className="col-md-12 mt-4 mb-2 text-center">
                <h2>Menu</h2>
                <hr />
            </div>
           
            <div className="col-md-12 p-2">
                <div className="d-flex">
                    <div className="card card-body text-center">
                        <Link to="/motos">Motos</Link>
                    </div>
                    <div className="card card-body text-center">
                        <Link to="logs">Logs</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;