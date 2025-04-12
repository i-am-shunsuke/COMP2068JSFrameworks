// Naming convention > controllers/routers are plural
// Import express and create router object
const express = require("express");
const router = express.Router();
// Import mongoose model to be used
const Project = require("../models/project");

// Moved middleware function to extensions/authentication.js to make it reusable across different routers
const AuthenticationMiddleware = require("../extensions/authentication");
// Custom Middleware function to check for an authenticated user
// function AuthenticationMiddleware(req, res, next) {
//     if (req.isAuthenticated()) { // returns true if the session was started
//         return next(); // calls the next middleware in the stack
//     }
//     else {
//         // user not authenticated
//         res.redirect("/login");
//     }
// }
// Configure GET/POST handlers
// Path relative to the one configured in app.js > /projects
// GET /projects/
router.get("/", async (req, res, next) => {
  // retrieve ALL data, and sort by dueDate
  let projects = await Project.find().sort([["day", "descending"]]);
  // render view
  res.render("projects/index", {
    title: "Project Tracker",
    dataset: projects,
    user: req.user,
  });
});
// GET /projects/add
router.get("/add", AuthenticationMiddleware, async (req, res, next) => {
//   let courseList = await Course.find().sort([["name", "ascending"]]);
  res.render("projects/add", {
    title: "Add a New Calory",
    user: req.user,
  });
});

// POST /projects/add
router.post("/add", AuthenticationMiddleware, async (req, res, next) => {
  // use the project module to save data to DB
  // use the new Project() method of the model
  // and map the fields with data from the request
  // newProject object is returned if operation was successful
  // save changes and redirect
  let newProject = new Project({
    day: req.body.day,
    calory: req.body.calory,
  });
  await newProject.save();
  res.redirect("/projects");
});

// GET /projects/delete/_id
// access parameters via req.params object
router.get("/delete/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let projectId = req.params._id;
  await Project.findByIdAndDelete(projectId);
  res.redirect("/projects");
});

// GET /projects/edit/_id
router.get("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let projectId = req.params._id;
  let projectData = await Project.findById(projectId);
//   let courseList = await Course.find().sort([["name", "ascending"]]);
  res.render("projects/edit", {
    title: "Edit Project Info",
    project: projectData,
    user: req.user,
  });
});

// POST /projects/edit/_id
router.post("/edit/:_id", AuthenticationMiddleware, async (req, res, next) => {
  let projectId = req.params._id;
  await Project.findByIdAndUpdate(
    { _id: projectId }, // filter to find the project to update
    {
      // updated data
      day: req.body.day,
      calory: req.body.calory,
    }
  );
  res.redirect("/projects");
});

// Export router object
module.exports = router;




// const express= require("express");
// const router=express.Router();

// // import the model
// const Project=require("../models/project");

// router.get("/", async(req, res, next)=>{
//     // retrieve all projects in the DB sorted by due date
//     let data=await Project.find().sort({dueDate: 1});

//     res.render("projects/index", {title: "Project Tracker", dataset: data});
// });


// router.get("/add", async(req, res, next)=>{
//     res.render("projects/add", {title: "Add a calory"});
// });

// router.post("/add", async(req, res, next)=>{
//     let newProject=new Project({
//         name: req.body.name,
//         dueDate: req.body.dueDate,
//         calory: req.body.calory,
//     })

//     await newProject.save();

//     res.redirect("/projects");
// });

// router.get("/delete/:_id", async (req, res, next)=>{
//     let projectId = req.params._id;

//     await Project.findByIdAndDelete(projectId);
//     res.redirect("/projects");
// });

// router.get("/edit/:_id",async(req, res, next)=>{
//     let projectId=req.params._id;
//     let project=await Project.findByIdAndDelete(projectId);

//     res.redirect("/projects/edit", {title: "Edit it", project: projectData});
// })


// router.post("/edit/:_id", async(req, res, next)=>{
//     let projectId=req.params._id;

//     await Project.findByIdAndDelete(
//         {_id: projectId},
//         {
//             name: req.body.name,
//             dueDate: req.body.dueDate,
//             calory: req.body.calory,
//             status: req.body.status,
//         }
//     );

//     res.redirect("/projects");
// });
// module.exports=router;