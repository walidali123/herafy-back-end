import Job from '../models/job.js';

export const createJob = async (req, res) => {
  try {
    const { title, description, location, date, budget } = req.body;

    const clientId = req.clientId;
    const newJob = new Job({
      title,
      description,
      location,
      date,
      budget,
      clientId,
    });

    await newJob.save();

    res.status(200).json({ message: 'Job listing created successfully' });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllJobsByClientId = async (req, res) => {
  const clientId = req.clientId;

  try {
    const jobs = await Job.find({ clientId: clientId });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error retrieving job listings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error('Error retrieving job listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
