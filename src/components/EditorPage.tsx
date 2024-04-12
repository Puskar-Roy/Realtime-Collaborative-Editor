import { useEffect, useRef, useState } from "react";
// import Editor from "./Editor";
import { initSocket } from "../lib/socket";
import { Socket } from "socket.io-client";
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
  // const handleCodeChange = (newCode: string | undefined) => {
  //   if (newCode !== code) {
  //     setCode(newCode);
  //   }
  // };

  const navigate = useNavigate();
  const { roomId, clientName } = useParams();
  const { state } = useAuthContext();

  useEffect(() => {
    const handleError = (e: unknown) => {
      console.log("Socket Error - ", e);
      navigate("/");
    };
    const init = async () => {
      socketRef.current = await initSocket();
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
            console.log("Why This Block Of Code Not working?");
            alert(`${name} Join The Room`);
          }
          setClient(clients);
        });

        socketRef.current.emit("code-change", {
          roomId,
          code,
        });

        socketRef.current.on("code-change", ({ code }) => {
          if (code !== null) {
            setCode(code);
          }
        });

        socketRef.current.on(
          "disconnected",
          ({ name, socketId }: { socketId: number; name: string }) => {
            window.alert(`${name} leave the room`);
            setClient((prev) => {
              if (prev) {
                return prev.filter((client) => client.socketId !== socketId);
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

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== code) {
      setCode(newCode);
      socketRef.current?.emit("code-change", { roomId, code: newCode });
    }
  };

  const [client, setClient] = useState<Client[] | null>([]);

  return (
    <div className="h-screen w-screen ">
      <div className="flex justify-center items-center gap-4">
        <div className="bg-indigo-300 w-[20%] h-screen flex justify-between py-9 items-center flex-col shadow-2xl rounded-lg">
          <div className="text-3xl text-white font-bold">
            Collaborative-Editor
          </div>
          <div className="mt-[100px] h-[70vh]">
            <div className="flex flex-wrap justify-center gap-3">
              {client &&
                client.map((data) => (
                  <div
                    key={data.socketId}
                    className="flex justify-center items-center p-3 gap-2 rounded-xl bg-indigo-100"
                  >
                    <img
                      className="h-10 w-10 rounded-full"
                      src={data.pic}
                      alt="Picture"
                    />
                    <div className="text-black text-base" key={data.socketId}>
                      {data.name}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <button className="py-2.5 px-6 rounded-lg text-sm font-medium bg-indigo-200 text-indigo-800">
              Copy Room
            </button>
            <button className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-indigo-600">
              Leave Room
            </button>
          </div>
        </div>
        <div className=" w-[70%] h-screen flex shadow-2xl rounded-2xl">
          <div className="flex justify-center items-center">
            <Editor
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height="95vh"
              width="70vw"
              defaultLanguage="javascript"
              defaultValue="// some comment"
              theme="vs-purple"
              value={code}
              onChange={handleCodeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
