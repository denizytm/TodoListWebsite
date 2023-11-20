const Note = require("../models/Notes")
const mongoose = require("mongoose")

exports.index= async (req,res)=> {

    let perPage = 8;
    let page = req.query.page || 1;
  
    const locals = {
      title: "Dashboard",
      description: "Free NodeJS Notes App.",
    };
  
    try {

      const data = await Note.aggregate([
        { $sort: {  updatedAt: -1 , createdAt: -1} },
        { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
        {
          $project: {
            title: { $substr: ["$title", 0, 30] },
            body: { $substr: ["$body", 0, 100] },
          },
        },
      ])
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  
      const count = await Note.count();
  
        res.render('dashboard/index', {
        userName: req.user.firstName,
        locals,
        data,
        layout: "../views/layouts/dashboard",
        current: page,
        pages: Math.ceil(count / perPage)
      });
     } catch (error) {
      console.log(error);
    }
  };

exports.viewNote = async (req,res) => {

    const note = await Note.findById(req.params.id)
    .where({user : req.user.id}).lean()

    console.log(note);

    if(note) {

      res.render("dashboard/view-notes",{
        noteId : req.params.id,
        note,
        layout: 'layouts/dashboard',
      })

    }else {
      res.send("Something went wrong")
    }

}

exports.uptadeNote = async (req,res) => {

  try {

    const note = await Note.findOneAndUpdate(
      {_id : req.params.id},
      {
        title : req.body.title,
        body : req.body.body,
        updatedAt : Date.now
      }
      ).where({user : req.user.id})

      res.redirect(`/dashboard`)

  }catch(error){
    console.log(error);
  }

}

exports.deleteNote = async (req,res)=> {

  try {
 
    await Note.findOneAndDelete({_id : req.params.id})
    .where({user : req.user.id})

    res.redirect("/dashboard")

  } catch (error) {
    console.log(error);
  }

}

exports.addNote = async (req,res) => {

  const note = await Note.findById(req.params.id)
    .where({user : req.user.id}).lean()

    if(!note) {

      res.render("dashboard/add-note",{
        noteId : req.params.id,
        note,
        layout: 'layouts/dashboard',
      })

    }else {
      res.send("Something went wrong")
    }

}

exports.createNote = async (req,res)=> {

  req.body.user = req.user.id

  try{const newNote = await Note.create(req.body)
  console.log(newNote);

  res.redirect("/dashboard")
  }catch(error){
    console.log(error);
  }

}

exports.search = async (req,res)=> {

try {
  res.render("dashboard/search",{
    searchResults : "",
    layout : "layouts/dashboard",
  })

} catch (error) {
  console.log(error);
}

}


exports.searchSubmit = async (req,res)=> {

  try {

    let searchTerm = req.body.searchTerm
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g,"")

    const searchResults = await Note.find({
      $or : [
        {title : {$regex : new RegExp(searchNoSpecialChars,"i")}},
        {body : {$regex : new RegExp(searchNoSpecialChars,"i")}}
      ]
    }).where({user : req.user.id})

    res.render("dashboard/search",{
      searchResults ,
      layout : "layouts/dashboard",
    })

    } catch (error) {
    console.log(error);
  }

}
