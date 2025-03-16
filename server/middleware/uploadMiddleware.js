import multer from "multer";

// Storage Configuration
const storage = multer.memoryStorage();  //keeps the file in memory instead of saving it

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["text/csv", "application/vnd.ms-excel", 
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file format"), false);
};

const upload = multer({ storage, fileFilter });

export default upload;
