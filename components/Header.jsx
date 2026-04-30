// Header.jsx - Counter bar

const { useState, useEffect } = React;

function Header({ stats }) {
    return React.createElement('div', { className: 'stats-wrapper' },
        // Running cheetah bar 
        React.createElement('div', { className: 'running-cheetah-bar' },
            React.createElement('img', {
                src: 'https://i.pinimg.com/originals/ea/75/1f/ea751f1731a8fd450c2b8248f744b6a8.gif',
                className: 'running-cheetah-gif',
                alt: 'cheetah running'
            })
        ),
        // Stats bar - SEPARATE 
        React.createElement('div', { className: 'stats-bar' },
            React.createElement('div', { className: 'stat-item' },
                React.createElement('span', { className: 'stat-number' }, stats.totalBoards),
                React.createElement('span', { className: 'stat-label' }, '📋 BOARDS')
            ),
            React.createElement('div', { className: 'stat-item' },
                React.createElement('span', { className: 'stat-number' }, stats.totalTasks),
                React.createElement('span', { className: 'stat-label' }, '📝 TASKS')
            ),
            React.createElement('div', { className: 'stat-item' },
                React.createElement('span', { className: 'stat-number' }, stats.highPriority),
                React.createElement('span', { className: 'stat-label' }, '🔴 HIGH PRIORITY')
            ),
            React.createElement('div', { className: 'stat-item' },
                React.createElement('span', { className: 'stat-number' }, stats.dueSoon),
                React.createElement('span', { className: 'stat-label' }, '⏰ DUE SOON')
            ),
            React.createElement('div', { className: 'stat-item' },
                React.createElement('span', { className: 'stat-number' }, stats.overdue),
                React.createElement('span', { className: 'stat-label' }, '⚠️ OVERDUE')
            )
        ),
        
        // Legend bar
        React.createElement('div', { className: 'legend-container' },
            React.createElement('span', { className: 'legend-title' }, 'LEGEND'),
            React.createElement('div', { className: 'legend-items' },
                React.createElement('div', { className: 'legend-item' },
                    React.createElement('div', { className: 'legend-color priority-high' }),
                    React.createElement('span', null, 'LEFT = High Priority')
                ),
                React.createElement('div', { className: 'legend-item' },
                    React.createElement('div', { className: 'legend-color priority-medium' }),
                    React.createElement('span', null, 'LEFT = Medium Priority')
                ),
                React.createElement('div', { className: 'legend-item' },
                    React.createElement('div', { className: 'legend-color priority-low' }),
                    React.createElement('span', null, 'LEFT = Low Priority')
                ),
                React.createElement('div', { className: 'legend-item' },
                    React.createElement('div', { className: 'legend-color due-soon' }),
                    React.createElement('span', null, 'RIGHT = Due Soon (≤ 3 days)')
                ),
                React.createElement('div', { className: 'legend-item' },
                    React.createElement('div', { className: 'legend-color overdue' }),
                    React.createElement('span', null, 'RIGHT = Overdue')
                ),
                React.createElement('div', { className: 'legend-item' },
                    React.createElement('div', { className: 'legend-color completed-task' }),
                    React.createElement('span', null, 'NO BORDERS = Completed Task')
                )
            )
        )

    );
}