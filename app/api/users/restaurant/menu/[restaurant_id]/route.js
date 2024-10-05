import dbConn from "@/config/dbconn";
import Menu from "@/models/menu";
import { NextResponse } from "next/server";

// Connect to the database
dbConn();

export const GET = async (req, { params }) => {
  try {
    const { restaurant_id } = params; // Extract restaurant_id from URL

    if (!restaurant_id) {
      return NextResponse.json({ message: "restaurant_id is required!" }, { status: 400 });
    }

    // Find the menu for the given restaurant_id
    const menu = await Menu.findOne({ restaurant_id });

    if (!menu) {
      return NextResponse.json({ message: "Menu not found!" }, { status: 404 });
    }

    // Return the menu items
    return NextResponse.json({ menu }, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};
