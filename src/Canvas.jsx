import React from 'react';
import Element from "./Element";
import BulletAdder from "./BulletAdder";
import ElementPresentation from "./ElementPresentation";
import {downloadAsJson} from "./helper";

const elementen = {
    probleem: {naam: "Probleem", beschrijving: "voorbeeld", icon: "lock"},
    oplossing: {naam: "Oplossing", beschrijving: "voorbeeld", icon: "rocket"},
    belangrijksteMeetwaarden: {naam: "Belangrijkste Meetwaarden", beschrijving: "voorbeeld", icon: "chart-simple"},
    uvp: {naam: "Unieke Value Propositie", beschrijving: "voorbeeld", icon: "trophy"},
    oneerlijkVoordeel: {naam: "Oneerlijk Voordeel", beschrijving: "voorbeeld", icon: "lightbulb"},
    kanalen: {naam: "Kanalen", beschrijving: "voorbeeld", icon: "users-viewfinder"},
    klantsegment: {naam: "Klantsegment", beschrijving: "voorbeeld", icon: "users"},
    kostenstructuur: {naam: "Kostenstructuur", beschrijving: "voorbeeld", icon: "money-bill-wave"},
    omzetstromen: {naam: "Omzetstromen", beschrijving: "voorbeeld", icon: "hand-holding-dollar"},
};

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                probleem: [],
                oplossing: [],
                belangrijksteMeetwaarden: [],
                uvp: [],
                oneerlijkVoordeel: [],
                kanalen: [],
                klantsegment: [],
                kostenstructuur: [],
                omzetstromen: [],
            },
            bulletAdder: {
                id: undefined,
                naam: undefined
            },
            elementPresenter: {
                id: undefined
            }
        };
    }

    render() {
        return <div id="canvas">
            <h1 className="canvasHeader" id="canvasTitle">Startup Lean Canvas</h1>
            <div id="canvasHeaderButtons">
                <button className="canvasHeader" id="downloadbutton" type="button"
                        onClick={downloadAsJson.bind(this, "download.json", this.state.data)}><i
                    className="fa-solid fa-download"></i> Exporteer Canvas
                </button>
                <input type="file" id="canvasUpload" style={{display: "none"}} onChange={this.importCanvas.bind(this)}
                       accept="application/json"/>
                <button className="canvasHeader" id="uploadbutton" type="button" onClick={this.uploadCanvas.bind(this)}>
                    <i className="fa-solid fa-upload"></i> Importeer Bestand/Canvas
                </button>
            </div>
            {Object.entries(elementen).map((item) => {
                return <Element key={item[0]} element={item[1]} canvas={this} id={item[0]}/>
            })
            }
            <BulletAdder canvas={this}/>
            <ElementPresentation canvas={this} elementen={elementen}/>

        </div>;
    }

    uploadCanvas = (event) => {
        const canvasUpload = document.getElementById("canvasUpload");
        canvasUpload.click();
    };

    importCanvas = (event) => {
        const bestand = event.target.files[0];
        event.target.value = null;

        const filereader = new FileReader();
        filereader.readAsText(bestand, "UTF-8");

        filereader.onload = (e) => {
            const newData = JSON.parse(e.target.result);
            this.setState({
                data: newData
            });
        };
    }

}

export default Canvas;