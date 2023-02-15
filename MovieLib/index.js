const moviesList = [
    { title: "The Shawshank Redemption", genre: "Drama" },
    { title: "The Godfather", genre: "Crime" },
    { title: "The Godfather: Part II", genre: "Crime" },
    { title: "The Dark Knight", genre: "Action" },
    { title: "12 Angry Men", genre: "Drama" },
    { title: "Schindler's List", genre: "Drama" },
    { title: "The Lord of the Rings: The Return of the King", genre: "Adventure" },
    { title: "Pulp Fiction", genre: "Crime" },
    { title: "The Good, the Bad and the Ugly", genre: "Western" },
    { title: "Fight Club", genre: "Drama" },
    { title: "Forrest Gump", genre: "Drama" },
    { title: "Inception", genre: "Action" },
    { title: "The Lord of the Rings: The Fellowship of the Ring", genre: "Adventure" },
    { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Action" },
    { title: "The Lord of the Rings: The Two Towers", genre: "Adventure" },
    { title: "The Matrix", genre: "Action" },
    { title: "Goodfellas", genre: "Crime" },
    { title: "One Flew Over the Cuckoo's Nest", genre: "Drama" },
    { title: "Seven Samurai", genre: "Adventure" },
    { title: "Se7en", genre: "Crime" },
    { title: "City of God", genre: "Crime" },
    { title: "The Silence of the Lambs", genre: "Thriller" },
    { title: "It's a Wonderful Life", genre: "Drama" },
    { title: "Life is Beautiful", genre: "Comedy" },
    { title: "The Usual Suspects", genre: "Crime" },
    { title: "Léon: The Professional", genre: "Action" },
    { title: "Spirited Away", genre: "Animation" },
    { title: "Saving Private Ryan", genre: "Drama" },
    { title: "Interstellar", genre: "Adventure" },
    { title: "The Green Mile", genre: "Drama" },
    { title: "The Prestige", genre: "Drama" },
    { title: "The Intouchables", genre: "Comedy" },
    { title: "The Lion King", genre: "Animation" },
    { title: "The Pianist", genre: "Drama" },
    { title: "The Departed", genre: "Crime" },
    { title: "Whiplash", genre: "Drama" },
    { title: "Gladiator", genre: "Action" }
  ]

let title=document.getElementById('title');
let genre=document.getElementById('genre');
let result=document.getElementById('results');
let searchbtn=document.getElementById('search');
let sortByMovie=document.getElementById('sortTitle');
let sortByGenre=document.getElementById('sortGenre');
let countBygenre=document.getElementById('countBygenre');
let arr=[],movies=[];
localStorage.setItem('movieList',JSON.stringify(moviesList));
 movies= JSON.parse(localStorage.getItem('movieList'));
const searchSelect = document.getElementById('search-select');
searchSelect.addEventListener('change',function(){
    if(searchSelect.value=="title"){
        title.disabled=false;
        genre.disabled=true;
        title.focus();
    }
    if(searchSelect.value=="genre"){
        genre.disabled=false;
        title.disabled=true;
        genre.focus();
    }
    if(searchSelect.value=='both'){
        title.disabled=false;
        genre.disabled=false;
        title.focus();
        genre.focus();
    }
})

searchbtn.addEventListener('click',function(){
    const searchType = searchSelect.value;
    if (searchType === 'title') {
        arr=searchByTitle(title.value);
      } else if (searchType === 'genre') {
        arr=searchByGenre(genre.value);
      } else if (searchType === 'both') {
        if(title.value && genre.value){
            arr=searchBoth(title.value,genre.value);
        }
    }

    display(arr);
})

function searchByTitle(movietitle){
    return movies.filter((movie)=>movie.title.toLowerCase().includes(movietitle.toLowerCase().trim()));
}

function searchByGenre(moviegenre){
    return movies.filter((movie)=>movie.genre.toLowerCase().includes(moviegenre.toLowerCase().trim()));
}
function searchBoth(title,genre){
    return movies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase().trim()) && movie.genre.toLowerCase().includes(genre.toLowerCase().trim()));
  }

function display(arr) {
    result.innerHTML = '';
    result.innerHTML=`<h2>Movies List</h2>`;
    if(arr.length==0){
        result.textContent="No movies found for your search";
    }
    arr.map(ele => {
        let childTag = `<li>${ele.title}  (${ele.genre})</li>`;
        result.innerHTML+= childTag;
    })
    countByGenre(arr);
}

sortByMovie.addEventListener('click',function(){
    const newResult=arr.sort((a,b)=>a.title.localeCompare(b.title));
    display(newResult);
})

sortByGenre.addEventListener('click',function(){
    const newResult=arr.sort((a,b)=>a.title.localeCompare(b.title));
    display(newResult);
})

function countByGenre(movies){
    let countObject = {};
    movies.map(item => {
        if(countObject[item.genre]) {
            countObject[item.genre]++;
        } else {
            countObject[item.genre] = 1;
        }
    })
    countBygenre.innerHTML = '';
    countBygenre.innerHTML=`<h4>Count Results</h4>`
    console.log(countObject);
    for(key in countObject) {
        countBygenre.innerHTML += `<li>${key} : ${countObject[key]}</li>` 
    }
}