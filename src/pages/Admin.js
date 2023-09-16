import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  Box,
  Button,
  Grid,
  Alert,
  Paper,
  IconButton,
  CircularProgress,
  TextField,
  Skeleton,
  Autocomplete,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DocCategoriesModify from "../components/Associate/Admin/DatabaseModify/DocCategoriessModify";
import AddIcon from "@mui/icons-material/Add";
import Page from "../components/Page";
import DocumentIcon from "@mui/icons-material/Description";
import Sites from "./Sites";
import NPDModal from "../components/modal";
import NewSiteForm from "./forms/new.site.form";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { useDropzone } from "react-dropzone";
import { CREATE_REPORT_REQUEST, GET_REPORTS_LIST_REQUEST } from "../reducers/reports/constants";
import * as Yup from "yup";
import { useFormik } from "formik";

const Admin = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [showNewModal, setShowNewModal] = React.useState(false);
  const [showNewUploadModal, setShowNewUploadModal] = React.useState(false);
  const { createSite, auth, createReport, listProjects  } = useSelector((state) => state);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({
      type: GET_REPORTS_LIST_REQUEST,
    });
  }, [dispatch]);
  useEffect(() => {
    if (createSite.success || createReport.success) {
      handleClose();
    }
  }, [createReport.success, createSite.success]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const showModalAddNew = () => {
    setShowNewModal(true);
  };
  const showModalUploadNew = () => {
    setShowNewUploadModal(true);
  };
  const handleClose = () => {
    setShowNewModal(false);
    setShowNewUploadModal(false);
  };

  const [files, setFiles] = React.useState([]);
  const [imageUrls, setImageUrls] = React.useState({});
  const [loadingUpload, setLoadingUpload] = React.useState(false);
 

  const [selectedValueProject, setSelectedValueProject] = React.useState(null);

  
  // Handle the change event when an option is selected
  const handleAutocompleteChange = (event, newValue) => {
    setSelectedValueProject(newValue);
  };
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: [".pdf", ".doc"],
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleUploadProductImages = async () => {
    setLoadingUpload(true);
    const urls = {};
    try {
      await Promise.all(
        files.map(async (image, i) => {
          const imageRef = ref(storage, `products/${image.path}`);
          try {
            const data = await uploadBytes(imageRef, image, "data_url");
            if (data) {
              const downLoadURL = await getDownloadURL(imageRef);
              urls[`image_url_${i + 1}`] = downLoadURL;
            }
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        })
      );

      setLoadingUpload(false);
      setImageUrls(urls);
    } catch (error) {
      console.error("Error uploading images:", error);
      setLoadingUpload(false);
    }
  };

  useEffect(() => {
    // Cleanup previews when component unmounts
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
 

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").nullable(),
    description: Yup.string().required("Description is required").nullable(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        name: values.name,
        createdBy: auth && auth?.data?.id,
        status: "pending",
        updatedBy: auth && auth?.data?.id,
        link: imageUrls.image_url_1,
        description: values.description,
        projectId: selectedValueProject.value,
      };

      dispatch({
        type: CREATE_REPORT_REQUEST,
        payload: payload,
      });
      resetForm();
    },
  });

  return (
    <Page title="">
      {/* Modals to add new and upload  */}

      <NPDModal
        title={"Add New Site"}
        show={showNewModal}
        handleClose={handleClose}
      >
        <NewSiteForm />
      </NPDModal>

      <NPDModal
        title={"Upload New Doc"}
        show={showNewUploadModal}
        handleClose={handleClose}
      >
        <Grid item xs={12} lg={12} md={12}>
          <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h5">Upload Document</Typography>
              <Box
                sx={{
                  margin: "4px 0px",
                }}
              >
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>
                    Drag and drop some image file here, or click to select files{" "}
                  </p>
                  <em>
                    (1 file is the maximum number of files you can drop here)
                  </em>
                  <IconButton aria-label="delete">
                    <AddCircleOutlineIcon />
                  </IconButton>
                </div>
                {/* Render file previews */}
                <aside>
                  {files.map((file) => (
                    <p key={file.name} style={thumb}>
                      {file.name}
                    </p>
                  ))}
                </aside>
              </Box>
              {Object.keys(imageUrls).length > 0 ? (
                ""
              ) : (
                <Button
                  sx={{
                    marginTop: "2rem",
                  }}
                  variant="outlined"
                  disabled={files.length !== 1 || loadingUpload}
                  onClick={handleUploadProductImages}
                >
                  {loadingUpload ? "Uploading..." : "Upload"}
                </Button>
              )}
            </Paper>
          </Container>
        </Grid>
        <form
          onSubmit={formik.handleSubmit}
          style={
            Object.keys(imageUrls).length < 1
              ? {
                  display: "none",
                }
              : { display: "block", padding: "20px" }
          }
        >
          <Grid
            container
            sx={
              Object.keys(imageUrls).length < 1
                ? {
                    display: "none",
                  }
                : { display: "block" }
            }
          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
              <Grid item sx={12} sm={12} xl={12}>
                {listProjects && listProjects?.loading ? (
                  <Skeleton />
                ) : (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={
                      listProjects &&
                      listProjects.data &&
                      listProjects?.data.length > 0
                        ? listProjects?.data
                            .filter((pr) => pr.status === "running")
                            .map((pr) => ({
                              label: pr.name,
                              value: pr.id,
                            }))
                        : [
                            {
                              label: "Select",
                              value: "No Projects available",
                            },
                          ]
                    }
                    onChange={handleAutocompleteChange} // Handle selection change
                    value={selectedValueProject} // Set the selected value
                    renderInput={(params) => (
                      <TextField {...params} label="Select a Project" />
                    )}
                  />
                )}
              </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    InputLabelProps={{
                      shrink: true,
                      // Add red color to the label
                    }}
                    label={
                      <div>
                        Doc Name{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </div>
                    }
                    value={formik.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="description"
                    InputLabelProps={{
                      shrink: true,
                      // Add red color to the label
                    }}
                    label={
                      <div>
                        Description{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </div>
                    }
                    value={formik.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    // size="small"
                    multiline
                    rows={4}
                    placeholder="Enter Description Value"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Button
                  sx={{ width: "100%", mt: 2 }}
                  type="submit"
                  variant="contained"
                >
                  {createReport && createReport.loading ? (
                    <CircularProgress />
                  ) : (
                    "Save"
                  )}
                </Button>
              </Grid>
              {createReport &&
                !createReport?.success &&
                createReport.message && (
                  <Alert variant="filled" severity="error">
                    {createReport?.message}
                  </Alert>
                )}
            </Box>
          </Grid>
        </form>
      </NPDModal>
      {(auth && auth.data && auth.data.role === "projectmanager") ||
      (auth && auth.data && auth.data.role === "super") ||
      (auth && auth.data && auth.data.role === "sitemanager") ? (
        <Container maxWidth="lg">
          <h1>Settings</h1>
          <Card>
            <Box p={2}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{ backgroundColor: "#eef0f2" }}
                >
                  <Typography
                    sx={{ width: "33%", fontWeight: "700", flexShrink: 0 }}
                  >
                    Sites...
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid xs={12}>
                    <Box
                      sx={{
                        margin: "30px 0px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "700",
                        }}
                      >
                        All Company Sites
                      </Typography>

                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={showModalAddNew}
                      >
                        Add New Site
                      </Button>
                    </Box>
                  </Grid>
                  {createReport &&
                    createReport?.success &&
                    createReport.message && (
                      <Alert variant="filled" severity="success">
                        {createReport?.message}
                      </Alert>
                    )}
                  <Sites />
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{ backgroundColor: "#eef0f2" }}
                >
                  <Typography
                    sx={{ width: "33%", fontWeight: "700", flexShrink: 0 }}
                  >
                    Reports
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid xs={12}>
                    <Box
                      sx={{
                        margin: "30px 0px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "700",
                        }}
                      >
                        All Uploaded Reports
                      </Typography>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={showModalUploadNew}
                        startIcon={<DocumentIcon />}
                      >
                        Upload New Document
                      </Button>
                    </Box>
                  </Grid>

                  <DocCategoriesModify />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Card>
        </Container>
      ) : (
        <Box
          sx={{
            marginTop: "20px",
          }}
        >
          <Alert severity="error">
            You are not allowed to see this information
          </Alert>
        </Box>
      )}
    </Page>
  );
};

export default Admin;
