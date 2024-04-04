import Quill from "quill";
import { useEffect, useRef } from "react";
import 'quill/dist/quill.snow.css';

// export default function QuillEditor({ value, onChange }) {
//     const quillRef = useRef(null)
//     const quillInstance = useRef(null)

//     useEffect(() => {
//         if (quillRef.current && !quillInstance.current) {
//             quillInstance.current = new Quill(quillRef.current, {
//                 theme: 'snow',
//                 modules: {
//                     toolbar: [
//                         ['bold', 'italic', 'underline'],
//                         ['blockquote', 'code-block'],
//                         [{ 'list': 'ordered' }, { 'list': 'bullet' }],

//                         [{ 'direction': 'rtl' }],

//                         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//                         [{ 'color': [] }, { 'background': [] }],

//                         [{ 'align': [] }],
//                         ['clean']
//                     ]
//                 }
//             });
//             quillInstance.current.on('text-change', () => {
//                 const content = quillInstance.current.root.innerHTML
//                 onChange(content)
//             })
//         }
//         return () => { }
//     }, [onChange])

//     useEffect(() => {
//         if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
//             const delta = quillInstance.current.clipboard.convert(value);
//             quillInstance.current.setContents(delta, 'silent')
//         }
//     }, [])


//     return <div ref={quillRef} />
// }
// export default function QuillEditor() {


//     return (
//         <>
//             <div id="toolbar-container">
//                 <span class="ql-formats">
//                     <select class="ql-font"></select>
//                     <select class="ql-size"></select>
//                 </span>
//                 <span class="ql-formats">
//                     <button class="ql-bold"></button>
//                     <button class="ql-italic"></button>
//                     <button class="ql-underline"></button>
//                     <button class="ql-strike"></button>
//                 </span>
//                 <span class="ql-formats">
//                     <select class="ql-color"></select>
//                     <select class="ql-background"></select>
//                 </span>
//                 <span class="ql-formats">
//                     <button class="ql-script" value="sub"></button>
//                     <button class="ql-script" value="super"></button>
//                 </span>
//                 <span class="ql-formats">
//                     <button class="ql-header" value="1"></button>
//                     <button class="ql-header" value="2"></button>
//                     <button class="ql-blockquote"></button>
//                     <button class="ql-code-block"></button>
//                 </span>
//                 <span class="ql-formats">
//                     <button class="ql-list" value="ordered"></button>
//                     <button class="ql-list" value="bullet"></button>
//                     <button class="ql-indent" value="-1"></button>
//                     <button class="ql-indent" value="+1"></button>
//                 </span>
//                 <span class="ql-formats">
//                     <button class="ql-direction" value="rtl"></button>
//                     <select class="ql-align"></select>
//                 </span>
//                 <span class="ql-formats">
//                     <button class="ql-link"></button>
//                     <button class="ql-image"></button>
//                     <button class="ql-video"></button>
//                     <button class="ql-formula"></button>
//                 </span>
//                 <span class="ql-formats">
//                     <button class="ql-clean"></button>
//                 </span>
//             </div>
//             <div id="editor">
//             </div>
//         </>
//     )
// }