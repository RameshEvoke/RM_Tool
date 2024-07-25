// src/components/Expenses.js
import React, { useState, useEffect } from 'react';

const Expenses = ({ data = [], onChange }) => {
    const initialData = data.length === 0 ? [{ expenseId: '', type: '', description: '', date: '', amount: '', approvalStatus: '', submittedBy: '', reportedAgainstWBS: '' }] : data;
    const [expenses, setExpenses] = useState(initialData);

    useEffect(() => {
        setExpenses(initialData);
    }, [data]);

    const handleExpenseChange = (index, key, value) => {
        const updatedExpenses = expenses.map((item, i) => i === index ? { ...item, [key]: value } : item);
        setExpenses(updatedExpenses);
        onChange(updatedExpenses);
    };

    const addExpense = () => {
        const newExpense = { expenseId: '', type: '', description: '', date: '', amount: '', approvalStatus: '', submittedBy: '', reportedAgainstWBS: '' };
        const updatedExpenses = [...expenses, newExpense];
        setExpenses(updatedExpenses);
        onChange(updatedExpenses);
    };

    return (
        <div>
            <h3>Expenses</h3>
            <table className="expenses-table table table-responsive w-100">
                <thead>
                    <tr>
                        <th>Expense ID</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Approval Status</th>
                        <th>Submitted By</th>
                        <th>Reported Against WBS</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((item, index) => (
                        <tr key={index}>
                            <td><input className='form-control' type="text" value={item.expenseId} onChange={(e) => handleExpenseChange(index, 'expenseId', e.target.value)} /></td>
                            <td><input className='form-control' type="text" value={item.type} onChange={(e) => handleExpenseChange(index, 'type', e.target.value)} /></td>
                            <td><input className='form-control' type="text" value={item.description} onChange={(e) => handleExpenseChange(index, 'description', e.target.value)} /></td>
                            <td><input className='form-control' type="date" value={item.date} onChange={(e) => handleExpenseChange(index, 'date', e.target.value)} /></td>
                            <td><input className='form-control' type="number" value={item.amount} onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)} /></td>
                            <td><input className='form-control' type="text" value={item.approvalStatus} onChange={(e) => handleExpenseChange(index, 'approvalStatus', e.target.value)} /></td>
                            <td><input className='form-control' type="text" value={item.submittedBy} onChange={(e) => handleExpenseChange(index, 'submittedBy', e.target.value)} /></td>
                            <td><input className='form-control' type="text" value={item.reportedAgainstWBS} onChange={(e) => handleExpenseChange(index, 'reportedAgainstWBS', e.target.value)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
         
            <button className='btn primary-btn' type="button" onClick={addExpense}>Add Expense</button>
        </div>
    );
};

export default Expenses;
