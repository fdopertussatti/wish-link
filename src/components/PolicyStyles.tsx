import React from 'react';

export const PolicyContentStyles = () => (
  <style jsx global>{`
    .policy-content h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #6b21a8;
      margin-bottom: 1.5rem;
      border-bottom: 2px solid #f3e8ff;
      padding-bottom: 0.75rem;
    }
    .policy-content h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #7e22ce;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      position: relative;
    }
    .policy-content h3::before {
      content: "";
      position: absolute;
      left: -1rem;
      top: 0.5rem;
      width: 0.5rem;
      height: 0.5rem;
      background-color: #a855f7;
      border-radius: 50%;
    }
    .policy-content p {
      margin-bottom: 1.25rem;
      line-height: 1.7;
      color: #374151;
    }
    .policy-content ul {
      margin-bottom: 1.5rem;
      margin-left: 1.25rem;
      list-style-type: none;
    }
    .policy-content li {
      margin-bottom: 0.75rem;
      padding-left: 1.5rem;
      line-height: 1.6;
      position: relative;
    }
    .policy-content li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #a855f7;
      font-weight: bold;
    }
    .policy-content strong {
      color: #6b21a8;
      font-weight: 600;
    }
    .policy-content a {
      color: #7e22ce;
      text-decoration: underline;
      transition: color 0.2s;
    }
    .policy-content a:hover {
      color: #6b21a8;
    }
  `}</style>
); 