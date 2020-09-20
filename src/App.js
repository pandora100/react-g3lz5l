import React from "react";
import "./style.css";

/*
useCallback will avoid unnecessary child re-renders due to something changing in the parent that is not part of the dependencies for the callback. In order to avoid child re-renders when the callback's dependencies are involved, you need to use a ref. Ref's are the hook equivalent to an instance variable.

Below I have onClickMemoized using the onClickRef which points at the current onClick (set via useEffect) so that it delegates to a version of the function that knows the current value of the state.

I also changed updateCount to use the functional update syntax so that it doesn't need to have a dependency on count.
*/
const Block = React.memo(props => {
  console.log("Rendering block: ", props.color);

  return (
    <div
      onClick={props.onBlockClick}
      style={{
        width: "200px",
        height: "100px",
        marginTop: "12px",
        backgroundColor: props.color,
        textAlign: "center"
      }}
    >
      {props.text}
    </div>
  );
});
export default function App() {
  
     const [count, setCount] = React.useState(0);
  console.log("Rendering Example. Count: ", count);

  const onClick = () => {
    console.log("I've been clicked when count was: ", count);
  };
  const onClickRef = React.useRef(onClick);
  React.useEffect(
    () => {
      // By leaving off the dependency array parameter, it means that
      // this effect will execute after every committed render, so
      // onClickRef.current will stay up-to-date.
      onClickRef.current = onClick;
    }
  );

  const onClickMemoized = React.useCallback(() => {
    onClickRef.current();
  }, []);

  const updateCount = React.useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Block
        onBlockClick={onClickMemoized}
        text={"Click me to log with empty array as input"}
        color={"orange"}
      />
      <Block
        onBlockClick={updateCount}
        text={"Click me to add to the count"}
        color={"red"}
      />
    </div>
  );
}
