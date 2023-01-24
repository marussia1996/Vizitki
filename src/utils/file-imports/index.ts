import * as XLSX from "xlsx";

type TImportFileOptions = {
  header: "A" | number | string[]
}

const defaultHeader = ['email', 'cohort', 'name'];

const supportedTypes = ['csv', 'xlsx'];

const validateFile = (file: File):{isSuccess: boolean, error?: string} => {
  if(!file){
    return {isSuccess: false, error: 'file undefined'}
  }
  const split = file.name.split('.');
  const extension = split[split.length-1];
  
  if(!supportedTypes.includes(extension)){
    return {isSuccess: false, error: `file ${extension} extension not supported`}
  }
  
  return {isSuccess: true};
}

const importFromFile = <T>(file: File, options: TImportFileOptions = {
  header: defaultHeader
}): Promise<T[]> => {
  
  return new Promise<T[]>((resolve, reject) => {
    
    const validation = validateFile(file);
    
    if(!validation.isSuccess){
      reject(validation.error);
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      let result = new Array<T>();
      if (e.target) {
        const workbook = XLSX.read(e.target.result, {type: "binary"});
        workbook.SheetNames.forEach(sheetName => {
          const objects: T[] = XLSX.utils.sheet_to_json<T>(workbook.Sheets[sheetName], {
            raw: true,
            header: options.header
          });
          result = result.concat(objects);
        })
        resolve(result);
      }
    }
    
    reader.onerror = ()=>{
      reject(`error while reading file ${file.name}`)
    }
    
    reader.readAsBinaryString(file);
  })
}

export default importFromFile;