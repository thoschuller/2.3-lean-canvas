import React from 'react';

/**
 * This class provides a component containing a dialog for confirming removing bulletpoints
 *
 * @author Thomas Schuller
 * @author Rosan van der Linden
 * @author Jaimy van Hattem
 * @author Floris Buitendijk
 *
 * @author project group 2 of Medical Informatics course 2.3 (2022-2023)
 */
class BulletRemover extends React.Component {

  render() {
    const canvas = this.props.canvas;
    const bullet = canvas.state.bulletModifier;
    if (typeof bullet["elementId"] !== "undefined") {
      return <dialog id="removalDialog" className={bullet["elementId"]}>
        <h3>Bullet verwijderen</h3>
        <p>Weet je zeker dat je de bullet "{canvas.state.data[bullet["elementId"]][bullet["naamOfBullId"]]}" wilt
          verwijderen?</p>
        <button type="button" className="closebutton" onClick={this.closeDialog.bind(this)}>
          <h2><i className="fa-solid fa-close"></i></h2></button>
        <div id="verwijderknoppen">
          <button type="submit" onClick={this.removeBullet.bind(this, canvas)} id="verwijderknop">Verwijderen</button>
          <button type="button" id="annuleerknop" onClick={this.closeDialog.bind(this)}>Annuleren</button>
        </div>
      </dialog>
    } else {
      return <dialog id="removalDialog"></dialog>
    }
  }


  closeDialog() {
    document.getElementById("removalDialog").close()
  }


  /**
   * Removes the current bulletpoint from the canvas state
   * @param canvas
   */
  removeBullet(canvas) {
    let id = canvas.state.bulletModifier["elementId"];
    let bulletIdInt = parseInt(canvas.state.bulletModifier.naamOfBullId);
    let oldElementData = canvas.state.data[id];
    let deel1 = oldElementData.slice(0, bulletIdInt); //cut array in a part before and after the bulletpoint, and join them together again
    let deel2 = oldElementData.slice(bulletIdInt + 1, oldElementData.length);
    let newElementData = deel1.concat(deel2);
    let newData = {...canvas.state.data, [id]: newElementData};
    canvas.setState({data: newData});
    this.closeDialog();
  }
}

export default BulletRemover;