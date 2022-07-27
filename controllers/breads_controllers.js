const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
  res.render('Index',
    {
      breads: Bread
    }
  )
  // res.send(Bread)
})

// CREATE
breads.post('/', (req, res) => {
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = 'true'
  } else {
    req.body.hasGluten = 'false'
  }
  Bread.push(req.body)
  res.send(Bread)
})
// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
  res.render('edit', {
    bread: Bread[req.params.indexArray],
    index: req.params.indexArray
  })
})


// SHOW
breads.get('/:arrayIndex', (req, res) => {
  if (Bread[req.params.arrayIndex]) {
    res.render('Show', {
      bread: Bread[req.params.arrayIndex],
      index: req.params.arrayIndex,
    })
  } else {
    res.render('404')
  }
})

// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})


module.exports = breads
