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
const showResult = document.querySelector('nav')

// generate the the song 

const listsSong = () => {
    console.info('showing the list of song');
    const html = songs.map(song => {
        return `
            <ul>
                <li><img src="./image/antsan-i-kristy.jpg" alt width="100" height="100"></li>
                <li>${song.title}</li>
                <li>${song.name}</li>
                <li>${song.style}</li>
                <li>${song.length} min</li>
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

form.addEventListener('submit', addSongs);
showResult.addEventListener('updatedSongs', listsSong);




