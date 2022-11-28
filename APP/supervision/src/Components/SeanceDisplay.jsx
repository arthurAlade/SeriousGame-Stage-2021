import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import '../index.css'
import {
    Link
} from "react-router-dom";

export default class SeanceDisplay extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="square">
                <Link to={"/seance/"+this.props.id}>
                    <div className="squareHaut">
                        <p>Séance n°{this.props.id}</p>
                        <p>CM2 Angoulême</p>
                    </div>
                    <div className="squareCentral">
                        <div>{this.props.nombreEquipe} Equipes</div>
                        <div className="SeancePepper">Avec Pepper</div>
                    </div>
                    <div className={`squareBas ${this.props.color}`}>
                        <p>{this.props.seanceEtat}</p>
                    </div>
                </Link>
            </div>
        )
    }

}