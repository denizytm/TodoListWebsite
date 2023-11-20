
exports.index = async (req,res)=> {

    const locals = {
        title : "Home page",
        description : "Home app"
    }

    res.render("index",{
        locals,
        layout : "layouts/front-page.ejs"
    })
    
}

exports.about = async (req,res)=> {

    const locals = {
        title : "About page",
        description : "About"
    }

    res.render("about",{
        locals
    })

}
