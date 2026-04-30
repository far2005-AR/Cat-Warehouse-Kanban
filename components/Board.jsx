// Board.jsx - Individual board component

const { useState, useEffect } = React;

function Board({ board, tasks, setTasks, boards, setBoards, onDelete, onRename }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(board.title);
    
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        const sourceBoardId = e.dataTransfer.getData('sourceBoard');
        
        if (!taskId || !sourceBoardId) return;
        if (sourceBoardId === board.id) return;
        
        // Check if this is loaf mode (done board)
        const isLoafMode = board.title.includes('LOAF') || board.title.includes('DONE');
        
        // Move the task
        setBoards(boards.map(b => {
            if (b.id === sourceBoardId) {
                return { ...b, tasks: b.tasks.filter(id => id !== taskId) };
            }
            if (b.id === board.id) {
                return { ...b, tasks: [...b.tasks, taskId] };
            }
            return b;
        }));
        
        // If moving to loaf mode, clear priority and due date
        if (isLoafMode) {
            setTimeout(() => {
                setTasks(prevTasks => ({
                    ...prevTasks,
                    [taskId]: {
                        ...prevTasks[taskId],
                        priority: 'completed',  
                        dueDate: null           
                    }
                }));
            }, 50);
            
            // Play purr
            const purr = new Audio('purr.mp3');
            purr.volume = 0.3;
            purr.play().catch(e => console.log('Purr failed:', e));
            
            // Celebration 
            setTimeout(() => {
                const taskEl = document.getElementById(taskId);
                console.log('Task element found:', taskEl); 
                if (taskEl) {
                    taskEl.style.animation = 'celebrate 0.8s ease-in-out';
                    setTimeout(() => {
                        taskEl.style.animation = '';
                    }, 800);
                }
            }, 100);
        }
    };
    
    const handleRename = () => {
        if (editTitle.trim()) {
            onRename(editTitle);
            setIsEditing(false);
        }
    };
    
    return React.createElement('div', {
        className: 'board',
        onDragOver: handleDragOver,
        onDrop: handleDrop
    },
        React.createElement('div', { className: 'board-header' },
            isEditing ?
                React.createElement('div', { className: 'board-edit' },
                    React.createElement('input', {
                        type: 'text',
                        value: editTitle,
                        onChange: (e) => setEditTitle(e.target.value),
                        onBlur: handleRename,
                        onKeyPress: (e) => e.key === 'Enter' && handleRename(),
                        autoFocus: true
                    })
                ) :
                React.createElement('h2', { className: 'board-title' }, board.title),
            
            React.createElement('div', { className: 'board-actions' },
                React.createElement('button', {
                    className: 'icon-btn',
                    onClick: () => setIsEditing(true),
                    title: 'Rename board'
                }, '✏️'),
                React.createElement('button', {
                    className: 'icon-btn',
                    onClick: onDelete,
                    title: 'Delete board'
                }, '🗑️')
            )
        ),
        
        React.createElement(TaskList, {
            boardId: board.id,
            taskIds: board.tasks,
            tasks,
            setTasks,
            boards,
            setBoards
        })
    );
}