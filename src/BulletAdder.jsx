import React from 'react';

class BulletAdder extends React.Component {

    render() {
        const canvas = this.props.canvas;
        return <dialog id="bulletDialog" className={canvas.state.bulletAdder["id"]}
                       onClose={this.closeBullet.bind(this)}> //TODO: autoFocus evt met onOpen={this.focusOnTextbox.bind(this)}
            <div className="dialogHeader">
                <h3>{canvas.state.bulletAdder["naam"]} </h3>
                <button type="button" className="closebutton" onClick={this.closeBullet.bind(this)}><h2><i
                    className="fa-solid fa-close"></i></h2></button>
            </div>
            <form onSubmit={this.addBullet.bind(this)}>
                <textarea autoFocus id="newBulletText" name="newBulletText" placeholder="Nieuwe bullet"/>
                <button type="submit">Toevoegen</button>
            </form>
        </dialog>
    }

    // noinspection JSUnusedLocalSymbols
    closeBullet(event) {
        document.getElementById("newBulletText").value = "";
        const bulletDialog = document.getElementById("bulletDialog");
        if (bulletDialog.show) {
            bulletDialog.close()
        }
    }

    // noinspection JSUnusedLocalSymbols
    focusOnTextbox(event) {
        document.getElementById("newBulletText").focus();
    }

    addBullet(event) {
        const canvas = this.props.canvas;
        event.preventDefault();
        let newBulletText = event.target.newBulletText.value;
        let newElementData = canvas.state.data[canvas.state.bulletAdder.id].concat([newBulletText]);
        let newData = {...canvas.state.data, [canvas.state.bulletAdder.id]: newElementData};
        canvas.setState({data: newData});
        event.target.newBulletText.value = "";
    }
}

export default BulletAdder;