// AddBoardForm.jsx - simple form for a new board

const { useState, useEffect } = React;

function AddBoardForm({ onAdd, onCancel }) {
    const [title, setTitle] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title.trim());
            setTitle('');
        }
    };
    
    return React.createElement('form', { 
        className: 'add-board-form',
        onSubmit: handleSubmit
    },
        React.createElement('input', {
            type: 'text',
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: 'Board name...',
            autoFocus: true,
            required: true
        }),
        React.createElement('div', { className: 'form-actions' },
            React.createElement('button', { type: 'submit' }, 'ADD'),
            React.createElement('button', { 
                type: 'button',
                onClick: onCancel
            }, 'CANCEL')
        )
    );
}