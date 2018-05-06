import React from 'react';
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

    this.state = {
      modalIsOpen: true,
      isLoggedIn: false,
      valueString : "HELLO",
      shouldLogout: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.logmeout === true){
      this.setState({
        shouldLogout: true
      });
    }
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

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          style={customStyles}
          contentLabel="Login Modal"
        >

        <Auth logoutMethod={this.state.shouldLogout} parentMethod={this.closeModal} ref="auth"/>
        </Modal>
        <button onClick={this.handleLogout}>Logout</button>
        <div>alkjhsdfl;jasdlkfj;alskdkfj;aaskljdf;alsdkjf;alsdjfl;kasjdfl;aksjdf;lkajsdf;lkajsdf;lkj {String(this.state.shouldLogout)}</div>
      </div>
    );
  }
}
export default App;
