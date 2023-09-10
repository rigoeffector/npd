/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { GET_SITES_LIST_REQUEST } from "../../reducers/sites/constants";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import {
  Container,
  FormControl,
  MenuItem,
  TextField,
  Grid,
  Card,
  Typography,
  Step,
  Stepper,
  StepLabel,
  Button,
  CircularProgress,
  Paper,
  Box,
  IconButton,
  Alert,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Page from "../Page";
import FileUploadForm from "../../pages/forms/upload.document";
import { storage } from "../../firebase";
import { CREATE_EMPLOYEE_REQUEST } from "../../reducers/employees/constants";

export default function NewAssociate() {
  const dispatch = useDispatch();
  const stepLabels = ["Personal details", "Emergency contact", "Documents"];

  const { listSites, createEmployee } = useSelector((state) => state);
  useEffect(() => {
    // Dispatch the action to fetch data when the component mounts
    dispatch({
      type: GET_SITES_LIST_REQUEST,
    });
  }, [dispatch]);
  const [newAssociate, setNewAssociate] = useState({
    emphone: "",
    emfname: "",
    emlname: "",
    emrelation: "",
    doclink: "",
    fname: "",
    lname: "",
    idnumber: "",
    phonenumber: "",
    salary: "",
    role: "",
    dob: "",
    siteId: "",
    startdate: new Date(),
    age: "",
  });
  const history = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = async (formData) => {
    const data = {
      ...newAssociate,
      username: newAssociate.emfname + "234@gmail.com",
      doclink: formData.image_url_1,
    };
    dispatch({
      type: CREATE_EMPLOYEE_REQUEST,
      payload: data,
    });
  };

  const handleNextStep = (newData, final = false) => {
    debugger;
    setCurrentStep((prev) => prev + 1);
    setNewAssociate((prev) => ({
      ...prev,
      ...newData,
    }));

    if (final) {
      // This is where you can make the final request or perform any necessary actions.
      // For now, let's just log the data.
      console.log("Final data:", { ...newAssociate, ...newData });
    }
  };

  const handlePrevStep = (newData) => {
    setNewAssociate((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    listSites && !listSites?.loading && (
      <StepOneEmployee
        next={handleNextStep}
        data={newAssociate}
        setNew={setNewAssociate}
        listSites={listSites && listSites?.data}
      />
    ),
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={newAssociate} />,
    <StepThree
      data={newAssociate}
      prev={handlePrevStep}
      makeRequest={makeRequest}
    />,
  ];

  return (
    <Page title="NPD - New eMPLOYEE">
      <Container>
        <Typography variant="h4" sx={{ pb: 1 }}>
          Add new Employee
        </Typography>
        {currentStep === 0 && (
          <Button
            variant="outlined"
            onClick={() => history("/dashboard/associates")}
            size="medium"
          >
            Back
          </Button>
        )}
        {listSites && !listSites?.loading ? (
          <Card sx={{ mt: 2, padding: "3rem" }}>
            <Stepper
              activeStep={currentStep}
              alternativeLabel
              sx={{ pt: 3, pb: 2 }}
            >
              {stepLabels.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {steps[currentStep]}
          </Card>
        ) : (
          <CircularProgress />
        )}
      </Container>
    </Page>
  );
}

const StepOneEmployee = ({ next, listSites, data, setNew }) => {
  const [listSitesdata, setListSitesData] = useState([]);

  useEffect(() => {
    debugger;
    if (listSites) {
      setListSitesData(listSites);
    }
    // You can safely use listSites here after it's loaded.
  }, [listSites]);

  const stepOneValidationSchema = Yup.object({
    fname: Yup.string().required("First Name is required").label(),
    lname: Yup.string().required("Last Name is required ").label(),
    role: Yup.string().required("Role is required").nullable(),
    gender: Yup.string().required("Gender is required").nullable(),
    age: Yup.string().required("Age is required").nullable(),
    phonenumber: Yup.string().required("Phone Number").nullable(),
    idnumber: Yup.string().required("ID Number").nullable(),
    siteId: Yup.string().required("Site Name is required").nullable(),
    startdate: Yup.date().required("Start Date is required"),
    dob: Yup.date().required("DOB is required"),
    salary: Yup.date().required("Salary is required"),
  });

  const StyledDateTextField = styled(TextField)({
    width: "100%",
    height: "50px", // Set the width to 100%
    '& input[type="date"]': {
      padding: "10px",
      height: "30px", // You can adjust the padding as needed
    },
  });
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      idnumber: "",
      phonenumber: "",
      salary: "",
      role: "",
      dob: "",
      siteId: "",
      startdate: "",
      age: "",
      gender: "",
    },
    validationSchema: stepOneValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        fname: values.fname,
        lname: values.lname,
        idnumber: values.idnumber,
        phonenumber: values.phonenumber,
        salary: values.salary,
        role: values.role,
        dob: values.dob,
        siteId: values.siteId,
        gender: values.gender,
        startdate: moment(values.startdate).format("YYYY/MM/DD"),
        age: values.age,
      };

      next(payload, true);

      console.log(payload);

      // dispatch({ type: CREATE_INVOICE_REQUEST, payload });
      // resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        sx={{ p: 3, pb: 2, pt: 6 }}
        container
        columnSpacing={2}
        rowSpacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item sx={4} sm={4} xl={4}>
          <TextField
            fullWidth
            name="fname"
            InputLabelProps={{
              shrink: true,
              // Add red color to the label
            }}
            label={
              <div>
                First Name{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
            }
            value={formik.fname}
            onChange={formik.handleChange}
            error={formik.touched.fname && Boolean(formik.errors.fname)}
            helperText={formik.touched.fname && formik.errors.fname}
          />
        </Grid>
        <Grid item sx={4} sm={4} xl={4}>
          <TextField
            fullWidth
            name="lname"
            InputLabelProps={{
              shrink: true,
              // Add red color to the label
            }}
            label={
              <div>
                Last Name{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
            }
            value={formik.lname}
            onChange={formik.handleChange}
            error={formik.touched.lname && Boolean(formik.errors.lname)}
            helperText={formik.touched.lname && formik.errors.lname}
          />
        </Grid>
        <Grid item sx={4} sm={4} xl={4}>
          <TextField
            fullWidth
            name="idnumber"
            InputLabelProps={{
              shrink: true,
              // Add red color to the label
            }}
            label={
              <div>
                ID Number{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
            }
            value={formik.idnumber}
            onChange={formik.handleChange}
            error={formik.touched.idnumber && Boolean(formik.errors.idnumber)}
            helperText={formik.touched.idnumber && formik.errors.idnumber}
          />
        </Grid>
        <Grid item sx={4} sm={4} xl={4}>
          <TextField
            fullWidth
            name="phonenumber"
            InputLabelProps={{
              shrink: true,
              // Add red color to the label
            }}
            label={
              <div>
                Phone Number{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
            }
            value={formik.phonenumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phonenumber && Boolean(formik.errors.phonenumber)
            }
            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
          />
        </Grid>
        <Grid item sx={4} sm={4} xl={4}>
          <TextField
            fullWidth
            name="age"
            InputLabelProps={{
              shrink: true,
              // Add red color to the label
            }}
            label={
              <div>
                Age <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
            }
            value={formik.age}
            onChange={formik.handleChange}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
        </Grid>
        <Grid item sx={4} sm={4} xl={4}>
          <TextField
            fullWidth
            name="salary"
            InputLabelProps={{
              shrink: true,
              // Add red color to the label
            }}
            label={
              <div>
                Salary <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
            }
            value={formik.salary}
            onChange={formik.handleChange}
            error={formik.touched.salary && Boolean(formik.errors.salary)}
            helperText={formik.touched.salary && formik.errors.salary}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">RWF</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item sx={4} sm={4} xl={4}>
          <FormControl fullWidth>
            <TextField
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              InputLabelProps={{
                shrink: true,
                // Add red color to the label
              }}
              label={
                <div>
                  Gender{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </div>
              }
              name="gender"
              select
              value={formik.values.gender}
              onChange={formik.handleChange}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            >
              <MenuItem key={1} value="Female">
                Female
              </MenuItem>
              <MenuItem key={2} value="Male">
                Male
              </MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        <Grid item sx={4} sm={4} xl={4}>
          {listSitesdata && listSitesdata.length > 0 && (
            <FormControl fullWidth>
              <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="siteId"
                select
                InputLabelProps={{
                  shrink: true,
                  // Add red color to the label
                }}
                label={
                  <div>
                    Site Name{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </div>
                }
                value={formik.values.siteId}
                onChange={formik.handleChange}
                error={formik.touched.siteId && Boolean(formik.errors.siteId)}
                helperText={formik.touched.siteId && formik.errors.siteId}
              >
                {listSites && listSites.length > 0 ? (
                  listSites.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))
                ) : (
                  <p>No sites found.</p>
                )}
              </TextField>
            </FormControl>
          )}
        </Grid>
        <Grid item sx={4} sm={4} xl={4}>
          <FormControl fullWidth>
            <TextField
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              InputLabelProps={{
                shrink: true,
                // Add red color to the label
              }}
              name="role"
              select
              label={
                <div>
                  Role <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </div>
              }
              value={formik.values.role}
              onChange={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
            >
              <MenuItem value={`capita`}>Capita</MenuItem>
              <MenuItem value={`projectmanager`}>Project Manager</MenuItem>
              <MenuItem value={`sitemanager`}>Site Manager</MenuItem>
              <MenuItem value={`employee`}>Employee</MenuItem>
            </TextField>
          </FormControl>
        </Grid>
        <Grid item sx={6} sm={6} xl={6}>
          <StyledDateTextField
            InputLabelProps={{
              shrink: true,
              // Add red color to the label
            }}
            label={
              <div>
                Start Date{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
            }
            name="startdate"
            type="date"
            value={formik.values.startdate}
            onChange={formik.handleChange}
            error={formik.touched.startdate && Boolean(formik.errors.startdate)}
            helperText={formik.touched.startdate && formik.errors.startdate}
          />
        </Grid>
        <Grid item sx={6} sm={6} xl={6}>
          <StyledDateTextField
            InputLabelProps={{
              shrink: true,
              // Add red color to the label
            }}
            label={
              <div>
                Date of Birth{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
            }
            name="dob"
            type="date"
            value={formik.values.dob}
            onChange={formik.handleChange}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
          />
        </Grid>
      </Grid>
      <Grid
        sx={{ p: 3, pb: 2 }}
        container
        columnSpacing={2}
        rowSpacing={2}
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Grid item>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const StepTwo = (props) => {
  const stepTwoValidationSchema = Yup.object({
    emphone: Yup.string().required("Phone is required").nullable(),
    emfname: Yup.string().required("First Name is required").nullable(),
    emlname: Yup.string().required("Last Name is required").nullable(),
    emrelation: Yup.string().required("Relationship is required").nullable(),
  });

  const formik = useFormik({
    initialValues: {
      emfname: "",
      emlname: "",
      emphone: "",
      emrelation: "",
    },
    validationSchema: stepTwoValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        emfname: values.emfname,
        emlname: values.emlname,
        emphone: values.emphone,
        emrelation: values.emrelation,
      };

      // You can handle the submission or call the next function here
      // For now, just call the next function to move to the next step
      props.next(payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        sx={{ p: 3, pb: 2, pt: 6 }}
        container
        columnSpacing={2}
        rowSpacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item sx={4} sm={4} xl={4}>
          <TextField
            fullWidth
            name="emfname"
            InputLabelProps={{
              shrink: true,
              // Add red color to the label
            }}
            label={
              <div>
                Emergency First Name{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
            }
            value={formik.emfname}
            onChange={formik.handleChange}
            error={formik.touched.emfname && Boolean(formik.errors.emfname)}
            helperText={formik.touched.emfname && formik.errors.emfname}
          />
        </Grid>
        <Grid item sx={4} sm={4} xl={4}>
          <TextField
            fullWidth
            name="emlname"
            InputLabelProps={{
              shrink: true,
              // Add red color to the label
            }}
            label={
              <div>
                Emergency Last Name{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
            }
            value={formik.emlname}
            onChange={formik.handleChange}
            error={formik.touched.emlname && Boolean(formik.errors.emlname)}
            helperText={formik.touched.emlname && formik.errors.emlname}
          />
        </Grid>
        <Grid item sx={4} sm={4} xl={4}>
          <TextField
            fullWidth
            name="emphone"
            InputLabelProps={{
              shrink: true,
              // Add red color to the label
            }}
            label={
              <div>
                Emergency Phone Number{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
            }
            value={formik.emphone}
            onChange={formik.handleChange}
            error={formik.touched.emphone && Boolean(formik.errors.emphone)}
            helperText={formik.touched.emphone && formik.errors.emphone}
          />
        </Grid>
        <Grid item sx={12} sm={12} xl={12}>
          <TextField
            fullWidth
            name="emrelation"
            InputLabelProps={{
              shrink: true,
              // Add red color to the label
            }}
            label={
              <div>
                Emergency Relationship{" "}
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </div>
            }
            value={formik.emrelation}
            onChange={formik.handleChange}
            error={
              formik.touched.emrelation && Boolean(formik.errors.emrelation)
            }
            helperText={formik.touched.phonenumber && formik.errors.phonenumber}
          />
        </Grid>
      </Grid>
      <Grid
        sx={{ p: 3, pb: 2 }}
        container
        columnSpacing={2}
        rowSpacing={2}
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Grid item>
          <Button
            variant="outlined"
            type="button"
            sx={{ marginRight: 2 }}
            onClick={() => props.prev({})}
          >
            Back
          </Button>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const StepThree = (props) => {
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loadingUpload, setLoadingUpload] = useState(false);
  const { createEmployee } = useSelector((state) => state);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: ["image/png", "image/jpg", "image/jpeg"],
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

  return (
    <div>
      <Grid container sx={{ padding: 2 }}>
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
                <aside style={thumbsContainer}>
                  {files.map((file) => (
                    <img
                      key={file.name}
                      src={file.preview}
                      alt={file.name}
                      style={thumb}
                    />
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
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          rowSpacing={2}
          columnSpacing={2}
          pt={3}
          pb={4}
        >
          <Grid item>
            <Button
              variant="outlined"
              type="button"
              sx={{ marginRight: 2 }}
              onClick={() => props.prev({})}
            >
              Back
            </Button>
            <Button
              variant="contained"
              type="button"
              disabled={Object.keys(imageUrls).length < 1}
              onClick={() => props.makeRequest(imageUrls)}
            >
              {createEmployee?.loading ? <CircularProgress /> : "Finish"}
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: "20px", width: '100%' }}>
          {createEmployee &&
            !createEmployee?.success &&
            createEmployee.message && (
              <Alert variant="filled" severity="error">{createEmployee?.message}</Alert>
            )}
          {createEmployee &&
            createEmployee?.success &&
            createEmployee?.message && (
              <Alert variant="filled" severity="success">{createEmployee?.message}</Alert>
            )}
        </Box>
      </Grid>
    </div>
  );
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

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
