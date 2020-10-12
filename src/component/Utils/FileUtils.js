// import React, { Fragment, useState } from 'react';
// import {saveAs} from 'file-saver';


export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}


// function FileUtils() {

//     const [fileData, setFileData] = useState("");
//     const [fileName, setFileName] = useState("");
//     const [fileType, setFileType] = useState("");

//     const onFileChange = (e) => {
//         console.log(e.target.files);
//         const file = e.target.files[0];
//         const fileReader = new FileReader();
//         fileReader.onloadend = () => {
//             // console.log(fileReader.result);
//             setFileData(fileReader.result);
//             setFileName(file.name);
//             setFileType(file.type);
//         }
//         fileReader.readAsDataURL(file);
//     }

//     const onButtonClick = (e) => {
//         let data = fileData.split(",")[1];
//         const blobFile = b64toBlob(data, fileType);
//         saveAs(blobFile, fileName);
//     }


//     return (
//         <Fragment>
//             <div>
//                 <input type="file" onChange={onFileChange} />
//                 <br/><br/>
//                 <button onClick={onButtonClick}>{fileName == "" ? "Default" : fileName}</button>
//             </div>

//         </Fragment>
//     )
// }
// export default FileUtils;