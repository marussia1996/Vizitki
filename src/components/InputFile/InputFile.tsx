import React, { useRef, useState } from 'react'
import stylesInput from '../InputFile/InputFile.module.scss'
import fileIcon from '../../images/fileIcon.svg'
import { useHooks } from '../../utils/FileHooks';

export const InputFile = () => {
  const {
    handleDroppedFile,
    handleFileDialog,
    imageContainerRef,
    inputFileRef,
    openDialog,
    selectedFile,
    stopDragEvent
  } = useHooks();
  console.log(selectedFile);
  return (
    <div className={`${stylesInput.content}`}
        ref={imageContainerRef}
        onDragEnter={stopDragEvent}
        onDragOver={stopDragEvent}
        onDrop={handleDroppedFile}>
      <label className={`${stylesInput.label}`}>Увлечения, досуг, интересы</label>
      <div className={`${stylesInput.fakeInput}`} onClick={openDialog}>
        <span className={`${stylesInput.fileName}`}>{selectedFile || ''}</span>
        <input
          className={`${stylesInput.input}`}
          type="file"
          ref={inputFileRef}
          accept="image/*"
          onChange={handleFileDialog}
          />
        <div className={`${stylesInput.wrapper}`}>
          <img className={`${stylesInput.icon}`} src={fileIcon} alt='иконка файла'/>
        </div>
      </div>
      {/* <div
        ref={imageContainerRef}
        onDragEnter={stopDragEvent}
        onDragOver={stopDragEvent}
        onDrop={handleDroppedFile}
        style={{ display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '200px',
        height: '200px',
        marginTop: 10,
        border: "1px solid lightgray" }}
      >
        {selectedFile ? null : <span>ここにドロップ</span>}
      </div> */}
      <span></span>
    </div>
  )
}
