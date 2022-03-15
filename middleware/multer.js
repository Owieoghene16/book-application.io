const fileFilter = async (req, res, next) => {
  try {
    const imageExt = req.files[0].originalname.substring(req.files[0].originalname.lastIndexOf('.'), req.files[0].originalname.length);
    const pdfExt = req.files[1].originalname.substring(req.files[1].originalname.lastIndexOf('.'), req.files[1].originalname.length);

    // Accept images only
    if (imageExt !== '.png' && imageExt !== '.jpg' && imageExt !== '.jpeg') {
      return res.status(401).json({ message: 'Only image files are allowed' });
    }

    // Accept pdf only
    if (pdfExt !== '.pdf') {
      return res.status(401).json({ message: 'Only pdf files are allowed' });
    }
    return next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export default fileFilter;
