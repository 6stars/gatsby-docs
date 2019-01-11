import React from "react"

const CSSInjector = React.forwardRef((props, ref) => {
        //ref.ownerDocument.head.innerHTML += props.css
        console.log(ref);
        console.log(props)
        return (
            <React.Fragment>
                {React.Children.only(props.children)}
            </React.Fragment>
        )
    });
export default CSSInjector;