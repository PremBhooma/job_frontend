// QuillEditor.js
import React from 'react';
// import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import styles from "@/styles/AiPost.module.css";
import ReactQuill from 'react-quill';

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const QuillEditor = ({ content, handleChange, placeholder }) => {
    return (
        <div className={styles.textEditorPanel}>
            <ReactQuill
                theme="snow"
                value={content}
                onChange={handleChange}
                placeholder="Write caption.." // Use the placeholder prop
                modules={{
                    toolbar: [
                        [{ 'font': [] }],
                        [{ header: [1, 2, false] }],
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