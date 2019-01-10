import React from "react"

class CSSInjector extends React.Component {
  render() {
    const iframe = document.getElementsByTagName('iframe')[0]
    const iframeHeadElem = iframe.contentDocument.head;
    iframeHeadElem.innerHTML += this.props.css;

    return React.forwardRef((props, ref) => (
      <div
        ref={ref => {
            ref.ownerDocument.head.innerHTML += props.css
        }}>
        {React.Children.only(props.children)}
      </div>
    ));
  }
}

export default CSSInjector;