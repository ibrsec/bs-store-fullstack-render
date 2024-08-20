import { Box, Button } from "@mui/material";
import useCategoryServices from "../services/useCategoryServices";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CategoryModal from "./CategoryModal";
import Spinner from "./Spinner";

const AdminCategories = () => {
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState();

  const { listCategories, deleteCategory } = useCategoryServices();

  const { categories,loading } = useSelector((state) => state.category);
  console.log("categories=", categories);
  console.log(editItem);
  useEffect(() => {
    listCategories({ limit: "1000" });
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Button variant="contained" color="warning" onClick={() => setOpen(true)}>
        Create new Category
      </Button>
      <CategoryModal
        open={open}
        setOpen={setOpen}
        editItem={editItem}
        setEditItem={setEditItem}
      />
      <div>
        <Box
          my={5}
          px={2}
          display={"flex"}
          flexDirection={"column"}
          spacing={2}
          justifyContent={"center"}
        >
          {loading ? (
            <Spinner />
          ) : (
            categories?.map((item) => (
              <Box key={item?._id} display={"flex"} gap={1} alignItems={"center"}>
                <Box
                  sx={{
                    backgroundColor: "darkgoldenrod",
                    color: "bisque",
                    padding: "3px 5px",
                    borderRadius: "5px",
                    width: "150px",
                  }}
                >
                  {item?.name}
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  onClick={() => {
                    setEditItem(item);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  onClick={() => deleteCategory(item?._id)}
                >
                  Delete
                </Button>
              </Box>
            ))
          )}
        </Box>
      </div>
    </div>
  );
};

export default AdminCategories;
