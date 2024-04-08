// import { useState } from "react";
import Editor from "./Editor";

interface Client {
  socketId: number;
  name: string;
  pic: string;
}

const EditorPage = () => {
    const client: Client[] = [
      {
        socketId: 1,
        name: "Puskar Roy",
        pic: "https://avatars.githubusercontent.com/u/113108193?v=4",
      },
      {
        socketId: 2,
        name: "Puskar",
        pic: "https://avatars.githubusercontent.com/u/113108193?v=4",
      },
      {
        socketId: 3,
        name: "Puskar",
        pic: "https://avatars.githubusercontent.com/u/113108193?v=4",
      },
      {
        socketId: 4,
        name: "Puskar Roy",
        pic: "https://avatars.githubusercontent.com/u/113108193?v=4",
      },
      {
        socketId: 5,
        name: "Puskar",
        pic: "https://avatars.githubusercontent.com/u/113108193?v=4",
      },
    ];
//   const [client, setClient] = useState<Client[]>([
//     {
//       socketId: 1,
//       name: "Puskar Roy",
//       pic: "https://avatars.githubusercontent.com/u/113108193?v=4",
//     },
//     {
//       socketId: 2,
//       name: "Puskar",
//       pic: "https://avatars.githubusercontent.com/u/113108193?v=4",
//     },
//     {
//       socketId: 3,
//       name: "Puskar",
//       pic: "https://avatars.githubusercontent.com/u/113108193?v=4",
//     },
//     {
//       socketId: 4,
//       name: "Puskar Roy",
//       pic: "https://avatars.githubusercontent.com/u/113108193?v=4",
//     },
//     {
//       socketId: 5,
//       name: "Puskar",
//       pic: "https://avatars.githubusercontent.com/u/113108193?v=4",
//     },
//   ]);

  return (
    <div className="h-screen w-screen ">
      <div className="flex justify-center items-center gap-4">
        <div className="bg-indigo-300 w-[20%] h-screen flex justify-between py-9 items-center flex-col shadow-2xl rounded-lg">
          <div className="text-3xl text-white font-bold">
            Collaborative-Editor
          </div>
          <div className="mt-[100px] h-[70vh]">
            <div className="flex flex-wrap justify-center gap-3">
              {client.map((data) => (
                <div className="flex justify-center items-center p-3 gap-2 rounded-xl bg-indigo-100">
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
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
