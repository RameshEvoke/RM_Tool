// src/components/TimeReporting.js
import React, { useState } from 'react';

const TimeReporting = ({ data, onChange }) => {
    const [timeReports, setTimeReports] = useState(data.length === 0 ? [{ resourceName: '', wbs: '', billable: '', jan: '', feb: '', mar: '', apr: '', may: '', jun: '', jul: '', aug: '', sep: '', oct: '', nov: '', dec: '', total: '' }] : data);

    const handleChange = (index, key, value) => {
        const updatedTimeReports = timeReports.map((item, i) => i === index ? { ...item, [key]: value, total: calculateTotal({ ...item, [key]: value }) } : item);
        setTimeReports(updatedTimeReports);
        onChange(updatedTimeReports);
    };

    const calculateTotal = (item) => {
        const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        return months.reduce((sum, month) => sum + (parseFloat(item[month]) || 0), 0);
    };

    const addTimeReport = () => {
        setTimeReports([...timeReports, { resourceName: '', wbs: '', billable: '', jan: '', feb: '', mar: '', apr: '', may: '', jun: '', jul: '', aug: '', sep: '', oct: '', nov: '', dec: '', total: '' }]);
    };

    return (
        <div>
            <h3 className='mt-3'>Time Reporting</h3>
            <table className="time-reporting-table table table-responsive w-100">
                <thead>
                    <tr>
                        <th>Resource Name</th>
                        <th>WBS</th>
                        <th>Billable (Y/N)</th>
                        <th>Jan</th>
                        <th>Feb</th>
                        <th>Mar</th>
                        <th>Apr</th>
                        <th>May</th>
                        <th>Jun</th>
                        <th>Jul</th>
                        <th>Aug</th>
                        <th>Sep</th>
                        <th>Oct</th>
                        <th>Nov</th>
                        <th>Dec</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {timeReports.map((item, index) => (
                        <tr key={index}>
                            <td><input className='form-control' type="text" value={item.resourceName} onChange={(e) => handleChange(index, 'resourceName', e.target.value)} /></td>
                            <td><input className='form-control' type="text" value={item.wbs} onChange={(e) => handleChange(index, 'wbs', e.target.value)} /></td>
                            <td><input className='form-control' type="text" value={item.billable} onChange={(e) => handleChange(index, 'billable', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.jan} onChange={(e) => handleChange(index, 'jan', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.feb} onChange={(e) => handleChange(index, 'feb', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.mar} onChange={(e) => handleChange(index, 'mar', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.apr} onChange={(e) => handleChange(index, 'apr', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.may} onChange={(e) => handleChange(index, 'may', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.jun} onChange={(e) => handleChange(index, 'jun', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.jul} onChange={(e) => handleChange(index, 'jul', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.aug} onChange={(e) => handleChange(index, 'aug', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.sep} onChange={(e) => handleChange(index, 'sep', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.oct} onChange={(e) => handleChange(index, 'oct', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.nov} onChange={(e) => handleChange(index, 'nov', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.dec} onChange={(e) => handleChange(index, 'dec', e.target.value)} /></td>
                            <td>{item.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/*<button type="button" onClick={addTimeReport}>Add Time Report</button>*/}
        </div>
    );
};

export default TimeReporting;
