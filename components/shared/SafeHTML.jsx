"use client";
import { useEffect, useRef } from "react";

const SafeHTML = ({ content, className = "" }) => {
  const contentRef = useRef(null);
  const styleRef = useRef(null);

  useEffect(() => {
    // Cleanup function to prevent DOM manipulation errors
    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        try {
          styleRef.current.parentNode.removeChild(styleRef.current);
        } catch (error) {
          console.warn("Error removing style element:", error);
        }
        styleRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (contentRef.current && content) {
      // Apply custom styles to make the content look good
      if (!styleRef.current) {
        const style = document.createElement("style");
        style.id = "blog-content-styles";
        style.textContent = `
          .blog-content h1, .blog-content h2, .blog-content h3, 
          .blog-content h4, .blog-content h5, .blog-content h6 {
            color: #ffffff;
            font-weight: bold;
            margin-top: 2rem;
            margin-bottom: 1rem;
            line-height: 1.3;
          }
          
          .blog-content h1 {
            font-size: 2.5rem;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 0.5rem;
          }
          
          .blog-content h2 {
            font-size: 2rem;
            border-bottom: 1px solid #4b5563;
            padding-bottom: 0.25rem;
          }
          
          .blog-content h3 {
            font-size: 1.5rem;
          }
          
          .blog-content h4 {
            font-size: 1.25rem;
          }
          
          .blog-content p {
            color: #d1d5db;
            line-height: 1.7;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
          }
          
          .blog-content a {
            color: #3b82f6;
            text-decoration: underline;
            transition: color 0.2s ease;
          }
          
          .blog-content a:hover {
            color: #60a5fa;
          }
          
          .blog-content ul, .blog-content ol {
            color: #d1d5db;
            margin-bottom: 1.5rem;
            padding-left: 2rem;
          }
          
          .blog-content li {
            margin-bottom: 0.5rem;
            line-height: 1.6;
          }
          
          .blog-content blockquote {
            border-left: 4px solid #3b82f6;
            padding-left: 1.5rem;
            margin: 2rem 0;
            color: #9ca3af;
            font-style: italic;
            background: rgba(59, 130, 246, 0.1);
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
          }
          
          .blog-content code {
            background: #374151;
            color: #f3f4f6;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
          }
          
          .blog-content pre {
            background: #1f2937;
            color: #f3f4f6;
            padding: 1.5rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1.5rem 0;
            border: 1px solid #374151;
          }
          
          .blog-content pre code {
            background: none;
            padding: 0;
            color: inherit;
          }
          
          .blog-content img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1.5rem 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
          }
          
          .blog-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            background: #1f2937;
            border-radius: 0.5rem;
            overflow: hidden;
          }
          
          .blog-content th, .blog-content td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #374151;
          }
          
          .blog-content th {
            background: #374151;
            color: #ffffff;
            font-weight: bold;
          }
          
          .blog-content td {
            color: #d1d5db;
          }
          
          .blog-content hr {
            border: none;
            height: 1px;
            background: #374151;
            margin: 2rem 0;
          }
          
          .blog-content strong {
            color: #ffffff;
            font-weight: bold;
          }
          
          .blog-content em {
            color: #9ca3af;
            font-style: italic;
          }
        `;

        // Add the styles to the document head if not already added
        if (!document.querySelector("#blog-content-styles")) {
          try {
            document.head.appendChild(style);
            styleRef.current = style;
          } catch (error) {
            console.warn("Error adding style element:", error);
          }
        }
      }
    }
  }, [content]);

  return (
    <div
      ref={contentRef}
      className={`blog-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content || "" }}
    />
  );
};

export default SafeHTML;
