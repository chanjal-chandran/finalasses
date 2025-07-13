import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addData = () => {
    axios
      .post("http://localhost:3001/add", inputs)
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
        >
          <TextField
            variant="outlined"
            label="Title"
            onChange={inputHandler}
            name="title"
            value={inputs.title}
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Content"
            onChange={inputHandler}
            name="content"
            value={inputs.content}
            multiline
            rows={4}
          />
          <TextField
            variant="outlined"
            label="Image URL"
            onChange={inputHandler}
            name="img_url"
            value={inputs.img_url}
          />
          
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#9c27b0',
              '&:hover': { bgcolor: '#7b1fa2' }
            }} 
            onClick={addData}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;
