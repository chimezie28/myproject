
interface Serializable {
    [key: string]: any;
  }
  
  export const GenericSerializer = (data: Serializable, allowedFields: string[]): Serializable => {
    const serializedData: Serializable = {};
    
    allowedFields.forEach((field) => {
      if (data[field] !== undefined) {
        serializedData[field] = data[field];
      }
    });
    
    return serializedData;
  };
  