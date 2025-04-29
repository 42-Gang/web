import React from "react";
import styled from "styled-components";

const Line = styled.hr`
  width: 112%;
  border: none;
  border-top: 2px solid #aaa;
  margin: 0.1px 0;
  opacity: 0.5;
  transform: translateX(-5%);
`;

const Divider: React.FC = () => {
  return <Line />;
};

export default Divider;
