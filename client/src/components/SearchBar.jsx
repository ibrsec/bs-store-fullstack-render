 
import TextField from "@mui/material/TextField";

import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material"; 

const SearchBar = ({searchQuery, setSearchQuery}) => {
    

  const handleChange = (e) => {
      setSearchQuery(e.target.value)
    console.log(searchQuery);
    // listProducts({search:e.target.value,page:1});
  };

  return (
    <Box maxWidth={800} mx="auto" px={3} >
      <form  style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleChange}
        />
        <IconButton
        type="submit"
          aria-label="Search"
          onClick={() => console.log("Search clicked!")}
        >
          <SearchIcon />
        </IconButton>
      </form>
    </Box>
  );
};

export default SearchBar;
