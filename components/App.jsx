// components/App.jsx

const { useState, useEffect } = React;

// Initial data structure
const initialData = {
    boards: [
        { id: 'board-1', title: '📦 INBOUND SHIPMENT (TO-DO)', tasks: [] },
        { id: 'board-2', title: '📝 PACKING ORDER (IN PROGRESS)', tasks: [] },
        { id: 'board-3', title: '🍞 LOAF MODE (DONE)', tasks: [] }
    ],
    tasks: {}
};

function App() {
    const [boards, setBoards] = useState(() => {
        const saved = localStorage.getItem('catWarehouseBoards');
        return saved ? JSON.parse(saved) : initialData.boards;
    });

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('catWarehouseTasks');
        return saved ? JSON.parse(saved) : {};
    });
    
    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('catWarehouseBoards', JSON.stringify(boards));
        localStorage.setItem('catWarehouseTasks', JSON.stringify(tasks));
    }, [boards, tasks]);
    
    // Counter stats
    const stats = {
        totalBoards: boards.length,
        totalTasks: Object.keys(tasks).length,
        highPriority: Object.values(tasks).filter(t => t?.priority === 'high').length,
        dueSoon: Object.values(tasks).filter(t => {
            if (!t?.dueDate) return false;
            const daysLeft = Math.ceil((new Date(t.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
            return daysLeft <= 3 && daysLeft > 0;
        }).length,
        overdue: Object.values(tasks).filter(t => {
            if (!t?.dueDate) return false;
            return new Date(t.dueDate) < new Date();
        }).length
    };
    
    return React.createElement('div', { className: 'app' },
        // Corner logo (optional)
        React.createElement('img', { 
            src: 'images/cheetahlogo.png', 
            className: 'corner-logo',
            alt: '🐆',
            onError: (e) => e.target.style.display = 'none'
        }),
        
        // Main title
        React.createElement('h1', { className: 'main-title' }, 
            '🐆 Cat_Warehouse · Kanban'
        ),
        
        // Stats header
        React.createElement(Header, { stats }),
        
        // Board container with all boards and tasks
        React.createElement(BoardContainer, { 
            boards, 
            setBoards,
            tasks,
            setTasks
        })
    );
}

// Make sure it's available globally
window.App = App;