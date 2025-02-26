const express = require("express");
const cors = require("cors");
const videoRoutes = require("./routes/videoRoutes");
const { cloudinaryConnect } = require("./config/cloudinary");

require("dotenv").config();


cloudinaryConnect();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
