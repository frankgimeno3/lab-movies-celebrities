const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }]
}, {
    timestamps: true
});
//crear modelo a partir del movieSchema
const Movie = mongoose.model("Movie", movieSchema);
//exportar modelo
module.exports = Movie;