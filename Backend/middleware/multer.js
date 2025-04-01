import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("file");  // name must be same as file types


