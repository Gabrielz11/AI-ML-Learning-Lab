import React from 'react';
import { Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ExplanationBox = ({ title, content, type = "info" }) => {
  const styles = {
    info: "bg-indigo-50 border-indigo-100 text-indigo-900",
    success: "bg-emerald-50 border-emerald-100 text-emerald-900",
    warning: "bg-amber-50 border-amber-100 text-amber-900",
  };

  return (
    <div className={`p-6 rounded-2xl border ${styles[type]} flex gap-4 items-start shadow-sm`}>
      <div className="mt-1 shrink-0 p-2 bg-white rounded-lg shadow-sm">
        <Info size={20} className="text-current opacity-80" />
      </div>
      <div className="flex-1 min-w-0">
        {title && <h4 className="font-bold mb-3 text-base tracking-tight">{title}</h4>}
        <div className="markdown-content text-sm leading-relaxed opacity-90 prose prose-slate max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ExplanationBox;
