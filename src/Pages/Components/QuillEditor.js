// QuillEditor.js
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import "../DashboardPages/Dashboard.css";


const QuillEditor = ({ content, handleChange }) => {
    const [quill, setQuill] = useState(null);

    useEffect(() => {
        if (quill) {
            // You can customize the Quill editor here if needed
        }
    }, [quill]);

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={content}
                onChange={(value) => handleChange(value)}
                modules={{
                    toolbar: [
                        [{ 'font': [] }],
                        [{ header: [1, 2, false] }],
                        // ['blockquote', 'code-block'],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }, { 'align': [] }],
                        ['link'],
                    ],
                }}
            />
        </div>
    );
};

export default QuillEditor;
