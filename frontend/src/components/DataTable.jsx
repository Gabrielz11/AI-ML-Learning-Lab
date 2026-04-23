import React from 'react';

const DataTable = ({ columns, data, highlightRow = null }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row, rowIdx) => (
            <tr 
              key={rowIdx} 
              className={`transition-colors hover:bg-muted/30 ${
                highlightRow === rowIdx ? 'bg-primary/5' : ''
              }`}
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-4 py-3 font-medium">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
