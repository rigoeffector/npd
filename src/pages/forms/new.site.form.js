import React from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Box,
  Button,
} from "@mui/material";
import { Grid } from "@material-ui/core";
const NewSiteForm = () => {
  return (
    <Box  sx={{ width: "100%", mt: 5 }}>
      <Formik
        // validationSchema={stepOneValidationSchema}
        // onSubmit={handleSubmit}
        initialValues={{
          Email: "",
          Password: "",
        }}
      >
        {({ values, validateOnMount, resetForm }) => (
          <Form>
            <Grid container>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      label="Name"
                      type="text"
                      name="name"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      label="Location"
                      type="text"
                      name="location"
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Description"
                      type="text"
                      name="description"
                      fullWidth
                      size="small"
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
                    Save
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default NewSiteForm;
