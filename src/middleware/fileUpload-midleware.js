import multer from "multer";


const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
       cb(null, "./upload");
    },
    filename:(req, file, cb) =>{
       cb(null, Date.now() + file.originalname);
    },

});


// ImgSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
// ImgSchema.statics.imgPath = IMG_PATH;

export const   upload = multer({storage:storage});

