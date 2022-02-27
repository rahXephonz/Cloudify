import styled from "styled-components";
import React from "react";

type ButtonProps = {
  background: string;
};

type ButtonComponentProps = {
  imageProvider: string;
  altText: string;
  providerName: string;
  backgroundColor: string;
  onClick: (e: any) => void;
};

const ButtonWrapper = styled.div`
  max-width: 100%;
`;

const ImageProvider = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 6px;
`;

const ButtonProvider = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  line-height: 0;
  margin: 15px 0px 0px;
  width: 19rem;
  outline: none;
  border: none;
  background: ${(props) => props.background};
  color: white;
  font-weight: 500;
  border-radius: 3px;
  cursor: pointer;
  @media screen and (max-width: 428px) {
    width: 101%;
  }
`;

const ButtonLogin: React.FC<ButtonComponentProps> = (props) => {
  return (
    <ButtonWrapper>
      <ButtonProvider
        background={props.backgroundColor}
        onClick={props.onClick}
      >
        <ImageProvider src={props.imageProvider} alt={props.altText} />
        Continue with {props.providerName}
      </ButtonProvider>
    </ButtonWrapper>
  );
};

export default ButtonLogin;
