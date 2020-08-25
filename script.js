console.log("it works");

let songs = [];

// Grab elements 
const form = document.querySelector('.add');
const showResult = document.querySelector('nav');

// generate the the song 

const listsSong = () => {
    console.info('showing the list of song');
    const html = songs.map(song => {
        return `
            <ul>
                
                <li>${song.name}<br><span>Song style: ${song.style}</span></li>
                <li>${song.title}<br><span>Song lenght: ${song.length} min</span></li>
                <li class="score">SCORE:0</li>
                <li class="add-score">
                    <button
                        value="${song.id}"
                        class="add-score"
                        id="score" 
                        class="add-score">+${song.score}
                    </button>
                </li>
                <li class="delete-btn"> 
                    <button 
                        class="delete-btn"
                        value="${song.id}" 
                        area-label="${song.title}">
                        <img class="delete-btn" src="./image/trash.svg" alt="${song.name}">
                    </button>
                </li>
            </ul>
    `;
    })
        .join('');
    showResult.innerHTML = html;
    console.log(html); 
};
listsSong();

// Add the list of songs and push

const addSongs = e => {
    e.preventDefault();
    const title = e.target.title.value;
    const name = e.target.name.value;
    const style = e.target.style.value;
    const length = e.target.length.value;

    const addLists = {
        title: title,
        name: name,
        style: style,
        length:  length,
        id: Date.now(),
    };

    songs.push(addLists);
    e.currentTarget.reset();
    showResult.dispatchEvent(new CustomEvent('updatedSongs'));
    console.log(addLists);
};

// Handle delete button

const handleClick = e => {
    const deleteSong = deletedId => {
        songs = songs.filter(song => song.id !== deletedId);
        showResult.dispatchEvent(new CustomEvent('updatedSongs'));
    }

    const updateScore = () => {
        const update = () => {
        songs = songs.reduce((acc, updatedId) => {
            return acc + updatedId.score;
        },0); 
        scoreUpdated.textContent = `${update}`;
        showResult.dispatchEvent(new CustomEvent('updatedSongs'));
        }
    }

    const deleteButton = e.target.closest('button.delete-btn');
    if(deleteButton) {
        const id = Number(deleteButton.value);
        deleteSong(id);
    }

    const scoreUpdated = e.target.closest('button.add-score');
        if(scoreUpdated) {
            const id = Number(scoreUpdated.value);
            updateScore(id);
    }
};

// local storage 

const initLocalStorage = () => {
    const musicLists = JSON.parse(localStorage.getItem('songs'));
    if(!musicLists) {
        songs = [];
    } else {
        songs = musicLists;
    }
    showResult.dispatchEvent(new CustomEvent('updatedSongs'));
};

// Update local storage
const upatedLocalStorage = () => {
    localStorage.setItem('songs', JSON.stringify(songs));
};


form.addEventListener('submit', addSongs);
showResult.addEventListener('updatedSongs', listsSong);
showResult.addEventListener('click', handleClick);
showResult.addEventListener('updatedSongs',upatedLocalStorage)

initLocalStorage();




