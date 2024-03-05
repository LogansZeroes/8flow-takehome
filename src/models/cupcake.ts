import mongoose from "mongoose"

const cupcakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  ingredients: [{type: String}]
});


const Cupcake = mongoose.model('Cupcake', cupcakeSchema);

export { Cupcake }