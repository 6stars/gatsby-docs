import React from "react"

class CSSInjector extends React.Component {
  render() {

    return React.forwardRef((props, ref) => {
        ref.ownerDocument.head.innerHTML += props.css
        console.log(ref.ownerDocument.head.innerHTML);
        return (
            <React.Fragment>
                 
                {React.Children.only(props.children)}
            </React.Fragment>
        )
    });
  }
}

export default CSSInjector;