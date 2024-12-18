const Task = require('../models/Task');
const mongoose = require('mongoose');

module.exports = {
// show
  async show(req, res) {
    const tasks = await Task.find();
    return res.json(tasks);
  },
// index (detalhes)
  async index(req, res) {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    return res.json(task);
  },
// solution
  async solution(req, res) {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    return res.json({ solution: task.solution || 'Nenhuma solução definida.' });
  },
// markAsDone
  async markAsDone(req, res) {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { completed: true },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    return res.json(task);
  },
// store
  async store(req, res) {
    const task = await Task.create(req.body);
    return res.json(task);
  },
// destroy
  async destroy(req, res) {
    const task = await Task.findByIdAndRemove(req.params.taskId);
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    return res.json({ message: 'Tarefa removida com sucesso!' });
  },
// update
  async update(req, res) {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    return res.json(task);
  },
// filtro (1) 
  async byPriority(req, res) {
    const { priority } = req.params;
    const tasks = await Task.find({ priority });
    return res.json(tasks);
  },




  
// prazo
  async setDeadline(req, res) {
    const { deadline } = req.body;
    if (!deadline) return res.status(400).json({ error: 'Prazo é obrigatório.' });

    const task = await Task.findByIdAndUpdate(req.params.taskId, { deadline }, { new: true });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });

    return res.json({ message: 'Prazo definido com sucesso!', task });
  },
// atrasadas
  async overdue(req, res) {
      const today = new Date();
      const tasks = await Task.find({ deadline: { $lt: today }, completed: false });
      return res.json(tasks);
  },
// assign
  async assign(req, res) {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'ID do usuário é obrigatório.' });

    const task = await Task.findByIdAndUpdate(req.params.taskId, { assignedTo: userId }, { new: true });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });

    return res.json({ message: 'Tarefa atribuída com sucesso!', task });
  },
// reopen
  async reopen(req, res) {
    const task = await Task.findByIdAndUpdate(req.params.taskId, { completed: false }, { new: true });
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });

    return res.json({ message: 'Tarefa reaberta com sucesso!', task });
  },
// deleteCompleted
  async deleteCompleted(req, res) {
    const result = await Task.deleteMany({ completed: true });
    return res.json({ message: 'Tarefas concluídas removidas com sucesso!', count: result.deletedCount });
  },
// atrasadas
  async overdue(req, res) {
    const tasks = await Task.find({ deadline: { $lt: new Date() }, completed: false });
    return res.json(tasks);
  },
// assignm
  async assignMultiple(req, res) {
    const { taskIds, userId } = req.body;
    if (!taskIds || !userId) return res.status(400).json({ error: 'IDs das tarefas e do usuário são obrigatórios.' });

    const tasks = await Task.updateMany({ _id: { $in: taskIds } }, { assignedTo: userId });
    return res.json({ message: 'Tarefas atribuídas com sucesso!', tasks });
  },
// cópia
  async duplicate(req, res) {
    try {
      const task = await Task.findById(req.params.taskId);
      if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });

      const newTask = new Task({ ...task.toObject(), _id: new mongoose.Types.ObjectId() });
      await newTask.save();

      return res.json({ message: 'Tarefa duplicada com sucesso!', newTask });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao duplicar tarefa' });
    }
  },
};