import { constant } from "./styles.jsx";

const style = {
  margin: constant.margin,
  float: "right",
}

export const Cpu = ({ children }) => {
  if (typeof children === 'undefined') return null;
  return (
    <span style={style}>
      <span style={ children.usage > 70 || children.loadAverage > 3 ? { color: constant.colors.red } : null }>
        處理器 <span>{children.usage}% </span>
        負載 <span>{children.loadAverage}</span>
      </span>
    </span>
  )
};
