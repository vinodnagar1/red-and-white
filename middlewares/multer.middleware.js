import multer from "multer";
import path from 'path'
// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(process.cwd(), 'test'));
    },
    filename: (req, file, cb) => {
      cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
    }
  });
  
  // Create the multer instance
  export const upload = multer({ storage: storage });
  
  
  