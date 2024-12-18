const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {

// store
    async store(req, res){
        const user =  await User.create(req.body);
        return res.json(user);
    },    
// destroy
    async destroy(req,res){
        let user = await User.findByIdAndDelete(req.params.id);
        return res.json(user);
    },
// update
    async update(req,res){
        let user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true}); 
        return res.json(user);
    },
// updatePassword
    async updatePassword(req, res) {
        const { password } = req.body;
        if (!password) return res.status(400).json({ error: 'Senha é obrigatória.' });

        const user = await User.findByIdAndUpdate(req.params.id, { password }, { new: true });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

        return res.json({ message: 'Senha atualizada com sucesso!', user });
      },
// show
     async show(req, res){
        let users = await User.find();
        return res.json(users);
    },
// show (email)
     async showe(req,res){
        let users = await User.find(
          { email : req.query.email}
                                   );
        return res.json(users);
    },
// count users
    async count(req, res) {
        const totalUsers = await User.countDocuments();
        return res.json({ total: totalUsers });
    },
// login
    async login(req, res) {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });
      if (!user) return res.status(401).json({ error: 'Credenciais inválidas.' });

      return res.json({ message: 'Login bem-sucedido!', user });
    },
// disable
    async disable(req, res) {
      const user = await User.findByIdAndUpdate(req.params.id, { disabled: true }, { new: true });
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

      return res.json({ message: 'Usuário desativado com sucesso!', user });
    },
// ativar
    async activate(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, { disabled: false }, { new: true });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

        return res.json({ message: 'Usuário ativado com sucesso!', user });
    }
};