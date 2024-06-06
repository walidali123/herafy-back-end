import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
    enum: [
      '1 week',
      '2 weeks',
      '1 month',
      '3 months',
      '6 months',
      'more than 6 months',
    ],
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Knitting',
      'Carpentry',
      'Embroidery',
      'Plumbing',
      'TextileCrafting',
      'Welding',
      'Accessories',
      'Ceramics',
      'TextileWorks',
    ],
  },
  budget: {
    type: Number,
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
