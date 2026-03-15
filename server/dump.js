const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./src/models/Project');
const fs = require('fs');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const projects = await Project.find();
  fs.writeFileSync('db_projects.json', JSON.stringify(projects, null, 2));
  console.log('Done');
  process.exit();
}
run();
