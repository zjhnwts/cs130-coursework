const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}&limit=5`; 
    document.querySelector('#tracks').innerHTML = ''; 
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (const track of data) {
                const template = `
                <section class= "track-item preview" data-preview-track="${track.preview_url}">
                    <img src="${track.album.image_url}">
                    <i class="fas play-track fa-play" aria-hidden="true"></i>
                    <div class="label">
                        <h3>${track.name}</h3>
                        <p>
                            ${track.artist.name}
                        </p>
                    </div>
            </section>`; 
                document.querySelector('#tracks').innerHTML += template; 
                console.log(track); 

            }
        })
};

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
};

const getArtist = (term) => {
    const elem = document.querySelector('#artist'); 
    elem.innerHTML = "";
    fetch(baseURL + '?type=artist&q=' + term)
    .then(response => response.json())
    .then((data) => {
        if (data.length > 0) {
            const firstArtist = data[0]; 
            // do something the first artist 
            elem.innerHTML += getArtistHTML(firstArtist); 
        }
        // if (data.length == 0) {
        //     <h3>No artist is founded. </h3>
        // }
    });
};

const getArtistHTML = (data) => {
    if (!data.image_url) {
        data.image_url = 'https://www.pngkit.com/png/full/943-9439413_blue-butterfly-free-png-image-dark-blue-to.png'
    }
    return  `<section class= "artist-card" id="${data.id}">
            <div>
                <img src="${data.image_url}">
                <h3>${data.name}</h3>
                <div class="footer">
                    <a href="${data.spotify_url}" target="_blank">
                        view on spotify
                    </a>
                </div>
            </div>
        </section>`;
};

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};