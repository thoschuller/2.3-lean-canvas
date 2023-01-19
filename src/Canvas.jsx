import React from 'react';
import Element from "./Element";
import BulletAdder from "./BulletAdder";
import BulletRemover from './BulletRemover';
import ElementPresentation from "./ElementPresentation";
import {downloadAsJson} from "./helper";
import {elementen} from './constants.jsx'

/**
 * This class provides the main canvas component and stores the state with the necessary information of the bulletpoints
 *
 * @author Thomas Schuller
 * @author Rosan van der Linden
 * @author Jaimy van Hattem
 * @author Floris Buitendijk
 *
 * @author project group 2 of Medical Informatics course 2.3 (2022-2023)
 */
class Canvas extends React.Component {
  constructor(props) {
    super(props);

    //initialize the state and all arrays for storing the bulletpoints
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
      bulletModifier: { //used for determining which elements the removal/creation dialogs are for
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
          <input type="file" id="canvasUpload" style={{display: "none"}} onChange={this.importCanvas.bind(this)}
                 accept="application/json"/>
          <button className="canvasHeader" id="uploadbutton" type="button" onClick={this.uploadCanvas.bind(this)}>
            <i className="fa-solid fa-upload"></i> Importeer Bestand/Canvas
          </button>
        </div>
      </header>
      <main>
        {Object.entries(elementen).map((item) => {
          return <Element key={item[0]} element={item[1]} canvas={this} id={item[0]}/>
        })
        }
      </main>
      <BulletAdder canvas={this}/>
      <BulletRemover canvas={this}/>
      <ElementPresentation canvas={this} elementen={elementen}/>

    </div>;
  }

  uploadCanvas = () => {
    const canvasUpload = document.getElementById("canvasUpload");
    canvasUpload.click();
  };

  /**
   * imports canvas from file upload button
   * @param event
   */
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