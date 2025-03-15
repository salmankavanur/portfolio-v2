"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";

// Import Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full flex items-center justify-center border rounded-md">
      <div className="h-6 w-6 border-2 border-t-primary animate-spin rounded-full"></div>
    </div>
  ),
});

// Import Quill styles
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write something amazing...",
  className = "",
  minHeight = "300px",
}: RichTextEditorProps) {
  // State to track client-side rendering
  const [mounted, setMounted] = useState(false);

  // Quill modules (toolbar options)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  // Quill formats
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "blockquote",
    "code-block",
    "color",
    "background",
  ];

  // Set mounted to true on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={className}>
      <style jsx global>{`
        .quill {
          display: flex;
          flex-direction: column;
        }
        .ql-container {
          min-height: ${minHeight};
          height: auto;
          flex: 1;
          overflow-y: auto;
        }
        .ql-editor {
          min-height: ${minHeight};
          max-height: 500px;
          overflow-y: auto;
        }
      `}</style>

      <Card>
        <CardContent className="p-0 overflow-hidden">
          {mounted && (
            <ReactQuill
              theme="snow"
              value={value}
              onChange={onChange}
              modules={modules}
              formats={formats}
              placeholder={placeholder}
              className="rounded-md"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
