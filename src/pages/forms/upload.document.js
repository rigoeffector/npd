import React, { useCallback } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
const AcceptedFileTypes = ['.docx', 'image/*', '.pdf'];
const FileUploadForm = ({handleUploadProductImages}) => {
  const onDrop = useCallback(acceptedFiles => {
    // Handle the uploaded file here
    console.log('Uploaded files:', acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: AcceptedFileTypes.join(','), // Allow only Word documents
    multiple: false, // Allow only one file to be uploaded
  });

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5">Upload Document</Typography>
        <div {...getRootProps()} style={{ margin: '20px 0', border: '2px dashed #cccccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
          <input {...getInputProps()} />
          <Typography variant="body1">Drag and drop a document here, or click to select a file</Typography>
        </div>
        <Button variant="contained" color="primary" onCli>
          Upload
        </Button>
      </Paper>
    </Container>
  );
};

export default FileUploadForm;
