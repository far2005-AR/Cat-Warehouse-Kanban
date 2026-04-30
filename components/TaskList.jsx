// TaskList.jsx - Tasks in a board

const { useState, useEffect } = React;

function TaskList({ boardId, taskIds, tasks, setTasks, boards, setBoards }) {
    const [showAddTask, setShowAddTask] = useState(false);
    
    const addTask = (taskData) => {
        const newTask = {
            id: 'task-' + Date.now(),
            ...taskData,
            createdAt: new Date().toISOString(),
            boardId
        };
        
        setTasks({ ...tasks, [newTask.id]: newTask });
        setBoards(boards.map(b => 
            b.id === boardId 
                ? { ...b, tasks: [...b.tasks, newTask.id] }
                : b
        ));
        setShowAddTask(false);
    };
    
    const moveTask = (taskId, targetBoardId, newIndex) => {
        // Remove from source
        const sourceBoard = boards.find(b => b.tasks.includes(taskId));
        if (!sourceBoard) return;
        
        const newBoards = boards.map(b => {
            if (b.id === sourceBoard.id) {
                return { ...b, tasks: b.tasks.filter(id => id !== taskId) };
            }
            if (b.id === targetBoardId) {
                const newTasks = [...b.tasks];
                newTasks.splice(newIndex, 0, taskId);
                return { ...b, tasks: newTasks };
            }
            return b;
        });
        
        setBoards(newBoards);
    };
    
    const reorderTasks = (boardId, startIndex, endIndex) => {
        const board = boards.find(b => b.id === boardId);
        const newTaskIds = [...board.tasks];
        const [removed] = newTaskIds.splice(startIndex, 1);
        newTaskIds.splice(endIndex, 0, removed);
        
        setBoards(boards.map(b => 
            b.id === boardId ? { ...b, tasks: newTaskIds } : b
        ));
    };
    
    return React.createElement('div', { className: 'task-list' },
        taskIds.map((taskId, index) => 
            React.createElement(Task, {
                key: taskId,
                task: tasks[taskId],
                boardId,
                index,
                tasks,
                setTasks,
                boards,
                setBoards,
                onMove: moveTask,
                onReorder: reorderTasks
            })
        ),
        
        showAddTask ?
            React.createElement(TaskModal, {
                onSave: addTask,
                onClose: () => setShowAddTask(false)
            }) :
            React.createElement('button', {
                className: 'add-task-btn',
                onClick: () => setShowAddTask(true)
            }, '+ ADD TASK')
    );
}