"use strict";

movies.splice(200);

let main = document.querySelector('.main__content'),
    nameSearch = document.querySelectorAll('.isName'),
    categorySelect = document.querySelector('#category'),
    rating = document.querySelector('#rating'),
    letterSelect = document.querySelector('#letter');

let db = movies.map(el => {
    return {
        title: el.title,
        year: el.year,
        category: el.categories,
        id: el.imdbId,
        reting: el.imdbRating,
        language: el.language,
        time: `${Math.trunc(el.runtime / 60)}H ${el.runtime % 60}m`,
        summary: el.summary,
        maxImg: el.bigThumbnail,
        minImg: el.smallThumbnail,
        trailer: el.youtubeId
    }
});

function renderStartCards() {
    db.forEach( el => {
        const card = document.createElement("div");
        card.setAttribute('class', 'w-[380px] bg-white h-[600px] flex flex-col gap-y-4 shadow-2xl rounded-lg');
        card.innerHTML = `
        <img src="${el.minImg}" alt="" class="w-[98%]">
        <div class="card-body p-3 flex flex-col gap-y-2">
            <h1 class="text-green-700 text-xl uppercase font-bold">${el.title}</h1>
            <ul>
                <li><strong>Year:</strong> ${el.year}</li>
                <li><strong>Language:</strong> ${el.language}</li>
                <li><strong>Category:</strong> ${el.category}</li>
                <li><strong>RunTime:</strong> ${el.time}</li>
                <li><strong>Rating:</strong> <strong class="text-red-500">${el.reting}</strong></li>
            </ul>
            <div class="flex gap-x-3">
                <button class="bg-sky-600 text-white w-30% py-2 px-2 rounded-lg hover:bg-sky-700">
                    Read more
                </button>
                <button class="bg-red-500 text-white w-30% py-2 px-2 rounded-lg hover:bg-red-600">
                    Bookmark
                </button>
                <a href="https://www.youtube.com/embed${el.trailer}" class="bg-purple-600 text-white w-30% py-2 px-2 rounded-lg hover:bg-purple-700">
                    Watch
                </a>
            </div>
        </div>
        
        `
        main.append(card)
    } );
}
renderStartCards();



// search part
function renderSearchCards(arr) {
    main.innerHTML = null;
    arr.forEach( el => {
        let card = document.createElement("div");
        card.setAttribute('class', 'w-[380px] bg-white h-[600px] flex flex-col gap-y-4 shadow-2xl rounded-lg');
        card.innerHTML = `
        <img src="${el.minImg}" alt="" class="w-[98%]">
        <div class="card-body p-3 flex flex-col gap-y-2">
            <h1 class="text-green-700 text-xl uppercase font-bold">${el.title}</h1>
            <ul>
                <li><strong>Year:</strong> ${el.year}</li>
                <li><strong>Language:</strong> ${el.language}</li>
                <li><strong>Category:</strong> ${el.category}</li>
                <li><strong>RunTime:</strong> ${el.time}</li>
                <li><strong>Rating:</strong> <strong class="text-red-500">${el.reting}</strong></li>
            </ul>
            <div class="flex gap-x-3">
                <button class="bg-sky-600 text-white w-30% py-2 px-2 rounded-lg hover:bg-sky-700">
                    Read more
                </button>
                <button class="bg-red-500 text-white w-30% py-2 px-2 rounded-lg hover:bg-red-600">
                    Bookmark
                </button>
                <a href="https://www.youtube.com/embed${el.trailer}" class="bg-purple-600 text-white w-30% py-2 px-2 rounded-lg hover:bg-purple-700">
                    Watch
                </a>
            </div>
        </div>
        
        `
        main.append(card)
    } );
}
nameSearch.forEach( el => {
    el.addEventListener("keyup", e => {
        let filterArr = db.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        renderSearchCards(filterArr);
    
    })
} );
// search part



// rating sort part
function ratingSorting() {
    rating.addEventListener('keyup', e => {
        const ratingAppend = db.filter( el => {
            if ( e.target.value == Math.trunc(el.reting) ) {
                    return el.reting
                }
        });
        renderSearchCards(ratingAppend)
        if ( e.target.value == '' ) {
      renderStartCards();
     }
    })
    rating.addEventListener('change', e => {
        const ratingAppend = db.filter( el => {
            if ( e.target.value == Math.trunc(el.reting) ) {
                    return el.reting
                }
        });
        renderSearchCards(ratingAppend)
        if ( e.target.value == '' ) {
      renderStartCards();
     }
    })
}
ratingSorting();
// rating sort parr



// categorie sort part
function categorySort() {
    let categoryArray = [];
    db.forEach(e => {
        e.category.forEach(el => {
            if(!categoryArray.includes(el)) {
                categoryArray.push(el);
            }
        })
    })
    categoryArray.sort();
    categoryArray.forEach(e => {
        const option = document.createElement("option");
        option.innerHTML = e;
        categorySelect.append(option);
    });
    categorySelect.addEventListener("change", e => {
        let categoryChange = db.filter(el => {
            return el.category.includes(e.target.value);
        })
        renderSearchCards(categoryChange);
    })
    
}
categorySort();
// categorie sort part



// sort letter part
function letterSort() {
    letterSelect.addEventListener("change", (e) => {
        if (e.target.value === "Aa - Zz") {
          let sortCardLetter = db.sort((a, b) => {
            return a.title.localeCompare(b.title);
          });
          console.log("v");
          renderSearchCards(sortCardLetter);
        } 
        else{
          let sortCardLetter = db.sort((a, b) => {
            return b.title.localeCompare(a.title);
          });
          console.log("c");
          renderSearchCards(sortCardLetter);
        }
        
      });
}
letterSort();
// sort letter part
