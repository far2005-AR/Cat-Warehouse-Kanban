// script.jsx - (ENTRY POINT)

const { useState, useEffect } = React;

// Initial data structure
const initialData = {
    boards: [
        { id: 'board-1', title: '📦 INBOUND SHIPMENT (TO-DO)', tasks: [] },
        { id: 'board-2', title: '📝 PACKING ORDER (IN PROGRESS)', tasks: [] },
        { id: 'board-3', title: '🍞 LOAF MODE (DONE)', tasks: [] },
    ],
    tasks: {} // task objects by ID
};

function App() {
    const [boards, setBoards] = useState(() => {
        const saved = localStorage.getItem('catWarehouseKanban');
        return saved ? JSON.parse(saved) : initialData.boards;
    });

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('catWarehouseTasks');
        return saved ? JSON.parse(saved) : {};
    });

    // Save to local storage whenever data changes
    useEffect(() => {
        localStorage.setItem('catWarehouseKanban', JSON.stringify(boards));
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
    
    // Add dust particles (inside App function)
    useEffect(() => {
    // Create dust container
    const dustContainer = document.createElement('div');
    dustContainer.style.position = 'fixed';
    dustContainer.style.top = '0';
    dustContainer.style.left = '0';
    dustContainer.style.width = '100%';
    dustContainer.style.height = '100%';
    dustContainer.style.pointerEvents = 'none';
    dustContainer.style.zIndex = '9997';
    dustContainer.style.overflow = 'hidden';
    document.body.appendChild(dustContainer);
    
    // Create dust particles
    for (let i = 0; i < 80; i++) {
        const dust = document.createElement('div');
        dust.className = 'dust-particle';
        
        // Random size
        const size = 2 + Math.random() * 4;
        dust.style.width = size + 'px';
        dust.style.height = size + 'px';
        
        // Random starting position
        dust.style.left = Math.random() * 100 + '%';
        dust.style.top = Math.random() * 100 + '%';
        
        // Random animation duration
        const duration = 15 + Math.random() * 20;
        dust.style.animation = `dust-float ${duration}s linear infinite`;
        
        // Random delay
        dust.style.animationDelay = Math.random() * 10 + 's';
        
        dustContainer.appendChild(dust);
    }
    
    // Cleanup on unmount
    return () => {
        document.body.removeChild(dustContainer);
    };
}, []);

    // RADIO (online office v4.20 by Corp.)
    useEffect(() => {
    // audio element
    const audio = new Audio('radio.mp3'); 
    audio.loop = true;
    audio.volume = 0.3; 
    
    // radio control button
    const radioBtn = document.createElement('div');
    radioBtn.className = 'radio-control';
    radioBtn.innerHTML = '📻 RADIO';
    radioBtn.style.zIndex = '10000';
    
    let isPlaying = false;
    
    radioBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            radioBtn.innerHTML = '📻 RADIO';
            radioBtn.classList.remove('playing');
        } else {
            audio.play().catch(e => console.log('Audio play failed:', e));
            radioBtn.innerHTML = '📻 playing';
            radioBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
    
    document.body.appendChild(radioBtn);
    
    // Try autoplay 
    audio.play().then(() => {
        isPlaying = true;
        radioBtn.innerHTML = '📻 RADIO';
        radioBtn.classList.add('playing');
    }).catch(() => {
        console.log('Click the radio to start the vibe');
    });
    
    // Cleanup
    return () => {
        audio.pause();
        audio.src = '';
        document.body.removeChild(radioBtn);
    };
}, []);

    // main english title and japanese neon sign
    return React.createElement('div', { className: 'app' },
    React.createElement('img', { 
        src: 'images/cheetahlogo.png', 
        className: 'corner-logo',
        onError: (e) => e.target.style.display = 'none'
    }),
    React.createElement('h1', { className: 'main-title' },
        React.createElement('div', { className: 'title-left' },
            React.createElement('img', {
                src: 'images/cheetahlogo.png',
                className: 'title-logo',
                onError: (e) => e.target.style.display = 'none'
            }),
            React.createElement('span', { className: 'title-english' }, 'Cat_Warehouse · Kanban')
        ),
        React.createElement('span', { className: 'title-japanese' }, 'かんばん')
    ),

    React.createElement(Header, { stats }),

    React.createElement(BoardContainer, { 
        boards, 
        setBoards,
        tasks,
        setTasks
    })
);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
  
  










