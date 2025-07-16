import React from 'react';
import './Table.css';

export const Table = ({ children }) => <table className="ui-table">{children}</table>;
export const TableCaption = ({ children }) => <caption className="ui-table-caption">{children}</caption>;
export const TableHead = ({ children, className = '' }) => <th className={`ui-table-head ${className}`}>{children}</th>;
export const TableHeader = ({ children }) => <thead className="ui-table-header">{children}</thead>;
export const TableBody = ({ children }) => <tbody className="ui-table-body">{children}</tbody>;
export const TableRow = ({ children, className = '' }) => <tr className={`ui-table-row ${className}`}>{children}</tr>;
export const TableCell = ({ children, className = '' }) => <td className={`ui-table-cell ${className}`}>{children}</td>;
export const TableFooter = ({ children }) => <tfoot className="ui-table-footer">{children}</tfoot>; 