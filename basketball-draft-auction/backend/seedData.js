const mongoose = require("mongoose");
const Captain = require("./models/Captain");
const Player = require("./models/Player");

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:admin123@14900.xpyfq.mongodb.net/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Seed Data
const seedData = async () => {
  await connectDB();

  try {
    // Clear existing data
    await Captain.deleteMany({});
    await Player.deleteMany({});

// Add captains
const captains = [
  { name: "Shahzain", team: "Pakora", budget: 1100, initialBudget: 1100, players: [] },
  { name: "Usman Khalid", team: "Knights", budget: 1000, initialBudget: 1000, players: [] },
  { name: "Ammar", team: "Warriors", budget: 1100, initialBudget: 1100, players: [] },
  { name: "Zain", team: "Titans", budget: 1000, initialBudget: 1000, players: [] },
  { name: "Shehzar", team: "Gladiators", budget: 1150, initialBudget: 1150, players: [] },
  { name: "Ramish", team: "Falcons", budget: 1050, initialBudget: 1050, players: [] },
  { name: "Ans", team: "Avengers", budget: 1000, initialBudget: 1000, players: [] },
  { name: "Mohsin", team: "Raptors", budget: 950, initialBudget: 950, players: [] },
  { name: "Aaraiz", team: "Hawks", budget: 1000, initialBudget: 1000, players: [] },
];

    const savedCaptains = await Captain.insertMany(captains);

    // Add players
    const players = [
      { name: "Taha", position: "Guard", contact: "1234567890", startingPrice: 50, auctioned: false, priorTeam: "Team A", availability: "Available", age: 25 },
      { name: "Ayaan", position: "Forward", contact: "0987654321", startingPrice: 60, auctioned: false, priorTeam: "Team B", availability: "Available", age: 24 },
      { name: "Maaz", position: "Center", contact: "1122334455", startingPrice: 70, auctioned: false, priorTeam: "Team C", availability: "Available", age: 26 },
      { name: "Ali Mamba", position: "Forward", contact: "9988776655", startingPrice: 80, auctioned: false, priorTeam: "Team D", availability: "Available", age: 23 },
      { name: "Zeyd", position: "Guard", contact: "7766554433", startingPrice: 40, auctioned: false, priorTeam: "Team E", availability: "Available", age: 25 },
      { name: "Khizer Ur Rehman", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team F", availability: "Available", age: 24 },
      { name: "Zeyd Sheikh", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team G", availability: "Available", age: 26 },
      { name: "Khiz Munir", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team H", availability: "Available", age: 25 },
      { name: "Noor Muhammad", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team I", availability: "Available", age: 27 },
      { name: "Sameer Salim", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team J", availability: "Available", age: 24 },
      { name: "Shahmir Abbas", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team K", availability: "Available", age: 25 },
      { name: "Azam Khawaja", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team L", availability: "Available", age: 26 },
      { name: "Abdullah Khan Durrani", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team M", availability: "Available", age: 24 },
      { name: "Zakaria Siddiqui", position: "Center", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team N", availability: "Available", age: 25 },
      { name: "Asad Mirza", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team O", availability: "Available", age: 26 },
      { name: "Zeeshan Makani", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team P", availability: "Available", age: 23 },
      { name: "Abeer Abid", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team Q", availability: "Available", age: 24 },
      { name: "Muhammad Bin Arshad", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team R", availability: "Available", age: 25 },
      { name: "Aazan Ijlal", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team S", availability: "Available", age: 26 },
      { name: "Taimoor Zaheer", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team T", availability: "Available", age: 24 },
      { name: "Haider Nathani", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team U", availability: "Available", age: 25 },
      { name: "Hamza Khalid", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team V", availability: "Available", age: 26 },
      { name: "Faris Fayyaz", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team W", availability: "Available", age: 23 },
      { name: "Ali Usman Khan", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team X", availability: "Available", age: 24 },
      { name: "Syed Zohrab Chishty", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team Y", availability: "Available", age: 25 },
      { name: "Salman Malik", position: "Center", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team Z", availability: "Available", age: 26 },
      { name: "Muhammad Asad Anwar Alavi", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team A", availability: "Available", age: 24 },
      { name: "Rana Athar", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team B", availability: "Available", age: 25 },
      { name: "Ans Azhar", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team C", availability: "Available", age: 26 },
      { name: "Shayan Qadri", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team D", availability: "Available", age: 23 },
      { name: "Muhammad Haris", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team E", availability: "Available", age: 24 },
      { name: "Hamza Najib", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team F", availability: "Available", age: 25 },
      { name: "Saad Khan", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team G", availability: "Available", age: 26 },
      { name: "Maaz Zubairi", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team H", availability: "Available", age: 24 },
      { name: "Hasan Zafar", position: "Center", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team I", availability: "Available", age: 25 },
      { name: "Jamal Jaffer", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team J", availability: "Available", age: 26 },
      { name: "Hasan Motiwala", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team K", availability: "Available", age: 23 },
      { name: "Aisha Ijlal", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team L", availability: "Available", age: 24 },
      { name: "Pasha", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team M", availability: "Available", age: 25 },
      { name: "Ali Mutaqee", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team N", availability: "Available", age: 26 },
      { name: "Usman Khalid", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team O", availability: "Available", age: 24 },
      { name: "Safwan Shabu", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team P", availability: "Available", age: 25 },
      { name: "Taimoor Malik", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team Q", availability: "Available", age: 26 },
      { name: "Khawaja Umer Usman", position: "Center", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team R", availability: "Available", age: 23 },
      { name: "Muhammad Fahad Khan", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team S", availability: "Available", age: 24 },
      { name: "Noman Azam", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team T", availability: "Available", age: 25 },
      { name: "Owais Khan", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team U", availability: "Available", age: 26 },
      { name: "Muhammad Mustafa", position: "Center", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team V", availability: "Available", age: 24 },
      { name: "Zia Ahmed", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team W", availability: "Available", age: 25 },
      { name: "Muhammad Ashar Abbasi", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team X", availability: "Available", age: 26 },
      { name: "Raja Jahanzaib", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team Y", availability: "Available", age: 23 },
      { name: "Zafar Hasnain", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team Z", availability: "Available", age: 24 },
      { name: "Usman Bashir", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team A", availability: "Available", age: 25 },
      { name: "Kenneth D Johnson", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team B", availability: "Available", age: 26 },
      { name: "Saad Akhtar", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team C", availability: "Available", age: 24 },
      { name: "Zuhair Naqvi", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team D", availability: "Available", age: 25 },
      { name: "Ali Asad Rajani", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team E", availability: "Available", age: 26 },
      { name: "Muhammad Yasir Ayub", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team F", availability: "Available", age: 23 },
      { name: "Areeb Ahmed", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team G", availability: "Available", age: 24 },
      { name: "Hamza Ali", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team H", availability: "Available", age: 25 },
      { name: "Danish Ali Khan", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team I", availability: "Available", age: 26 },
      { name: "Abdullah Anis Abbasi", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team J", availability: "Available", age: 24 },
      { name: "Haris Yousuf", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team K", availability: "Available", age: 25 },
      { name: "Mahad Tariq", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team L", availability: "Available", age: 26 },
      { name: "Zeeshan Ali", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team M", availability: "Available", age: 23 },
      { name: "Ashal Noorani", position: "Center", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team N", availability: "Available", age: 24 },
      { name: "Taha Zahid Khan", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team O", availability: "Available", age: 25 },
      { name: "Moiz", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team P", availability: "Available", age: 26 },
      { name: "Shahroze Show", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team Q", availability: "Available", age: 24 },
      { name: "Shezar", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team R", availability: "Available", age: 25 },
      { name: "Tabriz (Tabby)", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team S", availability: "Available", age: 26 },
      { name: "Asad Ali Hashim", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team T", availability: "Available", age: 23 },
      { name: "Shakir Hashim", position: "Forward", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team U", availability: "Available", age: 24 },
      { name: "Ahaidh", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team V", availability: "Available", age: 25 },
      { name: "Abdullah Imam", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team W", availability: "Available", age: 26 },
      { name: "Ayyan Saeed", position: "Guard", contact: "", startingPrice: 50, auctioned: false, priorTeam: "Team X", availability: "Available", age: 24 },
    ];
    

    const savedPlayers = await Player.insertMany(players);

    console.log("Data seeded successfully");
    console.log("Captains:", savedCaptains);
    console.log("Players:", savedPlayers);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

// Run the seed script
seedData();
