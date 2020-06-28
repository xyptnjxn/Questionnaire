import mongoose from 'mongoose'
const Schema = mongoose.Schema
const StatisticsSchema = new Schema({
  link: {
    type: String,
    required: true,
    unique: true
  },
  answers: {
    type: Array,
    required: true
  }
})

export default mongoose.model('Statistics', StatisticsSchema)
