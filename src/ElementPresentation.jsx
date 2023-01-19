import React from 'react';
import BulletContainer from "./BulletContainer";

/**
 * This component provides a dialog for full-screen presentation of a single canvas element
 *
 * @author Thomas Schuller
 * @author Rosan van der Linden
 * @author Jaimy van Hattem
 * @author Floris Buitendijk
 *
 * @author Medical Informatics course 2.3  project group 2
 */
class ElementPresentation extends React.Component {

  render() {
    const canvas = this.props.canvas;
    const elementen = this.props.elementen;
    const props = canvas.state.elementPresenter.props
    if (typeof props !== 'undefined') { //alleen doorgaan als er een element is gegeven om te presenteren
    const id = props.id;
      const { naam, beschrijving, icon } = elementen[id];
      return <dialog id="presentationDialog" className={id}>
        <div className="dialogHeader">
          <h1 className="elementIcon"><i className={"fa-solid fa-" + icon}></i></h1>
          <div className='titelblok'>
          <h3 className="elementnaam">{naam}</h3>
          <p className="beschrijving">{beschrijving}</p>
            </div>
          <button type="button" className="closebutton" onClick={this.closePresentation.bind(this)}><h2><i
            className="fa-solid fa-minimize"></i></h2></button>
        </div>
        <BulletContainer props={canvas.state.elementPresenter.props} />
      </dialog>
    } else {
      return <dialog id="presentationDialog"></dialog> //lege dialog om het mogelijk te maken het id te vinden in de DOM
    }
  }

  closePresentation() {
    document.getElementById("presentationDialog").close()
  }
}

export default ElementPresentation;