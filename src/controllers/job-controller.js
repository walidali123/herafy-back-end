import Job from '../models/job.js';

export const createJob = async (req, res) => {
  try {
    const { title, description, location, date, budget, craftsmanId } =
      req.body;

    const newJob = new Job({
      title,
      description,
      location,
      date,
      budget,
      craftsmanId,
    });

    const savedJob = await newJob.save();

    res
      .status(201)
      .json({ message: 'Job listing created successfully', listing: savedJob });
  } catch (error) {
    console.error('Error creating job listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
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
      return res.status(404).json({ error: 'Job listing not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error('Error retrieving job listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { title, description, location, date, budget } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { title, description, location, date, budget },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job listing not found' });
    }

    res.status(200).json({
      message: 'Job listing updated successfully',
      listing: updatedJob,
    });
  } catch (error) {
    console.error('Error updating job listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ error: 'Job listing not found' });
    }

    res.status(200).json({ message: 'Job listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting job listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
