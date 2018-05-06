import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Auth from './Auth';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.logOut = this.logOut.bind(this);
  }


  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  logOut(){
    console.log("hello");
    this.refs.logoutReference.handleLogout();
    }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          style={customStyles}
          contentLabel="Login Modal"
        >

        <Auth parentMethod={this.closeModal} ref="logoutReference"  />
        </Modal>
        <button onClick={this.logOut}>Logout</button>
      </div>
    );
  }
}
export default App;
