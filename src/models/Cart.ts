import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
  },
  idHamburgueria: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  itens: {
    type: Array,
    required: true,
  },
});

const Lanche = mongoose.model('Lanche', cartSchema);
export default Lanche;
