import React from 'react';
import Element from "./Element";
import BulletAdder from "./BulletAdder";
import BulletRemover from './BulletRemover';
import ElementPresentation from "./ElementPresentation";
import { downloadAsJson } from "./helper";
import { elementen } from './constants.jsx'

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
      elementPresenter: {
        props: undefined
      },
      bulletModifier: {
        elementId: undefined,
        naamOfBullId: undefined
      }
    };
  }

  
  render() {
    return <div id="canvas">
      <header>
      <h1 className="canvasHeader" id="canvasTitle">Startup Lean Canvas</h1>
      <div id="canvasHeaderButtons">
        <button className="canvasHeader" id="downloadbutton" type="button"
          onClick={downloadAsJson.bind(this, "download.json", this.state.data)}><i
            className="fa-solid fa-download"></i> Exporteer Canvas
        </button>
        <input type="file" id="canvasUpload" style={{ display: "none" }} onChange={this.importCanvas.bind(this)}
          accept="application/json" />
        <button className="canvasHeader" id="uploadbutton" type="button" onClick={this.uploadCanvas.bind(this)}>
          <i className="fa-solid fa-upload"></i> Importeer Bestand/Canvas
        </button>
      </div>
        </header>
      <main>
      {Object.entries(elementen).map((item) => {
        return <Element key={item[0]} element={item[1]} canvas={this} id={item[0]} />
      })
      }
        </main>
      <BulletAdder canvas={this} />
      <BulletRemover canvas={this}/>
      <ElementPresentation canvas={this} elementen={elementen} />

    </div>;
  }

  uploadCanvas = () => {
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