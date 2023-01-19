import React from 'react';
import BulletContainer from './BulletContainer';
import { modifyBullet } from "./bulletHelper";

class Element extends React.Component {

  render() {
    const { naam, beschrijving, icon } = this.props.element;
    const id = this.props.id;
    const canvas = this.props.canvas;
    
    return <div className={"canvasElement " + id}>
      <div className="canvasContent">
        <div className="elementHeader">
          <h1 className="elementIcon"><i className={"fa-solid fa-" + icon}></i></h1>
          <h3 className="elementnaam">{naam}</h3>
          <p className="beschrijving">{beschrijving}</p>
          <button className='vergrootButton' type="button" onClick={this.vergrootElement.bind(this, id, canvas)}>
            <h2><i className="fa-solid fa-maximize"></i></h2>
          </button>
        </div>
        <BulletContainer props = {this.props}/>
      </div>
      <button className='toevoegButton' type="button" onClick={modifyBullet.bind(this, id, naam, canvas, true)}>Voeg bullet toe <i className="fa-solid fa-plus"></i></button>
    </div>;
  }

  vergrootElement(id, canvas) {
    let newElementPresenter = { props: this.props };
    canvas.setState({
      elementPresenter: newElementPresenter
    },
      () => {
        const presentationDialog = document.getElementById("presentationDialog");
        if (typeof presentationDialog !== "undefined") {
          presentationDialog.showModal()
        }
      });
  }

  
}

export default Element;