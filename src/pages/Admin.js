import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  Box,
  Button,
  Grid,
  Alert,
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
import FileUploadForm from "./forms/upload.document";
import { useSelector } from "react-redux";

const Admin = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [showNewModal, setShowNewModal] = React.useState(false);
  const [showNewUploadModal, setShowNewUploadModal] = React.useState(false);
  const { createSite } = useSelector((state) => state);

  useEffect(() => {
    if (createSite.success) {
      handleClose();
    }
  }, [createSite.success]);
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
        <FileUploadForm />
      </NPDModal>

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
                {createSite && createSite?.success && createSite.message && (
                  <Alert variant="filled" severity="success">
                    {createSite?.message}
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
    </Page>
  );
};

export default Admin;
