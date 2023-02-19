const router = require("express").Router();

const Movie = require("../models/Movie.model")

const Celebrity = require("../models/Celebrity.model")

router.get("/", (req, res, next) => {
    Movie.find()
        .then(movie => {
            res.render("movies/movies", { movie })
        })
        .catch(err => next(err))

})

router.get("/create", (req, res, next) => {
    Celebrity.find()
        .then(celebrity => {
            res.render("movies/new-movie", { celebrity })
        })
        .catch(err => { next(err) })
})

router.post("/create", (req, res, next) => {
    let { title, genre, plot, cast } = req.body
    Movie.create({ title, genre, plot, cast })    
        .then(result => {
            res.redirect("/movies")
        })
        .catch(res.render("movies/new-movie"))
})

router.get("/:id", (req, res, next) => {
    let idMovie = req.params.id
    Movie.findById(idMovie)
        .populate("cast")
        .then(result => {
            res.render("movies/movie-details", { result })
        })
        .catch(err => next(err))
})

router.post("/:id/delete", (req, res, next) => {
    let idMovie = req.params.id
    Movie.findByIdAndRemove(idMovie)
        .then(result => {
            res.redirect("/movies")
        })
        .catch(err => next(err))
})

router.get("/:id/edit", (req, res, next) => {
    let idMovie = req.params.id
    Movie.findById(idMovie)
        .then(result => {
            let pelicula = result;
            Celebrity.find()
                .then(result => {
                    let actores = result;
                    res.render("movies/edit-movie", { pelicula, actores })
                })
        })
        .catch(err => next(err))
})

router.post("/:id/edit", (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    let idMovie = req.params.id
    Movie.findByIdAndUpdate(idMovie, { title, genre, plot, cast })
        .then(result => {
            res.redirect(`/movies/${idMovie}`)
        })
        .catch(err => next(err))

})

module.exports = router;