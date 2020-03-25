import React from 'react';

class AdminItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }

    this.itemRef = React.createRef();
    this.triggerContent = this.props.clickHandler ? 
      this.triggerContent.bind(this, this.props.clickHandler) : 
      this.triggerContent.bind(this);
  }

  triggerContent(f, e) {
    if (this.state.expanded && this.props.onDismount) {
      this.props.onDismount();
    }
    this.setState({expanded: !this.state.expanded});
    typeof f === "function" && f(this.itemRef);
  }

  render() {
    const { title, content } = this.props;
    return(
      <div ref={this.itemRef} className="admin-page-item-wrapper">
        <div className="admin-page-item">
          <h2 onClick={this.triggerContent}>{ title }</h2>
          <button value="expand" onClick={this.triggerContent}>
            {this.state.expanded ? "close" : "expand"}
          </button>
        </div>
        {this.state.expanded && <div className="admin-page-item-content">
          {content}
        </div>}
      </div>
    )
  }
}

export default AdminItem;