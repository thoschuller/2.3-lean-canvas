import React from 'react';

class Element extends React.Component {

    render() {
        const {naam, beschrijving, icon} = this.props.element;
        const id = this.props.id;
        const canvas = this.props.canvas;
        let bullets = canvas.state.data[id];
        return <div className={"canvasElement " + id}>
            <div className="canvasContent">
                <h1 className="elementIcon"><i className={"fa-solid fa-" + icon}></i></h1>
                <h3 className="elementnaam">{naam}</h3>
                <p className="beschrijving">{beschrijving}</p>
                <div className="bulletContainer">
                    <ul className="bullets">
                        {Object.entries(bullets).map((item) => {
                            return <li className="bullet" key={item[0]}>
                                {item[1]}
                                <button className='verwijderButton' type="button"
                                        onClick={this.removeBullet.bind(this, item[0], id, canvas)}>
                                    <i className="fa-solid fa-remove"></i>
                                </button>
                            </li>;
                        })
                        }
                    </ul>
                </div>

            </div>
            <button className='toevoegButton' type="button" onClick={this.setBullet.bind(this, id, naam, canvas)}>Voeg
                bullet toe <i className="fa-solid fa-plus"></i></button>
            <button className='vergrootButton' type="button" onClick={this.vergrootElement.bind(this, id, canvas)}><h2>
                <i className="fa-solid fa-maximize"></i></h2></button>
        </div>;
    }

    setBullet(id, naam, canvas) {
        const bulletDialog = document.getElementById("bulletDialog");
        let newBulletAdder = {...canvas.state.bulletAdder, id: id, naam: naam};
        canvas.setState({bulletAdder: newBulletAdder}, () => {
            bulletDialog.showModal()
        });
    }

    vergrootElement(id, canvas) {
        let newElementPresenter = {id: id};
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

    removeBullet(bulletIdString, id, canvas) {
        let bulletIdInt = parseInt(bulletIdString);
        let oldElementData = canvas.state.data[id];
        let deel1 = oldElementData.slice(0, bulletIdInt);
        let deel2 = oldElementData.slice(bulletIdInt + 1, oldElementData.length);
        let newElementData = deel1.concat(deel2);
        let newData = {...canvas.state.data, [id]: newElementData};
        canvas.setState({data: newData});
    }
}

export default Element;