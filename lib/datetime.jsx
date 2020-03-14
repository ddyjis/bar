import { constant } from "./styles.jsx";

const style = {
  margin: constant.margin,
  float: "right",
}

export const DateTime = ({ children }) => {
  if (typeof children === 'undefined') return null;
  return <span style={style}>{children}</span>;
}
