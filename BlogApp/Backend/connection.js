const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://alen:alen@cluster0.6ya3yxe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
