import { constant } from "./styles.jsx";

const style = {
  margin: constant.margin,
  float: "right",
}

export const Memory = ({ children }) => {
  if (typeof children === 'undefined') return null;
  return (
    <span style={style}>
      <span style={ children.free < 50 ? { color: constant.colors.red } : null }>
        RAM <span>{100 - children.free}%</span>
      </span>
    </span>
  )
};
