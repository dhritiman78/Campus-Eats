import dbConn from "@/config/dbconn";
import User from "@/models/users";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
var jwt = require('jsonwebtoken');

// Connect to the database
dbConn();

export const POST = async (req) => {
  try {
    // Parse the request body to get email and password
    const { email, password } = await req.json();

    // Check if both fields are provided
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required!" }, { status: 400 });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials!" }, { status: 401 });
    }

    // If password matches, return a success message (or generate JWT token if needed)
    var token = jwt.sign({user: user._id}, process.env.NEXT_JWT_SECRET, {expiresIn: '24h'});
    return NextResponse.json({ message: "Login successful!", token, status: 200 });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};
