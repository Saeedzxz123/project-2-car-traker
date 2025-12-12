const express = require('express');
const User =require('../models/user');
const router = express.Router();



router.get('/', async (req,res) =>{
    try{
    const currentUser = await User.findById(req.session.user._id)
    const {ownedCar} = currentUser;

    res.render('car/index.ejs',{ownedCar})
    }
    catch(error){
        res.redirect('/')
        console.log('error'+error)
    }
})


router.get('/new', async (req,res)=> {
    try{
        res.render('car/new.ejs')
    }
    catch(error){
        res.redirect('/')
        console.log('error'+error)
    }
})


router.post('/', async (req,res)=> {
    
    try{
    const currentUser = await User.findById(req.session.user._id)
    currentUser.ownedCar.push(req.body);
    await currentUser.save()
    res.redirect(`/users/${currentUser._id}/car`);
    }
    catch(error){
        res.redirect('/')
        console.log('error'+ error)
    }

})



router.get('/:id', async (req, res) => {
  try {

    const currentUser = await User.findById(req.session.user._id);
    const ownedCar = currentUser.ownedCar.id(req.params.id);
    res.render('car/show.ejs', { ownedCar });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});




router.get('/:id/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const ownedCar = currentUser.ownedCar.id(req.params.id);

    res.render('car/edit.ejs', {
      user: currentUser,
      ownedCar,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});




router.put('/:id', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const ownedCar = currentUser.ownedCar.id(req.params.id);

    ownedCar.set(req.body);
    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/car/${ownedCar._id}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    currentUser.ownedCar.id(req.params.id).deleteOne();
    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/car`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});






module.exports = router;