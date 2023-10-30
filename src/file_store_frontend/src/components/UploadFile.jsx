import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { file_store_backend } from "../../../declarations/file_store_backend/index";
import "./UploadFile.css";

const UploadFile = () => {
    
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    let idCardBase64 = "";
    getBase64(selectedFile, (result) => {
      idCardBase64 = result;
      console.log("idCardBase64", idCardBase64);
      handleSaveFile(idCardBase64);
      setData(idCardBase64);
    });
  };

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("reader", reader);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const handleUpload = () => {
    if (file) {
      let idCardBase64 = "";
      getBase64(file, (result) => {
        idCardBase64 = result;
      });
    }
  };

  function handleSaveFile(idCardBase64) {
    try {
      let response = file_store_backend.saveFile(uuidv4(), idCardBase64);
      if (response) {
        alert("Upload Successfully");
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Welcome to Your Dashboard</h1>
        <div className="upload-section">
          <input
            type="file"
            // accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
          />
          <button onClick={handleUpload}>Upload</button>
        </div>
        {uploadedFiles.length > 0 && (
          <div className="uploaded-files">
            <h2>Uploaded Files:</h2>
            <ul>
              {uploadedFiles.map((uploadedFile, index) => (
                <li key={index}>{uploadedFile.name}</li>
              ))}
            </ul>
          </div>
        )}
        <embed src={data} />
      </div>
    </div>
  );
};

export default UploadFile;
