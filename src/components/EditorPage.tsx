import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Editor } from "@monaco-editor/react";

interface Client {
  socketId: number;
  name: string;
  pic: string;
}

const EditorPage = () => {
  const [code, setCode] = useState<string | undefined>("");
  const socketRef = useRef<Socket | null>(null);
  const navigate = useNavigate();
  const { roomId, clientName } = useParams();
  const { state } = useAuthContext();

  useEffect(() => {
    const handleError = (e: unknown) => {
      console.log("Socket Error - ", e);
      navigate("/");
    };
    const init = async () => {
      socketRef.current = io(`${import.meta.env.VITE_API}`);
      socketRef.current.on("connect_error", (err) => {
        handleError(err);
      });
      socketRef.current.on("connect_failed", (err) => {
        handleError(err);
      });
      if (socketRef.current) {
        socketRef.current.emit("join", {
          roomId,
          name: state.user?.name,
          pic: state.user?.pic,
        });

        socketRef.current.on("joined", ({ clients, name }) => {
          if (name !== clientName) {
            alert(`${name} Join The Room`);
          }
          setClient(clients);
          socketRef.current?.emit("send-existing-code", { roomId });
        });
        socketRef.current.on("existing-code", ({ code }) => {
          setCode(code);
        });

        socketRef.current.on("code-change", ({ code }) => {
          if (code !== null) {
            setCode(code);
          }
        });
        
        socketRef.current.on(
          "disconnected",
          ({ name, socketId }: { socketId: number; name: string }) => {
            setClient((prev) => {
              if (prev) {
                const filteredClients = prev.filter(
                  (client) => client.socketId !== socketId
                );
                setClient(filteredClients);
                if (name) {
                  window.alert(`${name} left the room`);
                }
                return filteredClients;
              }
              return null;
            });
          }
        );
      }
    };
    init();
    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off("join");
      socketRef.current?.off("disconnected");
    };
  }, [
    clientName,
    navigate,
    roomId,
    state.user,
    state.user?.name,
    state.user?.pic,
  ]);

  const [client, setClient] = useState<Client[] | null>([]);


  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== code) {
      setCode(newCode); 
      socketRef.current?.emit("code-change", { roomId, code: newCode });
    }
  };

  return (
    <div className="h-screen w-screen ">
      <div className="flex justify-center flex-col items-center gap-4">
        <div className="bg-indigo-500 h-[12vh] w-screen px-10 mx-auto flex  justify-between py-9 items-center flex-row shadow-2xl">
          <div className="text-xl sm:text-3xl text-white font-bold">
            Collaborative-Editor
          </div>
          <div className="">
            <div className="flex flex-wrap">
              {client &&
                client.map((data) => (
                  <div
                    key={data.socketId}
                    className="flex justify-center items-center p-1 gap-3 ml-2 mb-2 rounded-full bg-indigo-100"
                  >
                    <img
                      className="h-7 w-7 rounded-full"
                      src={data.pic}
                      alt="Picture"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex gap-5">
            <button className="py-2.5 px-6 h-10 rounded-lg text-sm font-medium bg-indigo-200 text-indigo-800">
              Run Code
            </button>
            <button className="py-2.5 px-6 rounded-lg text-sm font-medium bg-indigo-200 text-indigo-800">
              Copy Room
            </button>
            <button className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-indigo-600">
              Leave Room
            </button>
          </div>
        </div>
        <div className=" max-w-[100vw] h-[80vh] flex shadow-2xl rounded-2xl gap-4 flex-col sm:flex-row">
          <div className="flex justify-center items-center rounded-xl ">
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height="80vh"
              width="60vw"
              defaultLanguage="javascript"
              defaultValue="console.log('Hello Word');"
              theme="vs-purple"
              value={code}
              onChange={handleCodeChange}
            />
          </div>
          <div className="w-[30vw] h-[80vh] ">
            <div className="flex flex-col justify-between px-5 items-start gap-2">
              <h1 className="font-bold text-2xl text-indigo-500">Output</h1>
              <div className="h-[1px] bg-black w-[25vw]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
