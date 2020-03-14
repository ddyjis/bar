const style = {
    color: "#AF5F5F"
};

export const Message = ({ msg }) => {
    if (typeof msg === 'undefined') return null;
    return <div style={style}>{msg}</div>;
};