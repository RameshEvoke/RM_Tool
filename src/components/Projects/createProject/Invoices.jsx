// src/components/Invoices.js
import React, { useState, useEffect } from 'react';

const Invoices = ({ data = [], onChange }) => {
    const initialData = data.length === 0 ? [{ invoiceId: '', date: '', amount: '', status: '', billingPeriod: '', dueDate: '', clientBillingInfo: '', approvalStatus: '', submittedBy: '' }] : data;
    const [invoices, setInvoices] = useState(initialData);

    useEffect(() => {
        setInvoices(initialData);
    }, [data]);

    const handleInvoiceChange = (index, key, value) => {
        const updatedInvoices = invoices.map((item, i) => i === index ? { ...item, [key]: value } : item);
        setInvoices(updatedInvoices);
        onChange(updatedInvoices);
    };

    const addInvoice = () => {
        const newInvoice = { invoiceId: '', date: '', amount: '', status: '', billingPeriod: '', dueDate: '', clientBillingInfo: '', approvalStatus: '', submittedBy: '' };
        const updatedInvoices = [...invoices, newInvoice];
        setInvoices(updatedInvoices);
        onChange(updatedInvoices);
    };

    return (
        <div>
            <h3 className='mt-3'>Invoice Details</h3>
            <table className="invoices-table table table-responsive w-100">
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Billing Period</th>
                        <th>Due Date</th>
                        <th>Client Billing Info</th>
                        <th>Approval Status</th>
                        <th>Submitted By</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((item, index) => (
                        <tr key={index}>
                            <td><input className='form-control' type="text" value={item.invoiceId} onChange={(e) => handleInvoiceChange(index, 'invoiceId', e.target.value)} /></td>
                            <td><input className='form-control' type="date" value={item.date} onChange={(e) => handleInvoiceChange(index, 'date', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.amount} onChange={(e) => handleInvoiceChange(index, 'amount', e.target.value)} /></td>
                            <td><input className='form-control' type="text" value={item.status} onChange={(e) => handleInvoiceChange(index, 'status', e.target.value)} /></td>
                            <td><input className='form-control' type="text" value={item.billingPeriod} onChange={(e) => handleInvoiceChange(index, 'billingPeriod', e.target.value)} /></td>
                            <td><input className='form-control' type="date" value={item.dueDate} onChange={(e) => handleInvoiceChange(index, 'dueDate', e.target.value)} /></td>
                            <td><input className='form-control' type="text" value={item.clientBillingInfo} onChange={(e) => handleInvoiceChange(index, 'clientBillingInfo', e.target.value)} /></td>
                            <td><input className='form-control' type="text" value={item.approvalStatus} onChange={(e) => handleInvoiceChange(index, 'approvalStatus', e.target.value)} /></td>
                            <td><input className='form-control' type="text" value={item.submittedBy} onChange={(e) => handleInvoiceChange(index, 'submittedBy', e.target.value)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='btn primary-btn' type="button" onClick={addInvoice}>Add Invoice</button>
        </div>
    );
};

export default Invoices;
