import { constant } from "./styles.jsx";

const style = {
  margin: constant.margin,
  float: "right",
}

export const Network = ({ children }) => {
  if (typeof children === 'undefined') return null;
  const { status, ssid } = children;
  if (status === 'inactive') return <span>無線 未連接</span>
  return <span style={style}>無線 {ssid}</span>
};