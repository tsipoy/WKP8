console.log("it works");

let songs = [
    // {
    //     title: 'Beautiful',
    //     name: 'Westlife',
    //     style: 'slow',
    //     lenght: 5,
    // }
];

// Grab elements 
const form = document.querySelector('.add');
const showResult = document.querySelector('nav');

// generate the the song 

const listsSong = () => {
    console.info('showing the list of song');
    const html = songs.map(song => {
        return `
            <ul>
                <li><img src="${song.image}" alt="${song.name}" width="100" height="100"></li>
                <li>${song.name}<br><span>Song style: ${song.style}</span></li>
                <li>${song.title}<br><span>Song lenght: ${song.length} min</span></li>
                <li>Score:</li>
                <li><button class="add-score">+</button></li>
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

// Handle click delete button

const handleClick = e => {
    const deleteSong = deletedId => {
        songs = songs.filter(song => song.id !== deletedId);
        showResult.dispatchEvent(new CustomEvent('updatedSongs'));
    }
    const deleteButton = e.target.closest('button.delete-btn');
    if(deleteButton) {
        const id = Number(deleteButton.value);
        deleteSong(id);
    }
};
form.addEventListener('submit', addSongs);
showResult.addEventListener('updatedSongs', listsSong);
showResult.addEventListener('click', handleClick);




