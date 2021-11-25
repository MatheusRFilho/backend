import mongoose from 'mongoose';

const lancheSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  idHamburgueria: {
    type: String,
    required: true,
  },
});

const Lanche = mongoose.model('Lanche', lancheSchema);
export default Lanche;
