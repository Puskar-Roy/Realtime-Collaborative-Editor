import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Editor } from "@monaco-editor/react";

interface Client {
  socketId: string;
  name: string;
  pic: string;
}

const EditorPage = () => {
  const [code, setCode] = useState<string | undefined>("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const navigate = useNavigate();
  const { roomId, clientName } = useParams();
  const { state } = useAuthContext();
  let typingTimeout: number;

  const userSocketMap: { [userId: string | number]: string } = {};

  useEffect(() => {
    const init = async () => {
      socketRef.current = io(`${import.meta.env.VITE_API}`);
      socketRef.current.on("connect_error", (err) => {
        console.error("Socket Error - ", err);
        navigate("/");
      });
      socketRef.current.on("connect_failed", (err) => {
        console.error("Socket Connection Failed - ", err);
        navigate("/");
      });
      if (socketRef.current) {
        socketRef.current.emit("join", {
          roomId,
          name: state.user?.name,
          pic: state.user?.pic,
        });

        socketRef.current.on("joined", ({ clients, name }) => {
          if (name !== clientName) {
            alert(`${name} joined the room`);
          }
          clients.forEach(
            (client: { socketId: string | number; name: string }) => {
              userSocketMap[String(client.socketId)] = client.name;
            }
          );

          setClients(clients);
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

        socketRef.current.on("typing-start", ({ userId }) => {
          setTypingUsers((prev) => {
            if (!prev.includes(userId)) {
              return [...prev, userId];
            }
            return prev;
          });
        });

        socketRef.current.on("typing-stop", ({ userId }) => {
          setTypingUsers((prev) => {
            return prev.filter((id) => id !== userId);
          });
        });

        socketRef.current.on(
          "disconnected",
          ({ name, socketId }: { socketId: string; name: string }) => {
            setClients((prev) => {
              if (prev) {
                const filteredClients = prev.filter(
                  (client) => client.socketId !== socketId
                );
                setClients(filteredClients);
                if (name) {
                  alert(`${name} left the room`);
                }
                return filteredClients;
              }
              return [];
            });
          }
        );
      }
    };
    init();
    return () => {
      socketRef.current?.disconnect();
    };
  }, [
    clientName,
    navigate,
    roomId,
    state.user,
    state.user?.name,
    state.user?.pic,
  ]);

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== code) {
      setCode(newCode);
      socketRef.current?.emit("code-change", { roomId, code: newCode });

      clearTimeout(typingTimeout);
      if (!typingUsers.includes(state.user?.id || "")) {
        socketRef.current?.emit("typing-start", {
          roomId,
          userId: state.user?.id,
        });
        setTypingUsers((prev) => [...prev, state.user?.id || ""]);
      }

      typingTimeout = setTimeout(() => {
        socketRef.current?.emit("typing-stop", {
          roomId,
          userId: state.user?.id,
        });
        setTypingUsers((prev) => prev.filter((id) => id !== state.user?.id));
      }, 1300);
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
              {clients &&
                clients.map((data) => (
                  <div
                    key={data.socketId}
                    className="flex justify-center items-center p-1 gap-3 ml-2 mb-2 rounded-full bg-indigo-100"
                  >
                    <img
                      className="h-7 w-7 rounded-full cursor-pointer"
                      src={data.pic}
                      alt="Picture"
                      title={data.name}
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
              {typingUsers.map((userId) => (
                <span key={userId} className="text-xl text-black">
                  {userId}
                  {userSocketMap[String(userId)]} is typing...
                </span>
              ))}
              <div className="h-[1px] bg-black w-[25vw]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
