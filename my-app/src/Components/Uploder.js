import React from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

function Uploder() {
    const {
        getRootProps,
        getInputProps,
    } = useDropzone({
        multiple: false,
        maxSize: 100000,
        onDrop: (acceptedFiles) => {
            alert(acceptedFiles[0].name);
        }
    });

//   const acceptedFileItems = acceptedFiles.map((file) => (
//     <li key={file.path} className="text-green-500">
//       {file.path} - {file.size} bytes
//     </li>
//   ));

//   const rejectedFileItems = fileRejections.map(({ file, errors }) => (
//     <li key={file.path} className="text-red-500">
//       {file.path} - {file.size} bytes
//       <ul>
//         {errors.map((e) => (
//           <li key={e.code}>{e.message}</li>
//         ))}
//       </ul>
//     </li>
//   ));

  return (
    <div className="my-8">
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center border-dashed border-gray-800 border-2 rounded-lg p-8"
      >
        <input {...getInputProps()} />
        <FiUpload className="text-4xl mb-2 text-subMain" />
        <p className="text-dryGray">Drag your image here</p>
        <em className="text-xs text-border">only .jpg or .png</em>
      </div>
      {/* <ul>{acceptedFileItems}</ul>
      <ul>{rejectedFileItems}</ul> */}
    </div>
  );
}

export default Uploder