/* eslint-disable no-unused-vars */
import React from 'react';


const FilePreview = ({file, onDelete}) => {
    const handleDelete = () => {
        onDelete(file);
    };

    return (
        <div>
        
                <img src={URL.createObjectURL(file)} alt={file.name} />
                <button onClick={handleDelete}>Delete</button>
        
        </div>
    );
};

export default FilePreview;