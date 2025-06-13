const Agent = require('../models/Agent');
const DeliveryOrder = require('../models/Order');

exports.assignDeliveryAgent = async (req, res) => {
  try {
    const agent = await Agent.findOne({ isAvailable: true });

    if (!agent) return res.status(400).json({ error: 'No agents available' });

    agent.isAvailable = false;
    await agent.save();

    const order = await DeliveryOrder.create({
      orderId: req.body.orderId,
      agentId: agent._id
    });

    res.status(201).json({ message: 'Agent assigned', agentId: agent._id });
  } catch (err) {
    res.status(500).json({ error: 'Assignment failed' });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await DeliveryOrder.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (status === 'delivered') {
      const agent = await Agent.findById(order.agentId);
      if (agent) {
        agent.isAvailable = true;
        await agent.save();
      }
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Status update failed' });
  }
};
