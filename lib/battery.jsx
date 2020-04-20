import { constant } from "./styles.jsx";

const style = {
  margin: constant.margin,
  float: "right",
}

export const Battery = ({ children }) => {
  if (typeof children === 'undefined') return null;
  const { percentage, charging, remaining } = children;
  return (
    <span style={style}>
        <span style={ percentage <= 20 && charging == false ? { color: constant.colors.red } : null }>
          電池 <span>{percentage}% {charging && percentage < 100 ? `(${remaining})` : null}</span>
        </span>
    </span>
  )
};