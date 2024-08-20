import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField"; 
import Box from "@mui/material/Box"; 
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toastWarn } from "../helpers/toastify"; 
import useCategoryServices from "../services/useCategoryServices";
import CategoryIcon from '@mui/icons-material/Category';
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CategoryForm({open,setOpen,editItem,setEditItem}) {
  const { createCategory ,updateCategory} = useCategoryServices();

  const [name, setName] = useState(
    ""
  );
  useEffect(()=>{
    if(editItem?.name){
        
        setName(editItem?.name)
    }else{
        setName('')
    }
    // eslint-disable-next-line
  },[open])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name ) {
      toastWarn("Category name is empty!!");
      return;
    }
    console.log({name});
    if(editItem?.name){
        updateCategory(editItem?._id,{name})
    }else{
        createCategory({name});

    }
    setName("")
    setEditItem("")
    setOpen(false)
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CategoryIcon />
          </Avatar>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Category name"
              name="name"
              type="name1"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 3, mb: 2 }}
            >
              {editItem?.name ? "Update Category" :"Create category"}
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
