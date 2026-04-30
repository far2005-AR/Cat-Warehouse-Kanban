// Task.jsx 

const { useState } = React;

function Task({ task, boardId, index, tasks, setTasks, boards, setBoards }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDesc, setEditDesc] = useState(task.description || '');
    const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
    const [editPriority, setEditPriority] = useState(task.priority || 'medium');
    
    const handleDragStart = (e) => {
        if (e.target.tagName === 'BUTTON') {
            e.preventDefault();
            return false;
        }
        
        // Set drag data
        e.dataTransfer.setData('text/plain', task.id);
        e.dataTransfer.setData('sourceBoard', boardId);
        e.dataTransfer.setData('sourceIndex', index);
        
        window.dragActive = true;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDrag = (e) => {
        if (!window.dragActive) return;
        
        // Create paw print trail at mouse position
        const paw = document.createElement('div');
        paw.innerHTML = '🐾';
        paw.className = 'paw-trail';
        paw.style.left = e.clientX - 10 + 'px';
        paw.style.top = e.clientY - 10 + 'px';
        document.body.appendChild(paw);
        
        // Remove paw after animation
        setTimeout(() => {
            if (paw && paw.remove) paw.remove();
        }, 600);
    };

    const handleDragEnd = (e) => {
        window.dragActive = false;
        
        // Remove dragging class from element
        e.target.classList.remove('dragging');
        
        // Reset inline styles
        e.target.style.removeProperty('opacity');
        e.target.style.removeProperty('background');
        
        // Clean up leftover prints
        setTimeout(() => {
            const paws = document.querySelectorAll('.paw-trail');
            paws.forEach(paw => {
                if (paw && paw.remove) paw.remove();
            });
        }, 100);
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text/plain');
        const sourceBoard = e.dataTransfer.getData('sourceBoard');
        const sourceIndex = parseInt(e.dataTransfer.getData('sourceIndex'));
        
        if (draggedId === task.id) return;
        
        if (sourceBoard === boardId) {
            const board = boards.find(b => b.id === boardId);
            const newTaskIds = [...board.tasks];
            const [removed] = newTaskIds.splice(sourceIndex, 1);
            newTaskIds.splice(index, 0, removed);
            setBoards(boards.map(b => b.id === boardId ? { ...b, tasks: newTaskIds } : b));
        } else {
            const sourceBoardObj = boards.find(b => b.id === sourceBoard);
            const targetBoardObj = boards.find(b => b.id === boardId);
            const newSourceTasks = sourceBoardObj.tasks.filter(id => id !== draggedId);
            const newTargetTasks = [...targetBoardObj.tasks];
            newTargetTasks.splice(index, 0, draggedId);
            setBoards(boards.map(b => {
                if (b.id === sourceBoard) return { ...b, tasks: newSourceTasks };
                if (b.id === boardId) return { ...b, tasks: newTargetTasks };
                return b;
            }));
        }
    };
    
    const deleteTask = () => {
        const newTasks = { ...tasks };
        delete newTasks[task.id];
        setTasks(newTasks);
        setBoards(boards.map(b => ({
            ...b,
            tasks: b.tasks.filter(id => id !== task.id)
        })));
    };
    
    const handleSave = () => {
        console.log('SAVE CLICKED!');
        if (!editTitle.trim()) return;
        
        const updatedTask = {
            ...task,
            title: editTitle.trim(),
            description: editDesc.trim(),
            dueDate: editDueDate,
            priority: editPriority
        };
        
        setTasks({
            ...tasks,
            [task.id]: updatedTask
        });
        
        setIsEditing(false);
    };
    
    const getPriorityClass = () => {
    if (task.priority === 'completed') return 'completed';
    if (!task.priority) return '';
    return `priority-${task.priority}`;
    };
    
    const getDueStatus = () => {
        if (!task.dueDate) return '';
        const now = new Date();
        const due = new Date(task.dueDate);
        const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
        if (due < now) return 'overdue';
        if (daysLeft <= 3) return 'due-soon';
        return '';
    };
    
    // edit mode
    if (isEditing) {
        return React.createElement('div', { className: 'task editing' },
            React.createElement('input', {
                type: 'text',
                value: editTitle,
                onChange: (e) => setEditTitle(e.target.value),
                placeholder: 'Title',
                className: 'edit-title',
                autoFocus: true
            }),
            React.createElement('textarea', {
                value: editDesc,
                onChange: (e) => setEditDesc(e.target.value),
                placeholder: 'Description',
                className: 'edit-desc',
                rows: 2
            }),
            React.createElement('div', { className: 'edit-row' },
                React.createElement('input', {
                    type: 'date',
                    value: editDueDate,
                    onChange: (e) => setEditDueDate(e.target.value),
                    className: 'edit-date'
                }),
                React.createElement('select', {
                    value: editPriority,
                    onChange: (e) => setEditPriority(e.target.value),
                    className: 'edit-priority'
                },
                    React.createElement('option', { value: 'low' }, '🟢 Low'),
                    React.createElement('option', { value: 'medium' }, '🟡 Medium'),
                    React.createElement('option', { value: 'high' }, '🔴 High')
                )
            ),
            React.createElement('div', { className: 'edit-actions' },
                React.createElement('button', { 
                    onClick: handleSave,
                    className: 'save-btn' 
                }, '💾 SAVE'),
                React.createElement('button', { 
                    onClick: () => setIsEditing(false),
                    className: 'cancel-btn' 
                }, '❌ CANCEL')
            )
        );
    }
    
    // normal mode
    return React.createElement('div', {
        id: task.id,
        'data-task-id': task.id,
        className: `task ${getPriorityClass()} ${getDueStatus()}`,
        draggable: true,
        onDragStart: handleDragStart,
        onDrag: handleDrag,
        onDragEnd: handleDragEnd,  
        onDragOver: handleDragOver,
        onDrop: handleDrop
    },
        React.createElement('div', { className: 'task-header' },
            React.createElement('h4', { className: 'task-title' }, task.title),
            React.createElement('div', { className: 'task-actions' },
                React.createElement('button', {
                    className: 'icon-btn small',
                    onClick: (e) => {
                        e.stopPropagation();
                        setEditTitle(task.title);
                        setEditDesc(task.description || '');
                        setEditDueDate(task.dueDate || '');
                        setEditPriority(task.priority || 'medium');
                        setIsEditing(true);
                    },
                    title: 'Edit task'
                }, '✏️'),
                React.createElement('button', {
                    className: 'icon-btn small',
                    onClick: (e) => {
                        e.stopPropagation();
                        deleteTask();
                    },
                    title: 'Delete task'
                }, '🗑️')
            )
        ),
        task.description && React.createElement('p', { className: 'task-description' }, task.description),
        React.createElement('div', { className: 'task-meta' },
            task.priority && React.createElement('span', { className: `priority-badge ${task.priority}` }, 
                task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'
            ),
            task.dueDate && React.createElement('span', { className: `due-date ${getDueStatus()}` },
                '📅 ', new Date(task.dueDate).toLocaleDateString()
            )
        )
    );
}