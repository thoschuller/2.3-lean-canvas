import React from 'react';

class BulletAdder extends React.Component {

  render() {
    const canvas = this.props.canvas;
    return <dialog id="bulletDialog" className={canvas.state.bulletModifier["elementId"] + " bulletDialog"}
      onClose={this.closeBullet.bind(this)}>
      {/* <div className="dialogHeader"> */}
        <h3>{canvas.state.bulletModifier["naamOfBullId"]} </h3>
        <button type="button" className="closebutton" onClick={this.closeBullet.bind(this)}><h2>        <i className="fa-solid fa-close"></i></h2></button>
      {/* </div> */}
      <form onSubmit={this.addBullet.bind(this)} id="newBulletForm">
        <textarea id="newBulletText" name="newBulletText" placeholder="Nieuwe bullet" onKeyDown={this.onEnter.bind(this)} />
        <button type="submit">Toevoegen</button>
      </form>
    </dialog>
  }


  onEnter(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      document.getElementById("newBulletForm").requestSubmit();
    }
  }


  closeBullet(event) {
    document.getElementById("newBulletText").value = "";
    const bulletDialog = document.getElementById("bulletDialog");
    if (bulletDialog.show) bulletDialog.close();
    
  }

  addBullet(event) {
    const canvas = this.props.canvas;
    event.preventDefault();
    let newBulletTextarea = event.target.newBulletText;
    if(newBulletTextarea.value !== ""){
    let newElementData = canvas.state.data[canvas.state.bulletModifier.elementId].concat([newBulletTextarea.value]);
    let newData = { ...canvas.state.data, [canvas.state.bulletModifier.elementId]: newElementData };
    canvas.setState({ data: newData });
    newBulletTextarea.value = "";
    newBulletTextarea.focus();
    }
  }
}

export default BulletAdder;