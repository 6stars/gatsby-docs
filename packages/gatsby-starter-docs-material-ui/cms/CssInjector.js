import React from "react"

class CSSInjector extends React.Component {
  render() {
    return (
      <div
        ref={ref => {
            ref.ownerDocument.head.innerHTML += this.props.css
        }}>
        {React.Children.only(this.props.children)}
      </div>
    )
  }
}

export default CSSInjector;