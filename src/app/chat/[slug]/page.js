"use client";

import { getData } from "@/app/server";
import { useEffect, useState, useRef, Suspense } from "react";

import styled from "styled-components";
import Avatar from "../../components/Avatar";
import BoxName from "../.././components/BoxName";
import Smiley from "../../../../public/Smiley";
import Message from "../../components/Message";
import Send from "../../../../public/Send";
import validate from "../../utils/validate";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding-top: 60px;
  background-image: url("../../../../wallpapers.jpg");
`;

const Topo = styled.div`
  background-color: #075e54;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  padding: 10px 10px 5px 10px;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Mensagens = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const Rodape = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  padding: 10px;
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const InputMensagem = styled.input`
  height: 45px;
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  outline: none;
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputFake = styled.div`
  background-color: white;
  border-radius: 999px;
  padding: 1px 0 1px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const BoxSend = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #075e54;
  border-radius: 999px;
  width: 54px;
  height: 48px;
  padding-left: 3.5px;
  margin-left: 10px;
`;

const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const findAndCollectInfo = (array, targetItem) => {
  const startIndex = array.findIndex(
    (item) => item.msg === targetItem.msg && item.action === targetItem.action
  );
  if (startIndex === -1) {
    return [];
  }

  return array.slice(startIndex);
};

const wait = async (time = 500) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const lastMessageHasOption = (messages) => {
  const lastMessage = messages[messages.length - 1];
  return lastMessage && lastMessage.options !== undefined;
};
const Chat = ({ params }) => {
  const inputRef = useRef(null);
  const lastBallonRef = useRef(null);
  const [isWrite, setIsWrite] = useState(false);
  const [countMessege, setCountMessege] = useState(0);
  const [nameList, setNameList] = useState("start");
  const [records, setRecords] = useState({});
  const [messages, setMessages] = useState([]);
  
  const addSystemMessageToConversation = async ({ _records, userResp, mensagem }) => {
    const rec = records?.list || _records?.list;
    let _nameList = nameList || "start";
    let _countMessege = countMessege;
    if(userResp && userResp?.resp?.href){
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 0, msg: "Você vai ser redirecionado", action: false },
      ])
      await wait();
      window.location.replace(userResp.resp.href);
      return
    }

    setIsWrite((isWrite) => !isWrite);
    
    if(userResp && userResp.resp?.list){
      console.log(rec[userResp.resp?.list].length)
      _nameList = userResp?.resp?.list
      _countMessege = 0
    }

    if(userResp && userResp.phrase?.needValid){
      const nameFunc = userResp.phrase.needValid.name
      const isValid = validate[nameFunc](mensagem)
      if(!isValid){
        const message = {...userResp.phrase }
        message.msg = userResp.phrase.needValid.msg
  
        setMessages((prevMessages) => [...prevMessages, message])
        setIsWrite((isWrite) => !isWrite);
        return
      }
    }

    if (_countMessege < rec[_nameList].length) {
      const systemMessage = rec[_nameList][_countMessege];
      
      if (systemMessage.action) {
        _countMessege = _countMessege + 1;
        await wait();
        setMessages((prevMessages) => [...prevMessages, systemMessage]);
      } else {
        const arr = [];
        findAndCollectInfo(rec[_nameList], systemMessage).findIndex(
          (message) => {
            _countMessege = _countMessege + 1;
            arr.push(message);
            return message.action;
          }
        );

        for (const msg of arr) {
          await wait();
          setMessages((prevMessages) => [...prevMessages, msg]);
        }
      }

      setCountMessege(_countMessege);
      setNameList(_nameList)
      setIsWrite((isWrite) => !isWrite);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 0, msg: "Chat Encerrado", action: false },
      ]);
      setIsWrite((isWrite) => !isWrite);
    }
  };

  const addUserMessageToConversation = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const addMessageToConversation = ({ e = {}, userResp = {} } = {}) => {
    if (e.preventDefault) {
      e.preventDefault();
    }

    if (isWrite || lastMessageHasOption(messages)) {
      return;
    }

    inputRef.current.focus();
    const mensagem = userResp?.resp?.option || inputRef.current.value;

    if (mensagem.trim()) {
      addUserMessageToConversation({
        msg: mensagem,
        user: 1,
      });
      userResp.phrase = messages[messages.length-1]
      addSystemMessageToConversation({ userResp , mensagem});
      inputRef.current.value = "";
    }
  };

  const updateLastMessage = (message) => {
    delete message.options;

    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.slice(0, -1);
      return [...updatedMessages, message];
    });
  };

  let action = true;
  useEffect(() => {
    getData(params.slug).then((response) => {
      setRecords(response);
      if (action) {
        addSystemMessageToConversation({ _records: response });
      }
      action = false;
    });
  }, []);

  useEffect(() => {
    if (lastBallonRef.current) {
      lastBallonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Suspense>
      <Container>
        <Topo>
          <Description>
            <Avatar img={records?.image} />
            <BoxName name={records?.name} isWrite={isWrite} />
          </Description>
          <div>||</div>
        </Topo>
        <Mensagens>
          {messages.map((message, i) => {
            return (
              <Message
                key={i}
                isUser={message.user}
                msg={message.msg}
                options={message.options}
                send={message.send}
                message={message}
                updateLastMessage={updateLastMessage}
                addMessageToConversation={addMessageToConversation}
              />
            );
          })}
          <div ref={lastBallonRef} />
        </Mensagens>
        <Rodape>
          <Form onSubmit={(e) => addMessageToConversation({ e })}>
            <InputFake>
              <Smiley />
              <InputMensagem
                ref={inputRef}
                type="text"
                placeholder="Digite sua mensagem..."
                name="text"
              />
            </InputFake>
            <BoxSend type="submit">
              <Send />
            </BoxSend>
          </Form>
        </Rodape>
      </Container>
    </Suspense>
  );
};

export default Chat;
