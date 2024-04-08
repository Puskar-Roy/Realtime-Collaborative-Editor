import { Editor } from "@monaco-editor/react";
import { useState } from "react";
const EditorCode = () => {
    // const editorRef = useRef();
  const [code, setCode] = useState<string | undefined>("");

  return (
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
        onChange={(value) => {
          setCode(value);
        }}
      />
    </div>
  );
};

export default EditorCode;
