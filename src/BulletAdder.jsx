import React from 'react';

/**
 * This component provides a dialog for adding a bulletpoint to a given canvas element
 *
 * @author Thomas Schuller
 * @author Rosan van der Linden
 * @author Jaimy van Hattem
 * @author Floris Buitendijk
 *
 * @author Medical Informatics course 2.3  project group 2
 */
class BulletAdder extends React.Component {

  render() {
    const canvas = this.props.canvas;
    return <dialog id="bulletDialog" className={canvas.state.bulletModifier["elementId"] + " bulletDialog"}
                   onClose={this.closeBullet.bind(this)}>
      {/*geef aan de hand van elementId automatisch juiste styling*/}
      <h3>{canvas.state.bulletModifier["naamOfBullId"]} </h3>
      <button type="button" className="closebutton" onClick={this.closeBullet.bind(this)}>
        <h2><i className="fa-solid fa-close"></i></h2></button>
      <form onSubmit={this.addBullet.bind(this)} id="newBulletForm">
                <textarea id="newBulletText" name="newBulletText" placeholder="Nieuwe bullet"
                          onKeyDown={this.onEnter.bind(this)}/>
        <button type="submit">Toevoegen</button>
      </form>
    </dialog>
  }

  /**
   * Creates a bullet from the text when the enter key is pressed
   * @param event
   */
  onEnter(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      document.getElementById("newBulletForm").requestSubmit();
    }
  }

  /**
   * Handles proper closure of the dialog, erasing the textarea
   * @param event
   */
  closeBullet(event) {
    document.getElementById("newBulletText").value = "";
    const bulletDialog = document.getElementById("bulletDialog");
    if (bulletDialog.show) bulletDialog.close(); //only close if still open, prevent problems with escape key

  }

  /**
   * Create and add a bullet from the text in the textarea
   * @param event
   */
  addBullet(event) {
    const canvas = this.props.canvas;
    event.preventDefault(); //stop page from reloading because of form submission
    let newBulletTextarea = event.target.newBulletText;
    if (newBulletTextarea.value !== "") {   //combine old bulletpoints with the new one and save in canvas state, only if text was entered in the field
      let newElementData = canvas.state.data[canvas.state.bulletModifier.elementId].concat([newBulletTextarea.value]);
      let newData = {...canvas.state.data, [canvas.state.bulletModifier.elementId]: newElementData};
      canvas.setState({data: newData});
      newBulletTextarea.value = "";
      newBulletTextarea.focus(); //zorg dat focus weer naar textarea gaat voor toevoegen van een nieuwe bullet
    }
  }
}

export default BulletAdder;