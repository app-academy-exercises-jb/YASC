import React from 'react';
import AddChannelFormContainer from './add_channel_form_container';

class AddChannelModal extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.formRef = React.createRef();
  }

  componentWillUnmount() {
    this.formRef.props.clearChannelErrors();
  }

  render() {
    const { hideModal, hideAddModal } = this.props;

    return (
      <div id="add-modal">
        <div className="add-modal-wrapper" ref={this.ref}>
          <div className="add-modal-content">
            <span>
              <h1>Create a channel</h1>
              <button id="exit-add-modal-button" onClick={() => {
                document.removeEventListener("click", hideAddModal);
                hideModal("Add");
              }}>
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="-255 347 100 100" aria-hidden="true"><path d="M-160.4 434.2l-37.2-37.2 37.1-37.1-7-7-37.1 37.1-37.1-37.1-7 7 37.1 37.1-37.2 37.2 7.1 7 37.1-37.2 37.2 37.2"></path>
                </svg>
              </button>
            </span>
            <p>Channels are where your team communicates. They're best when organized around a topic — #marketing, for example.</p>
            <AddChannelFormContainer ref={ref => this.formRef = ref} hideAddModal={hideAddModal} hideModal={hideModal} />
          </div>
        </div>
      </div>
    )
  }
}

export default AddChannelModal;