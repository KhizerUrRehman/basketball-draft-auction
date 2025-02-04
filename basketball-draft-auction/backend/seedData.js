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
    //await Captain.deleteMany({});
    await Player.deleteMany({});
/*
    // Add captains
    
    const captains = [
      { name: "Zakaria", team: "Pakora Phoenix", budget: 1000, initialBudget: 1000, players: [] },
      { name: "Usman", team: "Khajoor Knights", budget: 1000, initialBudget: 1000, players: [] },
      { name: "Ammar", team: "Sharbat Sorcerors", budget: 1000, initialBudget: 1000, players: [] },
      { name: "Shehzar", team: "Samosa Spartans", budget: 1000, initialBudget: 1000, players: [] },
      { name: "Raamish", team: "Fruitchaat Falcons", budget: 1000, initialBudget: 1000, players: [] },
      { name: "Ans", team: "Dastarkhaan Dragons", budget: 1000, initialBudget: 1000, players: [] },
      { name: "Mohsin", team: "Chutney Chiefs", budget: 1000, initialBudget: 1000, players: [] },
      { name: "Kenny", team: "Wonton Wolves", budget: 1000, initialBudget: 1000, players: [] },
    ];
    
    
    const savedCaptains = await Captain.insertMany(captains);
*/
    // Add players
    const players = [
      { name: "Kenneth Johnson", age: 26, position: "Forward", priorTeam: "Mamba", availability: "Available through out", contact: "6'0" },
      { name: "Muhammad Zakaria Siddiqui", age: 24, position: "Center", priorTeam: "Omega", availability: "75% availability", contact: "6'3" },
      { name: "Ammar Ali Shamoil", age: 28, position: "Guard", priorTeam: "Mamba", availability: "100% availability", contact: "5'10" },
      { name: "Mohsin Riaz", age: 34, position: "Center", priorTeam: "Bounce", availability: "Available through out", contact: "6'5" },
      { name: "Shehzar Mohammad", age: 18, position: "Guard", priorTeam: "Bounce", availability: "Available through out", contact: "5'11" },
      { name: "Ans Azhar", age: 31, position: "Guard", priorTeam: "Omega", availability: "Available through out", contact: "6'2" },
      { name: "Raamish", age: 30, position: "Guard", priorTeam: "Mamba", availability: "100% availability", contact: "5'10" },
      { name: "Usman Khalid", age: 27, position: "Guard", priorTeam: "Omega", availability: "100% availability", contact: "5'10.5" },
      { name: "Abdullah Haroon", age: 18, position: "Forward", priorTeam: "Maverick", availability: "75% availability", contact: "6'1" },
      { name: "Umar Khalid", age: 30, position: "Forward", priorTeam: "OTHER", availability: "75% availability", contact: "5'10" },
      { name: "Shayyan Adnan", age: 19, position: "Forward", priorTeam: "Hustler", availability: "Available through out", contact: "6'1" },
      { name: "Zayd Adnan", age: 19, position: "Guard", priorTeam: "OTHER", availability: "75% availability", contact: "5'9" },
      { name: "Maaz Zubairi", age: 23, position: "Guard", priorTeam: "Ronin", availability: "Available through out", contact: "5'7" },
      { name: "Shaamir Ali Rahman", age: 18, position: "Forward", priorTeam: "OTHER", availability: "75% availability", contact: "5'11" },
      { name: "Kamil", age: 33, position: "Center", priorTeam: "Saber", availability: "50% availability", contact: "6'3" },
      { name: "Muhammad Kaif Ghori", age: 20, position: "Forward", priorTeam: "OTHER", availability: "Available through out", contact: "6'0" },
      { name: "Mohib Hasan", age: 24, position: "Guard", priorTeam: "Checkmate", availability: "weekends only", contact: "5'11" },
      { name: "Zain Ali", age: 22, position: "Forward", priorTeam: "Mamba", availability: "50% availability", contact: "6'0" },
      { name: "Asaam Taha", age: 32, position: "Center", priorTeam: "OTHER", availability: "Available through out", contact: "6'1" },
      { name: "Bilal Asad Khan", age: 19, position: "Guard", priorTeam: "OTHER", availability: "75% availability", contact: "5'9" },
      { name: "Muhammad Taha Adnan", age: 21, position: "Center", priorTeam: "OTHER", availability: "Available through out", contact: "6'3" },
      { name: "Abdullah Khurram", age: 22, position: "Forward", priorTeam: "Bahria", availability: "Available through out", contact: "6'1" },
      { name: "Momin", age: 21, position: "Guard", priorTeam: "Bounce", availability: "Available through out", contact: "5'10" },
      { name: "Usman Khawaja", age: 26, position: "Guard", priorTeam: "Maverick", availability: "Available through out", contact: "5'4" },
      { name: "Sameer Ahmed", age: 26, position: "Guard", priorTeam: "Mamba", availability: "50% availability", contact: "5'9" },
      { name: "Behram Jan", age: 21, position: "Guard", priorTeam: "Raider", availability: "Available through out", contact: "5'8" },
      { name: "Uzair Baloch", age: 20, position: "Guard", priorTeam: "Raider", availability: "Available through out", contact: "5'10" },
      { name: "Mubashir Mansoor", age: 21, position: "Forward", priorTeam: "Raider", availability: "Available through out", contact: "6'1" },
      { name: "Muhammad Mutahir Abbas", age: 24, position: "Forward", priorTeam: "Ronin", availability: "Available through out", contact: "6'1" },
      { name: "Nabeegh", age: 22, position: "Guard", priorTeam: "Ronin", availability: "Available through out", contact: "5'11" },
      { name: "Haider Haroon", age: 26, position: "Guard", priorTeam: "Saber", availability: "75% availability", contact: "5'10" },
      { name: "Khanzada Ashhad Ali Khan", age: 23, position: "Forward", priorTeam: "OTHER", availability: "Available through out", contact: "6'2" },
      { name: "Ali Raza", age: 33, position: "Guard", priorTeam: "Malir Trojan", availability: "Available through out", contact: "N/A" },
      { name: "Ahad Lodhi", age: 23, position: "Guard", priorTeam: "Omega", availability: "Available through out", contact: "5'11" },
      { name: "Muhammad Aslam Aman", age: 18, position: "Guard", priorTeam: "OTHER", availability: "75% availability", contact: "5'8" },
      { name: "Kamil Mustafa", age: 19, position: "Guard", priorTeam: "Void", availability: "Available through out", contact: "5'10" },
      { name: "Asfand Yar Abbasi", age: 16, position: "Guard", priorTeam: "OTHER", availability: "Available through out", contact: "5'10" },
      { name: "Asadullah Khan", age: 18, position: "Center", priorTeam: "Void", availability: "Available through out", contact: "6'3" },
      { name: "Zakariya Samir", age: 19, position: "Forward", priorTeam: "Raider", availability: "75% availability", contact: "5'11" },
      { name: "Ayyan Bin Fawad", age: 23, position: "Forward", priorTeam: "Ronin", availability: "Available through out", contact: "5'11" },
      { name: "Saad Tariq", age: 33, position: "Center", priorTeam: "OTHER", availability: "Available through out", contact: "6'3" },
      { name: "Wasiq Mushtaq", age: 30, position: "Forward", priorTeam: "OTHER", availability: "Available through out", contact: "N/A" },
      { name: "Ameen Mubashir", age: 17, position: "Forward", priorTeam: "OTHER", availability: "Available through out", contact: "6'1" },
      { name: "Aazan Ijlal", age: 21, position: "Guard", priorTeam: "Void", availability: "Available through out", contact: "6'0.5" },
      { name: "MMR", age: 21, position: "Guard", priorTeam: "T6", availability: "Available through out", contact: "5'7" },
      { name: "Abdullah Anis Abbasi", age: 23, position: "Forward", priorTeam: "Mamba", availability: "Available through out", contact: "5'11" },
      { name: "Hasaan Punjwani", age: 32, position: "Guard", priorTeam: "Saber", availability: "75% availability", contact: "5'10" },
      { name: "Rohaib Karim", age: 25, position: "Center", priorTeam: "Ronin", availability: "Available through out", contact: "6'4" },
      { name: "Khizer Ur Rehman", age: 26, position: "Guard", priorTeam: "Ronin", availability: "Available through out", contact: "5'8" },
      { name: "Muhammad Ahmed Silat", age: 21, position: "Guard", priorTeam: "Hustler", availability: "Available through out", contact: "6'0" },
      { name: "Arbaz Hussain Khan", age: 19, position: "Forward", priorTeam: "Omega", availability: "Available through out", contact: "6'1" },
      { name: "Abdullah Imam", age: 32, position: "Guard", priorTeam: "Bounce", availability: "Available through out", contact: "5'1" },
      { name: "Syed Ali Akbar Zaidi", age: 19, position: "Forward", priorTeam: "Ronin", availability: "75% availability", contact: "6'" },
      { name: "Zeeshan Makani", age: 33, position: "Forward", priorTeam: "23Sb", availability: "Available through out", contact: "6ft" },
      { name: "Asad Mirza", age: 35, position: "Forward", priorTeam: "Bounce", availability: "Available through out", contact: "5'11.5" },
      { name: "Ghazanfar Khan Niazi", age: 21, position: "Center", priorTeam: "Malir Trojan", availability: "Available through out", contact: "6'3" },
      { name: "Taimour Malik", age: 20, position: "Guard", priorTeam: "23Sb", availability: "Available through out", contact: "6'1" },
      { name: "Ayhan Hussain", age: 21, position: "Forward", priorTeam: "Void", availability: "Available through out", contact: "6'1" },
      { name: "Anas Usman", age: 32, position: "Guard", priorTeam: "Bounce", availability: "Available through out", contact: "6'3" },
      { name: "Salman Malik", age: 21, position: "Center", priorTeam: "23Sb", availability: "Available through out", contact: "6'1" },
      { name: "Matias", age: 20, position: "Forward", priorTeam: "Saber", availability: "Available through out", contact: "5'11" },
      { name: "Noor Muhammad", age: 21, position: "Guard", priorTeam: "OTHER", availability: "Available through out", contact: "5'7" },
      { name: "Syed Mehmood Haider Abidi", age: 26, position: "Guard", priorTeam: "Checkmate", availability: "Available through out", contact: "5'10.5" },
      { name: "Zeyd Sheikh", age: 41, position: "Guard", priorTeam: "23Sb", availability: "Available through out", contact: "5'11" },
      { name: "Mustafa Bengali", age: 27, position: "Forward", priorTeam: "Saber", availability: "Available through out", contact: "5'11" },
      { name: "Ali Shabbir", age: 25, position: "Forward", priorTeam: "Mamba", availability: "Available through out", contact: "6'2" },
      { name: "Rana Athar", age: 25, position: "Forward", priorTeam: "Bounce", availability: "75% availability", contact: "6ft" },
      { name: "Azam Khawaja", age: 28, position: "Forward", priorTeam: "23Sb", availability: "Available through out", contact: "6'1" },
      { name: "Ashar Abbasi", age: 21, position: "Forward", priorTeam: "Raider", availability: "Available through out", contact: "6" },
      { name: "Aaraiz", age: 27, position: "Forward", priorTeam: "Saber", availability: "Available through out", contact: "6" },
      { name: "Abeer Abid", age: 26, position: "Guard", priorTeam: "Void", availability: "Available through out", contact: "6" },
      { name: "Abeer Jawad (Bhaloo)", age: 18, position: "Forward", priorTeam: "Void", availability: "Available through out", contact: "6ft" },
      { name: "Taimoor Zaheer", age: 25, position: "Guard", priorTeam: "Omega", availability: "Available through out", contact: "5'11" },
      { name: "Muhammad Saad Shamsi", age: 37, position: "Forward", priorTeam: "Saber", availability: "Available through out", contact: "5'11" },
      { name: "Owais Khan", age: 30, position: "Guard", priorTeam: "Saber", availability: "50% availability", contact: "5'7" },
      { name: "Rishad Hussain", age: 18, position: "Guard", priorTeam: "Void", availability: "75% availability", contact: "6'0"},
      { name: "Ali Ahmed Bhagat", age: 20, position: "Guard", priorTeam: "Hustler", availability: "100% availability", contact: "5'9" },
      { name: "Asad Alavi", age: 30, position: "Guard", priorTeam: "Saber", availability: "100% availability", contact: "5'9" },
      { name: "Shahzain Malik", age: 30, position: "Guard", priorTeam: "Saber", availability: "100% availability", contact: "5'6" },
      { name: "Moiz Khan Bazai", age: 21, position: "Forward", priorTeam: "Raider", availability: "75%", contact: "6'0" },
      { name: "Umer Khawaja", age: 27, position: "Center", priorTeam: "23Sb", availability: "75% availability", contact: "6'1" },
      { name: "Noman Azam", age: 25, position: "Forward", priorTeam: "Mamba", availability: "100% availability", contact: "6'2" },
      { name: "Haris Khan Bazai", age: 19, position: "Forward", priorTeam: "Other", availability: "100% availability", contact: "6'2" },
      { name: "Raja", age: 33, position: "Guard", priorTeam: "Mamba", availability: "75% availability", contact: "5'11" },
      { name: "Tabby", age: 35, position: "Forward", priorTeam: "Other", availability: "Unknown", contact: "6'1" },
      { name: "Ahaidh", age: 35, position: "Center", priorTeam: "Other", availability: "75%", contact: "6'6" },
      { name: "Ali Akbar", age: 34, position: "Center", priorTeam: "Other", availability: "100%", contact: "5'8" },
      { name: "Asad Hashim", age: 38, position: "Guard", priorTeam: "Other", availability: "Unknown", contact: "5'11" },
      { name: "Aisha Ijlal", age: 24, position: "Guard", priorTeam: "Omega", availability: "100%", contact: "5'6" },
      { name: "Zafar", age: 34, position: "Forward", priorTeam: "23SB", availability: "100%", contact: "6'0" }
    ];
    
     // Set starting price to 50 for each player
    players.forEach(player => {
      player.startingPrice = 50;
    });
    const savedPlayers = await Player.insertMany(players);

    console.log("Data seeded successfully");
    //console.log("Captains:", savedCaptains);
    console.log("Players:", savedPlayers);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

// Run the seed script
seedData();
