import React from 'react';
import {pdf, PDFViewer} from '@react-pdf/renderer';
import JSZip from "jszip";
import {saveAs} from "file-saver";
import MyDocument from "./Document"


var zip = JSZip();

const download = () => {
    zip.generateAsync({type: "blob"}).then(function (blob) {
        saveAs(blob, "projetos.zip");
    });
};

export const generateZip = arr => {
    console.log(arr)
    if (arr.length) {
        for (const element of arr) {
            zip.file(`projeto/projeto_${element.name}.pdf`, element, {
                binary: true
            });
        }

        download();
    }
};


const downloadContract = () => {

    const buffer = pdf(<MyDocument />).toBlob();
    buffer.then((b)=>{
        const file = new File([b], "project1", {type: b.type, lastModified: 1534584790000});
                generateZip([file])
    })



}

function App() {
    return (
        <>
        <PDFViewer>
            <MyDocument />
        </PDFViewer>
        <button onClick={downloadContract}>Download</button>
        </>
    );
}

export default App;
