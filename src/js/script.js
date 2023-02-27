"use strict";

movies.splice(200);

let db = movies.map(el => {
    return {
        title: el.title,
        year: el.year,
        category: el.categories,
        id: el.imdbId,
        reting: el.imdbRating,
        time: `${Math.trunc(el.runtime / 60)}H ${el.runtime % 60}m`,
        summary: el.summary,
        maxImg: el.bigThumbnail,
        minImg: el.smallThumbnail
    }
});

