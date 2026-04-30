// BoardContainer.jsx - Manages all boards

const { useState, useEffect } = React;

function BoardContainer({ boards, setBoards, tasks, setTasks }) {
    const [showAddBoard, setShowAddBoard] = useState(false);
    const [isMeowing, setIsMeowing] = useState(false);
    
    // Cat audio
    const [meowAudio] = useState(() => {
        const audio = new Audio();
        audio.src = 'meow.mp3';
        audio.volume = 0.7; 
        return audio;
    });
    
    const addBoard = (title) => {
        const newBoard = {
            id: 'board-' + Date.now(),
            title,
            tasks: []
        };
        setBoards([...boards, newBoard]);
        setShowAddBoard(false);
    };
    
    const deleteBoard = (boardId) => {
        const board = boards.find(b => b.id === boardId);
        // Delete all tasks in this board
        const newTasks = { ...tasks };
        board.tasks.forEach(taskId => delete newTasks[taskId]);
        setTasks(newTasks);
        setBoards(boards.filter(b => b.id !== boardId));
    };
    
    const renameBoard = (boardId, newTitle) => {
        setBoards(boards.map(b => 
            b.id === boardId ? { ...b, title: newTitle } : b
        ));
    };
    
    // Click handler
    const handleCatClick = () => {
        setIsMeowing(true);
        meowAudio.play().catch(e => console.log('Meow failed:', e));
        setTimeout(() => {
            setIsMeowing(false);
        }, 2000);
    };
    
    return React.createElement('div', { className: 'board-container' },
        React.createElement('div', { className: 'boards-wrapper' },
            boards.map(board => 
                React.createElement(Board, {
                    key: board.id,
                    board,
                    tasks,
                    setTasks,
                    boards,
                    setBoards,
                    onDelete: () => deleteBoard(board.id),
                    onRename: (newTitle) => renameBoard(board.id, newTitle)
                })
            ),
            React.createElement('div', { className: 'board-adder' },
                !showAddBoard ? 
                    React.createElement('button', {
                        className: 'add-board-btn',
                        onClick: () => setShowAddBoard(true)
                    }, '+ ADD BOARD') :
                    React.createElement(AddBoardForm, {
                        onAdd: addBoard,
                        onCancel: () => setShowAddBoard(false)
                    }),
                React.createElement('div', { 
                    className: 'loafing-cat-card',
                    onClick: handleCatClick,
                    style: { cursor: 'pointer' }
                },
                    React.createElement('img', {
                        src: 'https://media.tenor.com/FYsjyvi3C7kAAAAj/rupert-cat.gif',
                        className: 'loafing-cat-gif',
                        alt: 'Loafing cat'
                    }),
                    React.createElement('span', { className: 'loafing-cat-slogan' }, 
                        isMeowing ? '🐱 sorry no english 🐱 ' : '🐾 supervising your productivty... (click for assistance)'
                    )
                )
            )
        )
    );
}