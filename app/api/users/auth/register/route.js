import dbConn from "@/config/dbconn";
import User from "@/models/users";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// Connect to the database
dbConn();

export const POST = async (req) => {
  try {
    // Parse the request body
    const { name, email, password, phone, hostel } = await req.json();

    // Check if all required fields are provided
    if (!name || !email || !password || !phone) {
      return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists!" }, { status: 400 });
    }

    // Hash the password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user document
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      phone,
      hostel,
    });

    // Save the new user to the database
    await newUser.save();

    // Return a success response
    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};
