import React from 'react';
import {modifyBullet} from './bulletHelper.jsx';

/**
 * This class provides a component for displaying bulletpoints
 *
 * @author Thomas Schuller
 * @author Rosan van der Linden
 * @author Jaimy van Hattem
 * @author Floris Buitendijk
 *
 * @author project group 2 of Medical Informatics course 2.3 (2022-2023)
 */
class BulletContainer extends React.Component {

  render() {

    const {canvas, id} = this.props.props;
    const bullets = canvas.state.data[id]; //get bulletpoints from canvas state

    return <div className="bulletContainer">
      <ul className="bullets">
        {Object.entries(bullets).map((item) => { //display all bullets in a list
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