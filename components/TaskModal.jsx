// TaskModal.jsx 

const { useState } = React;

function TaskModal({ task, onSave, onClose }) {
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [dueDate, setDueDate] = useState(task?.dueDate || '');
    const [priority, setPriority] = useState(task?.priority || 'medium');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        
        onSave({
            title: title.trim(),
            description: description.trim(),
            dueDate: dueDate,
            priority: priority
        });
        onClose();
    };
    
    return React.createElement('div', { 
        className: 'modal-overlay',
        onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        }
    },
        React.createElement('div', { 
            className: 'modal',
            onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
            }
        },
            React.createElement('h3', { className: 'modal-title' },
                task ? '✏️ Edit Task' : '➕ Add New Task'
            ),
            
            React.createElement('form', { onSubmit: handleSubmit },
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Title *'),
                    React.createElement('input', {
                        type: 'text',
                        value: title,
                        onChange: (e) => setTitle(e.target.value),
                        placeholder: 'Task title',
                        autoFocus: true,
                        required: true
                    })
                ),
                
                React.createElement('div', { className: 'form-group' },
                    React.createElement('label', null, 'Description'),
                    React.createElement('textarea', {
                        value: description,
                        onChange: (e) => setDescription(e.target.value),
                        placeholder: 'Add details...',
                        rows: '3'
                    })
                ),
                
                React.createElement('div', { className: 'form-row' },
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', null, 'Due Date'),
                        React.createElement('input', {
                            type: 'date',
                            value: dueDate,
                            onChange: (e) => setDueDate(e.target.value)
                        })
                    ),
                    
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', null, 'Priority'),
                        React.createElement('select', {
                            value: priority,
                            onChange: (e) => setPriority(e.target.value)
                        },
                            React.createElement('option', { value: 'low' }, '🟢 Low'),
                            React.createElement('option', { value: 'medium' }, '🟡 Medium'),
                            React.createElement('option', { value: 'high' }, '🔴 High')
                        )
                    )
                ),
                
               React.createElement('div', { className: 'modal-actions' },
                    React.createElement('button', {
                    type: 'button',
                    className: 'btn-secondary',
                    onClick: onClose
                }, 'Cancel'),
    
                    React.createElement('button', {
                        type: 'button',  
                        className: 'btn-primary',
                        onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('CREATE BUTTON CLICKED!');
                            console.log('Title:', title);
            
                            if (!title.trim()) {
                                console.log('No title!');
                                return;
                            }
            
                            onSave({
                                title: title.trim(),
                                description: description.trim(),
                                dueDate: dueDate,
                                priority: priority
                            });
                            onClose();
                        }
                    }, 'Save')
                )
            )
        )
    );










}