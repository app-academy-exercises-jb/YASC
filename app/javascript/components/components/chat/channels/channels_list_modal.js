import React from 'react';
import SearchIcon from 'images/search-icon'
import ReturnIcon from 'images/return-icon'

const ChannelsListModal = ({ channels, hideModal, displayModal, hideAddModal }) => (
  <div id="channels-modal">
    <div className="channels-modal-wrapper">
      <div className="channels-modal-content">
        <span>
          <h1>Browse Channels</h1>
          <form 
            onSubmit={e => {
              e.preventDefault();
              hideModal("Channels");
              displayModal("Add");
              document.addEventListener("click", hideAddModal);
            }}
            className="session-form"
          >
            <input type="submit" value="Create Channel" />
          </form>
        </span>
        <form onSubmit={e => e.preventDefault()} className="session-form">
          <input type="text" placeholder="Search Channels" />
          <img src={SearchIcon} />
        </form>
        <p>Channels you belong to</p>
        <div className="channels-modal-list">
          {Object.keys(channels).map(ws => (
            <div key={ws} className="channels-modal-item">
              <div className="modal-item-first">
                <span>
                  # <div>{channels[ws].name}</div>
                </span>
                <span>
                  Created on {new Date(Date.parse(channels[ws].created_at)).toLocaleDateString()}
                </span>
              </div>
              <div className="modal-item-second">
                <img src={ReturnIcon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div onClick={() => hideModal("Channels")}>
      <button id="exit-channels-modal-button">
        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="-255 347 100 100" aria-hidden="true"><path d="M-160.4 434.2l-37.2-37.2 37.1-37.1-7-7-37.1 37.1-37.1-37.1-7 7 37.1 37.1-37.2 37.2 7.1 7 37.1-37.2 37.2 37.2"></path>
        </svg>esc
      </button>
    </div>
  </div>
)

export default ChannelsListModal;