import {
  ChangeEventHandler,
  DragEventHandler,
  MouseEventHandler,
  useRef,
  useState
} from "react";
// import { imageDisplaySize } from "./styles";
export const imageDisplaySize = { width: 200, height: 200 };

const fileImage = new Image();
export const useHooks = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  //Здесь хранится url на картинку blob:http://localhost:3000/78a8472f-48b2-44d2-a3cd-5bf367135e5b
  const [objectURL, setObjectURL] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  // const manipulateImageSize = (url: string) => {
  //   fileImage.src = url;
  //   fileImage.onload = () => {
  //     const width = fileImage.naturalWidth;
  //     const height = fileImage.naturalHeight;
  //     const ratioWidth = width / imageDisplaySize.width;
  //     const ratioHeight = height / imageDisplaySize.height;
  //     if (ratioWidth > ratioHeight) {
  //       fileImage.width = imageDisplaySize.width;
  //       fileImage.height = height / ratioWidth;
  //     } else {
  //       fileImage.width = width / ratioHeight;
  //       fileImage.height = imageDisplaySize.height;
  //     }
  //   };
  // };
  const resetSelection = () => {
    fileImage.src = "";
    setSelectedFile(null);
    // const imageContainer = imageContainerRef.current;
    // if (imageContainer && fileImage.parentNode === imageContainer) {
    //   imageContainer.removeChild(fileImage);
    // }
    if (objectURL) {
      window.URL.revokeObjectURL(objectURL);
      setObjectURL("");
    }
  };
  const handleFiles = (files: FileList | null) => {
    resetSelection();
    if (!files || files?.length === 0) return;
    const file = files[0];
    if (!file.type.includes("image/")) {
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      return;
    }
    setSelectedFile(file.name);
    const imageContainer = imageContainerRef.current;
    if (!imageContainer) return;
    //Создание Url картинки
    const objectURL = window.URL.createObjectURL(file);
    // manipulateImageSize(objectURL);
    imageContainer.appendChild(fileImage);
    setObjectURL(objectURL);
  };
  const openDialog: MouseEventHandler<HTMLDivElement> = () => {
    const inputFile = inputFileRef.current;
    if (!inputFile) return;
    inputFile.click();
  };
  const stopDragEvent: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleFileDialog: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.currentTarget.files;
    handleFiles(files);
  };
  const handleDroppedFile: DragEventHandler<HTMLDivElement> = (event) => {
    stopDragEvent(event);
    const dataTransfer = event.dataTransfer;
    const files = dataTransfer.files;
    if (inputFileRef.current) {
      inputFileRef.current.files = files;
    }
    handleFiles(files);
  };
  return {
    handleDroppedFile,
    handleFileDialog,
    imageContainerRef,
    inputFileRef,
    openDialog,
    selectedFile,
    stopDragEvent
  };
};
