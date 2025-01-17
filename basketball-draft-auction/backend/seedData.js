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
      { name: "Taha", position: "Guard", contact: "1234567890", startingPrice: 50, auctioned: false },
      { name: "Ayaan", position: "Forward", contact: "0987654321", startingPrice: 60, auctioned: false },
      { name: "Maaz", position: "Center", contact: "1122334455", startingPrice: 70, auctioned: false },
      { name: "Ali Mamba", position: "Forward", contact: "9988776655", startingPrice: 80, auctioned: false },
      { name: "Zeyd", position: "Guard", contact: "7766554433", startingPrice: 40, auctioned: false },
      { name: "Khizer Ur Rehman", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Zeyd Sheikh", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Khiz Munir", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Noor Muhammad", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Sameer Salim", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Shahmir Abbas", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Azam Khawaja", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Abdullah Khan Durrani", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Zakaria Siddiqui", position: "Center", contact: "", startingPrice: 50, auctioned: false },
      { name: "Asad Mirza", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Zeeshan Makani", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Abeer Abid", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Muhammad Bin Arshad", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Aazan Ijlal", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Taimoor Zaheer", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Haider Nathani", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Hamza Khalid", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Faris Fayyaz", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Ali Usman Khan", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Syed Zohrab Chishty", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Salman Malik", position: "Center", contact: "", startingPrice: 50, auctioned: false },
      { name: "Muhammad Asad Anwar Alavi", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Rana Athar", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Ans Azhar", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Shayan Qadri", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Muhammad Haris", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Hamza Najib", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Saad Khan", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Maaz Zubairi", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Hasan Zafar", position: "Center", contact: "", startingPrice: 50, auctioned: false },
      { name: "Jamal Jaffer", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Hasan Motiwala", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Aisha Ijlal", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Pasha", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Ali Mutaqee", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Usman Khalid", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Safwan Shabu", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Taimoor Malik", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Khawaja Umer Usman", position: "Center", contact: "", startingPrice: 50, auctioned: false },
      { name: "Muhammad Fahad Khan", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Noman Azam", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Owais Khan", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Muhammad Mustafa", position: "Center", contact: "", startingPrice: 50, auctioned: false },
      { name: "Zia Ahmed", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Muhammad Ashar Abbasi", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Raja Jahanzaib", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Zafar Hasnain", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Usman Bashir", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Kenneth D Johnson", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Saad Akhtar", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Zuhair Naqvi", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Ali Asad Rajani", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Muhammad Yasir Ayub", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Areeb Ahmed", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Hamza Ali", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Danish Ali Khan", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Abdullah Anis Abbasi", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Haris Yousuf", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Mahad Tariq", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Zeeshan Ali", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Ashal Noorani", position: "Center", contact: "", startingPrice: 50, auctioned: false },
      { name: "Taha Zahid Khan", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Moiz", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Shahroze Show", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Shezar", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Tabriz (Tabby)", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Asad Ali Hashim", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Shakir Hashim", position: "Forward", contact: "", startingPrice: 50, auctioned: false },
      { name: "Ahaidh", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Abdullah Imam", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
      { name: "Ayyan Saeed", position: "Guard", contact: "", startingPrice: 50, auctioned: false },
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
