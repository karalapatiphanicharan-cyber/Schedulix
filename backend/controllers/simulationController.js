const solveFCFS = require('../algorithms/fcfs');
const solveSJF = require('../algorithms/sjf');
const solveSRTF = require('../algorithms/srtf');
const solveRoundRobin = require('../algorithms/roundRobin');
const solvePriority = require('../algorithms/priority');

const simulate = (req, res) => {
  const { processes, algorithm, quantum } = req.body;

  if (!processes || !Array.isArray(processes) || processes.length === 0) {
    return res.status(400).json({ error: 'Processes are required' });
  }

  let result;

  try {
    switch (algorithm) {
      case 'FCFS':
        result = solveFCFS(processes);
        break;
      case 'SJF':
        result = solveSJF(processes);
        break;
      case 'SRTF':
        result = solveSRTF(processes);
        break;
      case 'RR':
        if (!quantum || quantum <= 0) {
          return res.status(400).json({ error: 'Valid quantum is required for Round Robin' });
        }
        result = solveRoundRobin(processes, quantum);
        break;
      case 'Priority':
        result = solvePriority(processes);
        break;
      default:
        return res.status(400).json({ error: 'Invalid algorithm' });
    }

    res.json(result);
  } catch (error) {
    console.error('Simulation error:', error);
    res.status(500).json({ error: 'Internal simulation error' });
  }
};

module.exports = {
  simulate
};
