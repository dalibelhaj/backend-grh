const express = require ("express");
const cors = require ("cors");
const app = express();

var corsOptions = {
   origin:"*" 
  
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.roles;

db.sequelize.sync();
//  db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
//  initial();
// }); 




app.get("/", (req, res) => {
   res.json({ message: "Welcome to the application." });
  });

  require("./app/routes/employe.routes")(app);
  require("./app/routes/candidat.routes")(app);
  require("./app/routes/offremploit.routes")(app);
  require("./app/routes/entretien.routes")(app);
  require("./app/routes/offre_candidat.routes")(app);
  require("./app/routes/auth.routes")(app);
  require("./app/routes/user.routes")(app);
  require("./app/routes/recrutement.routes")(app);
  require("./app/routes/fixe_entretien.routes")(app);
  require("./app/routes/role.routes")(app);




app.use('/app/cv', express.static('./app/cv'));
app.use('/app/images', express.static('./app/images'));
app.use('/app/profileimg', express.static('./app/profileimg'));



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "admin"
  });
 
  Role.create({
    id: 2,
    name: "user"
  });
}