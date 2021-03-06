const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema;

const productSchema = new schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
      default: "Một sản phẩm từ HDH"
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    size: {
      type: [String],
      required: true
    },
    category: {
      main: String,
      sub: String
    },
    color: {
      type: [String],
      required: true
    },
    tags: {
      type: [String],
      required: false
    },
    images: {
      type: [String],
      required: true
    },
    dateAdded: {
      type: Date,
      required: false,
      default: Date.now
    },
    labels: {
      type: String,
      required: false
    },
    materials: {
      type: [String],
      required: false
    },
    buyCounts: {
      type: Number,
      required: false,
      default: 0
    },
    index: {
      type: Number,
      required: false,
      default: 0
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false
    },
    viewCounts: {
      type: Number,
      required: false,
      default: 0
    },
    sale: {
      type: Number,
      required: false,
      default: 0
    },
    cost: {
      type: Number,
      required: true,
      default: 0
    },
    comment: {
      total: {
        type: Number,
        require: false,
        default: 0
      },
      items: [
        {
          title: {
            type: String
          },
          content: {
            type: String
          },
          name: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          },
          star: {
            type: Number
          }
        }
      ]
    }
  },
  {
    collection: 'Products'
  }
);

productSchema.plugin(paginate);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;