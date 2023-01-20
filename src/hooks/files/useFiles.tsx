import {
  ChangeEventHandler,
  DragEventHandler,
  MouseEventHandler,
  useRef,
  useState
} from "react";

const fileImage = new Image();
export const useFiles = (onChange: ()=> void) => {
  //область перетаскивания картинки
  const imageContainerRef = useRef<HTMLDivElement>(null);
  //ссылка на input type file (который скрыт)
  const inputFileRef = useRef<HTMLInputElement>(null);
  //Здесь хранится url на картинку blob:http://localhost:3000/78a8472f-48b2-44d2-a3cd-5bf367135e5b
  const [objectURL, setObjectURL] = useState("");
  //название выбранного файла
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  //чистка выбранного файла до
  
  const resetSelection = () => {
    fileImage.src = "";
    setSelectedFile(null);
    if (objectURL) {
      window.URL.revokeObjectURL(objectURL);
      setObjectURL("");
    }
  };
  
  //проверка пришел ли файл и такой ли он
  const handleFiles = (files: FileList | null) => {
    resetSelection();
    if (!files || files?.length === 0) return;
    const file = files[0];
    if (!file.type.includes("image/")) {
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      onChange();
      return;
    }
    setSelectedFile(file.name);
    onChange();
    const imageContainer = imageContainerRef.current;
    if (!imageContainer) return;
    //Создание Url картинки
    const objectURL = window.URL.createObjectURL(file);
    imageContainer.appendChild(fileImage);
    setObjectURL(objectURL);
  };
  
  //открытие диалога для загрузки файла
  const openDialog: MouseEventHandler<HTMLDivElement> = () => {
    const inputFile = inputFileRef.current;
    if (!inputFile) return;
    inputFile.click();
  };
  //остановка перетаскивания
  const stopDragEvent: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  //отслеживание изменения в инпуте
  const handleFileDialog: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.currentTarget.files;
    handleFiles(files);
  };
  //отслеживание отпускания перетаскиваемого файла
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
