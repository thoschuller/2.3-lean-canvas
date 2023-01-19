import React from 'react';
import {modifyBullet} from './helper.jsx';

class BulletContainer extends React.Component {

  render() {
    
    const {canvas, id} = this.props.props;
    // console.log(this)
    // console.log(this.props)
    // console.log(this.props.props)
    // console.log(this.props.props.props)
    // console.log(canvas)
    
    
    const bullets = canvas.state.data[id];
    
    return <div className="bulletContainer">
          <ul className="bullets">
            {Object.entries(bullets).map((item) => {
              return <li className="bullet" key={item[0]}>
                <span className='text'>{item[1]}</span>
                <button className='verwijderButton' type="button"
                  onClick={modifyBullet.bind(this, id, item[0], canvas, false)}>
                  <i className="fa-solid fa-remove"></i>
                </button>
              </li>;
            })
            }
          </ul>
        </div>
  }  
}

export default BulletContainer;