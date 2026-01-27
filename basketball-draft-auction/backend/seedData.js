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
    console.log("Existing captains and players deleted");

    // Add captains
    
    const captains = [
      { name: "Taimour Malik", team: "Sharbat Sorcerors", budget: 900, initialBudget: 900, players: [] },
      { name: "Usman Khalid", team: "Jalebi Jets", budget: 900, initialBudget: 900, players: [] },
      { name: "Muhammad Taha Khan", team: "Khajoor Knights", budget: 1000, initialBudget: 1000, players: [] },
      { name: "Asad Anwar Alavi", team: "Pakora Phoenix", budget: 1000, initialBudget: 1000, players: [] },
      { name: "Ramish Nasir", team: "Samosa Spartans", budget: 1100, initialBudget: 1100, players: [] },
      { name: "Ans Azhar", team: "Fruitchaat Falcons", budget: 900, initialBudget: 900, players: [] },
    ];
    
    
    const savedCaptains = await Captain.insertMany(captains);

    // Add players
    const players = [
      { name: "Taimoor Zaheer", age: 26, position: "Guard", priorTeam: "Omega", availability: "100%", contact: "5'10" },
      { name: "Zafar Hasnain", age: 36, position: "Forward", priorTeam: "23SB", availability: "75%", contact: "5'11" },
      { name: "Muhammad Manzoor (MMR)", age: 22, position: "Guard", priorTeam: "T6", availability: "100%", contact: "5'9" },
      { name: "Muhammad Moayed Amir", age: 24, position: "Forward", priorTeam: "Ronins", availability: "75%", contact: "6'0" },
      { name: "Syed Shayan Ahmed Qadri", age: 24, position: "Forward", priorTeam: "Omega", availability: "100%", contact: "6'0" },
      { name: "Ali Ahmed Bhagat", age: 21, position: "Guard", priorTeam: "Bounce", availability: "100%", contact: "5'8" },
      { name: "Saad Shamsi", age: 37, position: "Forward", priorTeam: "Malir Trojans", availability: "100%", contact: "5'11" },
      { name: "Abeer Abid", age: 27, position: "Guard", priorTeam: "Void", availability: "100%", contact: "6'0" },
      { name: "Yash Jeetander Herwani", age: 20, position: "Forward", priorTeam: "Team X (Qualifiers)", availability: "75%", contact: "5'11" },
      { name: "Noor Muhammad", age: 22, position: "Guard", priorTeam: "DT Snipers", availability: "100%", contact: "5'7" },
      { name: "Muhammad Owais Khan", age: 31, position: "Guard", priorTeam: "Sabers", availability: "75%", contact: "5'7" },
      { name: "Syed Mehmood Haider Abidi", age: 27, position: "Guard", priorTeam: "Raiders", availability: "100%", contact: "5'11" },
      { name: "Shahmeer Abbas", age: 24, position: "Center", priorTeam: "23SB", availability: "100%", contact: "6'7" },
      { name: "Asad Imam", age: 32, position: "Guard", priorTeam: "Veterans", availability: "100%", contact: "5'11" },
      { name: "Abdullah Imam", age: 36, position: "Guard", priorTeam: "Veterans", availability: "100%", contact: "5'11" },
      { name: "Rana Athar", age: 26, position: "Forward", priorTeam: "Bounce", availability: "100%", contact: "6'1" },
      { name: "Ghazanfar Khan Niazi", age: 22, position: "Forward", priorTeam: "Malir Trojans", availability: "100%", contact: "6'3" },
      { name: "Ahad Amir Lodhi", age: 24, position: "Guard", priorTeam: "Omega", availability: "100%", contact: "5'11" },
      { name: "Mirza Affan Baig", age: 25, position: "Guard", priorTeam: "Rampage", availability: "100%", contact: "5'9" },
      { name: "Mustafa Faisal Bengali", age: 28, position: "Guard", priorTeam: "Sabers", availability: "50%", contact: "5'11" },
      { name: "Ayhan", age: 22, position: "Forward", priorTeam: "Omega", availability: "100%", contact: "6'0" },
      { name: "Ahmed Ali Khowaja", age: 25, position: "Center", priorTeam: "One unit", availability: "100%", contact: "6'0" },
      { name: "Feroz Ahmed", age: 24, position: "Forward", priorTeam: "Mavericks", availability: "75%", contact: "5'11" },
      { name: "Arbaz Hussain Khan", age: 20, position: "Forward", priorTeam: "Invaders", availability: "100%", contact: "6'1" },
      { name: "Zeeshan Makani", age: 34, position: "Forward", priorTeam: "23SB", availability: "75%", contact: "5'11" },
      { name: "Usama Khurram", age: 28, position: "Forward", priorTeam: "Malir Trojans", availability: "100%", contact: "5'11" },
      { name: "Asaam Taha", age: 32, position: "Forward", priorTeam: "Samosa Spartans", availability: "100%", contact: "6'1" },
      { name: "Abdul Ahad Bin Ali", age: 23, position: "Center", priorTeam: "LUMS", availability: "limited", contact: "6'2" },
      { name: "Anab Hamid", age: 36, position: "Guard", priorTeam: "Just Drive", availability: "100%", contact: "5'4" },
      { name: "Muhammad Arham Imran", age: 23, position: "Guard", priorTeam: "Void", availability: "weekends", contact: "5'11" },
      { name: "Muhammad Ashar Abbasi", age: 21, position: "Forward", priorTeam: "Raiders", availability: "100%", contact: "6'0" },
      { name: "Ali Mutaqee", age: 31, position: "Forward", priorTeam: "Bounce", availability: "100%", contact: "6'1" },
      { name: "Ayyan Fawad", age: 24, position: "Forward", priorTeam: "Ronins", availability: "100%", contact: "5'11" },
      { name: "Khizer ur Rehman", age: 27, position: "Guard", priorTeam: "Ronins", availability: "100%", contact: "5'8" },
      { name: "Zeyd Sheikh", age: 42, position: "Guard", priorTeam: "23SB", availability: "100%", contact: "5'11" },
      { name: "Shahmeer Zaheer", age: 29, position: "Guard", priorTeam: "Sabers", availability: "75%", contact: "5'10" },
      { name: "Maaz Yasir Zubairi", age: 24, position: "Guard", priorTeam: "Ronins", availability: "100%", contact: "5'8" },
      { name: "Tahir Zaman", age: 24, position: "Forward", priorTeam: "Void", availability: "75%", contact: "6'3" },
      { name: "Shahzain Malik", age: 34, position: "Guard", priorTeam: "23SB", availability: "100%", contact: "5'7" },
      { name: "Faraz Awan", age: 25, position: "Guard", priorTeam: "Null", availability: "100%", contact: "5'11" },
      { name: "Ammar Ali Shamoil", age: 29, position: "Guard", priorTeam: "Mambas", availability: "100%", contact: "5'10" },
      { name: "Mohsin Riaz", age: 35, position: "Center", priorTeam: "Bounce", availability: "100%", contact: "6'5" },
      { name: "Muhammad Sameer Ahmed", age: 27, position: "Guard", priorTeam: "Mambas", availability: "50%", contact: "5'10" },
      { name: "Aazan Ijlal", age: 22, position: "Guard", priorTeam: "Void", availability: "100%", contact: "6'0.5" },
      { name: "Rohaib Karim", age: 26, position: "Center", priorTeam: "Mambas", availability: "100%", contact: "6'3" },
      { name: "Muhammad Hassan", age: 18, position: "Forward", priorTeam: "Invaders", availability: "75%", contact: "6'2" },
      { name: "Ahmed Silat", age: 22, position: "Guard", priorTeam: "Kaizens", availability: "100%", contact: "6'0" },
      { name: "Muhammad Farooq Khan Niazi", age: 37, position: "Forward", priorTeam: "Mambas", availability: "100%", contact: "6'1" },
      { name: "Mahd Mansoor Khan", age: 18, position: "Guard", priorTeam: "Null", availability: "limited", contact: "5'8" },
      { name: "Syed Ali Akbar Zaidi", age: 20, position: "Forward", priorTeam: "Ronins", availability: "75%", contact: "6'0" },
      { name: "Muhammad Aaraiz Rizwan", age: 28, position: "Forward", priorTeam: "Sabers", availability: "100%", contact: "6'1" },
      { name: "Umer Khawaja", age: 28, position: "Center", priorTeam: "23SB", availability: "75%", contact: "6'1" },
      { name: "Salman Malik", age: 22, position: "Forward", priorTeam: "23SB", availability: "75%", contact: "5'9" },
      { name: "Syed Auj Haider Zaidi", age: 17, position: "Guard", priorTeam: "Null", availability: "100%", contact: "5'7" },
      { name: "Anas Ustarana", age: 33, position: "Forward", priorTeam: "Sabers", availability: "100%", contact: "6'3" },
      { name: "Mehdi Ladhubhai", age: 16, position: "Forward", priorTeam: "NBH nets", availability: "100%", contact: "6'4" },
      { name: "Ali Shabbir", age: 26, position: "Forward", priorTeam: "Mambas", availability: "100%", contact: "6'2" },
      { name: "Usama Abbasi", age: 27, position: "Forward", priorTeam: "Ronins", availability: "100%", contact: "6'3" },
      { name: "Muhammad Faaz Sohail", age: 19, position: "Forward", priorTeam: "Raiders", availability: "75%", contact: "5'11" },
      { name: "Uzair Baloch", age: 21, position: "Guard", priorTeam: "Raiders", availability: "weekends", contact: "5'9" },
      { name: "Sajeer Ullah", age: 18, position: "Forward", priorTeam: "Raiders", availability: "100%", contact: "6'3" },
      { name: "Mohammad Abdullah Haroon", age: 19, position: "Forward", priorTeam: "Mavericks", availability: "75%", contact: "6'1" },
      { name: "Mohammad Emad", age: 37, position: "Guard", priorTeam: "Mambas", availability: "75%", contact: "5'10" },
      { name: "Saad Abdul Basit Khan", age: 26, position: "Guard", priorTeam: "Mambas", availability: "100%", contact: "5'10" },
      { name: "Danial Mushtaq", age: 32, position: "Guard", priorTeam: "Null", availability: "limited", contact: "6'2" },
      { name: "Zain Ali", age: 23, position: "Guard", priorTeam: "Mambas", availability: "100%", contact: "6'0" },
      { name: "Adam Khan", age: 20, position: "Center", priorTeam: "Ronins", availability: "75%", contact: "6'3" },
      { name: "Noman Azam", age: 26, position: "Forward", priorTeam: "Mambas", availability: "50%", contact: "6'2" },
      { name: "Hasaan Waheed Punjwani", age: 33, position: "Guard", priorTeam: "Sabers", availability: "50%", contact: "5'10" },
      { name: "Asadullah Khan", age: 19, position: "Forward", priorTeam: "Mambas", availability: "75%", contact: "6'2" },
      { name: "MUSTANSIR HARIANAWALA", age: 17, position: "Forward", priorTeam: "None", availability: "50%", contact: "6'0" },
      { name: "Wasiq Mushtaq", age: 31, position: "Forward", priorTeam: "Sharbat Sorcerors", availability: "75%", contact: "6'1" },
      { name: "Ibrahim Umair", age: 19, position: "Guard", priorTeam: "New to Karachi", availability: "100%", contact: "5'9" },
      { name: "Muhammad Razi Moosa", age: 24, position: "Forward", priorTeam: "Null", availability: "75%", contact: "6'0" },
      { name: "Raaif Malik", age: 24, position: "Guard", priorTeam: "Omega", availability: "100%", contact: "6'0" },
      { name: "Noor Fatima", age: 28, position: "Forward", priorTeam: "Omega wlob", availability: "50%", contact: "5'4" },
      { name: "Rishad Hussain", age: 19, position: "Guard", priorTeam: "Void", availability: "100%", contact: "5'11" },
      { name: "Shahzain Habib", age: 18, position: "Center", priorTeam: "Backstreet Hoopers", availability: "100%", contact: "6'4" },
      { name: "Shiraz Alam", age: 34, position: "Center", priorTeam: "23SB", availability: "100%", contact: "5'7" },
      { name: "Khawaja Khizar Munir", age: 33, position: "Guard", priorTeam: "23SB", availability: "50%", contact: "5'6" },
      { name: "Muhammad Owais", age: 17, position: "Center", priorTeam: "Null", availability: "weekends", contact: "6'4" },
      { name: "Nabeegh Manzoor", age: 23, position: "Guard", priorTeam: "Kaizens", availability: "100%", contact: "5'10" },
      { name: "Shezar Muhammad", age: 32, position: "Guard", priorTeam: "Bounce", availability: "100%", contact: "5'11" },
      { name: "Muhammad Humam Raza", age: 20, position: "Guard", priorTeam: "23SB", availability: "50%", contact: "6'1" },
      { name: "Mohammad Taimoor Riaz", age: 31, position: "Guard", priorTeam: "Null", availability: "50%", contact: "5'11" },
      { name: "Ali Mikael Qizilbash", age: 24, position: "Guard", priorTeam: "Void", availability: "100%", contact: "6'1" },
      { name: "Abdul Moiz Khan Bazai", age: 22, position: "Forward", priorTeam: "Raiders", availability: "75%", contact: "6'0" },
      { name: "Mubashir Mansoor", age: 22, position: "Guard", priorTeam: "Raiders", availability: "75%", contact: "6'0" },
    ];
    
    
   
     // Set starting price to 50 for each player
    players.forEach(player => {
      player.startingPrice = 50;
    });
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
