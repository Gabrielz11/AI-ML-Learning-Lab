import React from 'react';
import { Info } from 'lucide-react';

const ExplanationBox = ({ title, content, type = "info" }) => {
  const styles = {
    info: "bg-indigo-50 border-indigo-100 text-indigo-900",
    success: "bg-emerald-50 border-emerald-100 text-emerald-900",
    warning: "bg-amber-50 border-amber-100 text-amber-900",
  };

  return (
    <div className={`p-4 rounded-xl border ${styles[type]} flex gap-4 items-start`}>
      <div className="mt-1 shrink-0">
        <Info size={18} className="opacity-80" />
      </div>
      <div>
        {title && <h4 className="font-bold mb-1 text-sm">{title}</h4>}
        <p className="text-sm leading-relaxed opacity-90">{content}</p>
      </div>
    </div>
  );
};

export default ExplanationBox;
