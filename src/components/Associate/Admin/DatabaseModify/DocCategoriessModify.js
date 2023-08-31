/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import DocumentIcon from "@mui/icons-material/Description";
// import {
//   collection,
//   getDocs,
// } from "firebase/firestore";
// import { db } from "../../../../utils/firebase";

const DocCategoriesModify = () => {
  const [allCategories, setAllCategories] = useState();
  const getAllCategories = async () => {
    // const querySnapshot = await getDocs(collection(db, "DocumentCategories"));
    // const all = querySnapshot.docs.map((doc) => doc.data().Name);
    // setAllCategories(all);
  };
  useEffect(() => {
    const getCat = async () => {
      const data = await getAllCategories();
    };
    getCat();
  }, []);

  return (
    <Grid container direction="rows" justify="flex-start">
      <Grid item xs={12} lg={12} container spacing={2}>
        <Grid item xs={4} lg={4}>
          <Card
            variant="outlined"
            sx={{
              textAlign: "center",
            }}
          >
            <CardContent>
              <DocumentIcon fontSize="large" color="primary" />
              <Typography variant="h6">Document Name</Typography>
              <Typography variant="body2">Uploaded by: John Doe</Typography>
              <Typography variant="body2">
                Created on: August 31, 2023
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<DocumentIcon />}
              >
                Download
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4} lg={4}>
          <Card
            variant="outlined"
            sx={{
              textAlign: "center",
            }}
          >
            <CardContent>
              <DocumentIcon fontSize="large" color="primary" />
              <Typography variant="h6">Document Name</Typography>
              <Typography variant="body2">Uploaded by: John Doe</Typography>
              <Typography variant="body2">
                Created on: August 31, 2023
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<DocumentIcon />}
              >
                Download
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4} lg={4}>
          <Card
            variant="outlined"
            sx={{
              textAlign: "center",
            }}
          >
            <CardContent>
              <DocumentIcon fontSize="large" color="primary" />
              <Typography variant="h6">Document Name</Typography>
              <Typography variant="body2">Uploaded by: John Doe</Typography>
              <Typography variant="body2">
                Created on: August 31, 2023
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<DocumentIcon />}
              >
                Download
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DocCategoriesModify;
