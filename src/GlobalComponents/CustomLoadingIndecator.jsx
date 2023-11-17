import { Spin } from "antd";
import { FaCarSide } from 'react-icons/fa';
import { LoadingIndecatorStyle } from "../utilities/styleObjects";
const CustomLoadingIndecator = ({ loading, children }) => {
  const { animation, color, divStyle, iconStyle } = LoadingIndecatorStyle;



  return (
    <Spin
      spinning={loading}
      indicator={
        <div style={divStyle}>
          <style>{animation}</style>
          <FaCarSide color={color} style={iconStyle} />
          <p style={{ color: color }}>Loading...</p>
        </div>
      }
    >
      {children}
    </Spin>
  );
};

export default CustomLoadingIndecator;
