"use client";
import { getData } from "../../server";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding-top: 60px;
  background-image: url("./wallpapers.jpg");
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

const BoxSend = styled.div`
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

const findAndCollectInfo = (array, targetItem) => {
  const startIndex = array.findIndex(
    (item) => item.msg === targetItem.msg && item.resp === targetItem.resp
  );
  if (startIndex === -1) {
    return [];
  }

  return array.slice(startIndex);
};

const wait = async (time = 2500) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}
const Chat = ({ params }) => {
  const inputRef = useRef(null);
  const [countMessege, setCountMessege] = useState(0);
  const [nameList, setNameList] = useState("question");
  const [records, setRecords] = useState({});
  const [messages, setMessages] = useState([]);

  const addSystemMessageToConversation = async ({
    userResp,
    _records,
  }) => {

    const rec = records?.list || _records?.list;
    if (!rec) {
      console.error("Records not found or list is undefined.");
      return;
    }

    const _nameList = nameList || "question";
    if (countMessege < rec[_nameList].length) {
      const systemMessage = rec[_nameList][countMessege];
      let count = countMessege;

      if (systemMessage.resp) {
        count = count + 1;
        await wait()
        setMessages((prevMessages) => [...prevMessages, systemMessage])
      } else {
        const arr = [];
        findAndCollectInfo(rec[_nameList], systemMessage).findIndex(
          (message) => {
            count = count + 1;
            arr.push(message);
            return message.resp;
          }
        );

        for (const msg of arr) {
          await wait()
          setMessages((prevMessages) => [...prevMessages, msg]);
        }
      }

      setCountMessege(count);
    } else {
      setMessages((prevMessages) => [...prevMessages, { user: 0, msg: "fim", resp: false }])
    }
  };

  const addUserMessageToConversation = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const addMessageToConversation = (e, userResp) => {
    e?.preventDefault();
    const mensagem = userResp || inputRef.current.value;

    if (!!mensagem) {
      addUserMessageToConversation({
        msg: mensagem,
        user: 1,
      });
      addSystemMessageToConversation({ userResp });
      inputRef.current.value = "";
    }
  };

  let aa = false
  useEffect(() => {
    getData(params.slug).then((resp) => {
      setRecords(resp);
      if(aa){
        addSystemMessageToConversation({ _records: resp });
      }
      aa = true
    });
  }, []);

  return (
    <div>
      {messages.map((message, i) => {
        return <div key={i}>{message.msg}</div>;
      })}
      <InputFake>
        <form onSubmit={addMessageToConversation}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Digite sua mensagem..."
            name="text"
          />
          <button type="submit">Enviar</button>
        </form>
      </InputFake>
    </div>
  );
};

export default Chat;
