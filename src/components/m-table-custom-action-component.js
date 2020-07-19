import * as React from "react";

export const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  return (
    <div {...props} ref={ref}>
      {props.children}
    </div>
  );
});
