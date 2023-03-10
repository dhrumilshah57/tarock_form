import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { ToastContainer, toast } from 'react-toastify';

export const ExportData = (props:{ apiData : any, fileName:any }) => {
    const apiData=props.apiData;
    const fileName=props.fileName;
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData: any, fileName: any) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    toast.success("File Exported succesfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,});
  };

  return (
    <button className='bg-blue-300 h-10 w-20 outline-none border-2 border-blue-500' onClick={(e) => exportToCSV(apiData, fileName)}>Export</button>
  );
};