import React from "react";
import styled, { keyframes } from "styled-components";
const cube = keyframes`
    0% {
        -webkit-transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
        transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
        }
    50% {
        -webkit-transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
        transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
        }
    100% {
        -webkit-transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
        transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
        }
`;
const LoaderWrap = styled.div`
  -webkit-animation: ${cube} 2s infinite ease;
  animation: ${cube} 2s infinite ease;
  height: 40px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  width: 40px;
  div {
    background-color: rgba(255, 255, 255, 0.25);
    height: 100%;
    position: absolute;
    width: 100%;
    border: 2px solid white;
  }
  & div:nth-of-type(1) {
    -webkit-transform: translateZ(-20px) rotateY(180deg);
    transform: translateZ(-20px) rotateY(180deg);
  }
  & div:nth-of-type(2) {
    -webkit-transform: rotateY(-270deg) translateX(50%);
    transform: rotateY(-270deg) translateX(50%);
    -webkit-transform-origin: top right;
    transform-origin: top right;
  }
  & div:nth-of-type(3) {
    -webkit-transform: rotateY(270deg) translateX(-50%);
    transform: rotateY(270deg) translateX(-50%);
    -webkit-transform-origin: center left;
    transform-origin: center left;
  }
  & div:nth-of-type(4) {
    -webkit-transform: rotateX(90deg) translateY(-50%);
    transform: rotateX(90deg) translateY(-50%);
    -webkit-transform-origin: top center;
    transform-origin: top center;
  }
  & div:nth-of-type(5) {
    -webkit-transform: rotateX(-90deg) translateY(50%);
    transform: rotateX(-90deg) translateY(50%);
    -webkit-transform-origin: bottom center;
    transform-origin: bottom center;
  }
  & div:nth-of-type(6) {
    -webkit-transform: translateZ(20px);
    transform: translateZ(20px);
  }
`;
function Loader({ size }) {
  return (
    <div style={{ transform: `scale(${size})` }}>
      <LoaderWrap>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoaderWrap>
    </div>
  );
}

export default Loader;
