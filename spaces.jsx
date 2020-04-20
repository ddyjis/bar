import { Message } from "./lib/message.jsx";
import { parse } from "./lib/parse.jsx";
import { styles, constant } from "./lib/styles.jsx";

export const command = "USER=ddyjis /usr/local/bin/yabai -m query --spaces --display 1";
export const refreshFrequency = 1000;

const style = {
    backgroundColor: styles.backgroundColor,
    color: styles.color,
    display: "inline-block",
    fontFamily: styles.fontFamily,
    fontSize: styles.fontSize,
    lineHeight: styles.lineHeight,
    opacity: styles.opacity,
    zIndex: styles.zIndex + 1,

    padding: "0 2ch",

    position: "fixed",
    top: constant.gap,
    left: 0,
}

const space = ({index, focused}) => {
    const names = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    const defaultStyle = {display: "inline", padding: "0 1ch",};
    const focusedStyle = {
        borderColor: constant.colors.primary,
        borderStyle: "solid",
        borderWidth: "0px 0px 2px",
        color: constant.colors.primary,
        display: "inline",
        padding: "0 1ch",
    }
    return <div key={index} style={focused ? focusedStyle : defaultStyle}>{names[index]}</div>
}

export const render = ({ output }) => {
    const data = parse(output);
    if (typeof data === 'undefined') {
        return (
            <div style={style}>
                <Message msg={`Cannot parse script output '${output}'`}></Message>
            </div>
        )
    }
    return <div style={style}>{
        data.map(space)
    }</div>
}