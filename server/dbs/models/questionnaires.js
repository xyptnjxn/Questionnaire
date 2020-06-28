import mongoose from 'mongoose'
const Schema = mongoose.Schema
const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  questions: {
    type: Array,
    required: true
  }
})

export default mongoose.model('Questionnaire', QuestionSchema)
