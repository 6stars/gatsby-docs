import React from "react"

class CSSInjector extends React.Component {
  render() {
    const iframe = document.querySelector(".nc-previewPane-frame")
    const iframeHeadElem = iframe.contentDocument.head;

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