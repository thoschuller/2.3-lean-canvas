import React from 'react';
import Element from "./Element";

class ElementPresentation extends React.Component {

    render() {
        const canvas = this.props.canvas;
        const elementen = this.props.elementen;
        const id = canvas.state.elementPresenter["id"];
        if (typeof id !== 'undefined') {
            return <dialog id="presentationDialog" className={id}>
                <div className="dialogHeader">
                    <button type="button" className="closebutton" onClick={this.closePresentation.bind(this)}><h2><i
                        className="fa-solid fa-minimize"></i></h2></button>
                </div>
                <Element key={id} element={elementen[id]} canvas={canvas} id={id}/>
            </dialog>
        } else {
            return <dialog id="presentationDialog" className={id}></dialog>
        }
    }

    closePresentation() {
        document.getElementById("presentationDialog").close()
    }
}

export default ElementPresentation;