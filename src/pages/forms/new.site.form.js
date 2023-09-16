import React from "react";
import { Field } from "formik";
import {
  TextField,
  Box,
  Button,
  CircularProgress,
  Alert,
  Skeleton,
  Autocomplete,
} from "@mui/material";
import { Grid } from "@material-ui/core";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import { GET_REPORTS_LIST_REQUEST } from "../../reducers/reports/constants";
const NewSiteForm = () => {
  const CREATE_SITE_REQUEST = "CREATE_SITE_REQUEST";
  const dispatch = useDispatch();
  const { createSite, listProjects } = useSelector(
    (state) => state
  );
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").nullable(),
    location: Yup.string().required("Location is required").nullable(),
    description: Yup.string().required("Description is required").nullable(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        name: values.name,
        location: values.location,
        description: values.description,
       
      };

      dispatch({ type: CREATE_SITE_REQUEST, payload });
      resetForm();
    },
  });

  return (
    <Box sx={{ width: "100%", mt: 5 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
             
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="name"
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
                  value={formik.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="location"
                  InputLabelProps={{
                    shrink: true,
                    // Add red color to the label
                  }}
                  label={
                    <div>
                      Site Location{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </div>
                  }
                  value={formik.location}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.touched.location && formik.errors.location}
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
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
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
                {createSite && createSite.loading ? (
                  <CircularProgress />
                ) : (
                  "Save"
                )}
              </Button>
            </Grid>
            {createSite && !createSite?.success && createSite.message && (
              <Alert variant="filled" severity="error">
                {createSite?.message}
              </Alert>
            )}
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default NewSiteForm;
