import React, { useState } from "react";

export function MainPage() {
  const [binaryData, setBinaryData] = useState("");
  const [base64Data, setBase64Data] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("binary");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (selectedFormat === "binary") {
        convertFileToBinary(file);
      } else {
        convertFileToBase64(file);
      }
    }
  };

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
    setBinaryData("");
    setBase64Data("");
  };

  const convertFileToBinary = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const binaryString = new Uint8Array(arrayBuffer).reduce(
        (acc, byte) => acc + byte.toString(2).padStart(8, "0"),
        ""
      );
      setBinaryData(binaryString);
    };
    reader.readAsArrayBuffer(file);
  };

  const convertFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      setBase64Data(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>File Converter</h1>
      <div>
        <label>
          <input
            type="radio"
            value="binary"
            checked={selectedFormat === "binary"}
            onChange={handleFormatChange}
          />
          Binary
        </label>
        <label>
          <input
            type="radio"
            value="base64"
            checked={selectedFormat === "base64"}
            onChange={handleFormatChange}
          />
          Base64
        </label>
      </div>
      <input type="file" onChange={handleFileChange} />
      {selectedFormat === "binary" && (
        <div>
          <h2>Binary Data:</h2>
          <textarea readOnly value={binaryData} rows="10" cols="50" />
        </div>
      )}
      {selectedFormat === "base64" && (
        <div>
          <h2>Base64 Data:</h2>
          <textarea readOnly value={base64Data} rows="10" cols="50" />
        </div>
      )}
    </div>
  );
}

export default MainPage;
