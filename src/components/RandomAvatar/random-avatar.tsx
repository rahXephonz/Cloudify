import React from "react";
import styled from "styled-components";

type AvatarComponentProps = {
  imgUrl: string;
  altText: string;
};

const AvatarSize = styled.div`
  max-width: 100%;
`;

const AvatarImage = styled.img`
  width: 150px;
  height: 150px;
`;

const RandomAvatar: React.FC<AvatarComponentProps> = (props) => {
  return (
    <AvatarSize>
      <AvatarImage src={props.imgUrl} alt={props.altText} />
    </AvatarSize>
  );
};

export default RandomAvatar;
