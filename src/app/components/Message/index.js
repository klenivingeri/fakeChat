import styled from "styled-components";
import Union1 from "../../../../public/Union1";
import Union2 from "../../../../public/Union2";
import Union3 from "../../../../public/Union3";
import { useEffect, useState } from "react";

const BallonContainer = styled.div`
  display: flex;
  justify-content: ${({ user }) => (user ? "flex-end" : "flex-start")};
  position: relative;
  flex-direction: ${({ option }) => (option ? "column" : "row")};
`;

const Ballon = styled.div`
  background-color: ${({ user }) => (user ? "#dcf8c6" : "#ffffff")};
  color: black;
  padding: 8px 12px;
  border-radius: 10px;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: end;
  &::after {
    content: "";
    background-color: ${({ user }) => (user ? "#dcf8c6" : "#ffffff")};
    width: 15px;
    height: 15px;
    position: absolute;
    ${({ user }) => (user ? "right: 1px;" : "left: 1px;")};
    border-radius: 5px;
    top: 9px;
    transform: ${({ user }) => (user ? "rotate(30deg)" : "rotate(60deg)")};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const CheckIcon = styled.div`
  display: flex;
  margin-left: 5px;
  justify-content: center;
  width: 30px;
`;

const Options = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  color: black;
  padding: 8px 12px;
  border-radius: 10px;
  margin: 5px;
  background-color: #ffffff;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const checked = (status) => {
  if (status == 0) {
    return <Union1 />;
  }
  if (status == 1) {
    return <Union2 />;
  }
  if (status == 2) {
    return <Union3 />;
  }
};

const Message = ({
  isUser,
  msg,
  options,
  href,
  UpdateOptions,
  enviarMensagem,
}) => {
  const initiStatus = isUser ? 0 : 2;
  const [status, setStatus] = useState(initiStatus);

  useEffect(() => {
    const waitTime = 500;
    const maxStatus = 2;

    const proximoStatus = () => {
      if (status < maxStatus && isUser) {
        setStatus(status + 1);
      }
    };

    const interval = setInterval(proximoStatus, waitTime);
    return () => clearInterval(interval);
  }, [status]);

  const answer = (option) => {
    UpdateOptions(msg);
    enviarMensagem(option);
  };
  return options ? (
    <BallonContainer user={isUser} option={1}>
      <Ballon user={isUser}>
        <p>{msg}</p>
        <CheckIcon>{checked(status)}</CheckIcon>
      </Ballon>
      {!href ? (
        <Row>
          {options.map((option, index) => (
            <Options key={index} onClick={() => answer(option)}>
              {option}
            </Options>
          ))}
        </Row>
      ) : (
        <Row>
          {options.map((option, index) => (
            <Options key={index} href={href} onClick={() => answer(option)}>
            {option}
            </Options>
          ))}
        </Row>
      )}
    </BallonContainer>
  ) : (
    <BallonContainer user={isUser}>
      <Ballon user={isUser}>
        <p>{msg}</p>
        <CheckIcon>{checked(status)}</CheckIcon>
      </Ballon>
    </BallonContainer>
  );
};

export default Message;
