import { Editor } from "@monaco-editor/react";

const EditorCode = ({
  code,
  handleCodeChange,
}: {
  code: string | undefined;
  handleCodeChange: (newCode: string) => void;
}) => {
  console.log(code);

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
        onChange={(value: string | undefined) => {
          if (value) {
            handleCodeChange(value); 
          }
        }}
      />
    </div>
  );
};

export default EditorCode;
