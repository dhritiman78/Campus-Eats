import dbConn from "@/config/dbconn";
import Menu from "@/models/menu";
import { NextResponse } from "next/server";

// Connect to the database
dbConn();

export const POST = async (req) => {
  try {
    // Parse the request body
    const { restaurant_id, items, passkey } = await req.json();
    if (passkey !== process.env.NEXT_PASSKEY) {
      return NextResponse.json({ message: "Invalid passkey!" }, { status: 401 });
    } 

    // Find an existing menu for the given restaurant
    const existingMenu = await Menu.findOne({ restaurant_id });

    if (existingMenu) {
      // Add new items to the existing menu
      items.forEach((item) => {
        // Check if the item already exists by name
        const itemExists = existingMenu.items.some(
          (existingItem) => existingItem.name === item.name
        );

        if (!itemExists) {
          existingMenu.items.push(item); // Add the new item if it doesn't exist
        }
      });

      await existingMenu.save(); // Save the updated menu

      return NextResponse.json({ message: "Menu updated successfully!" });
    } else {
      // If no existing menu, create a new one
      const newMenu = new Menu({
        restaurant_id,
        items,
      });

      await newMenu.save(); // Save the new menu

      return NextResponse.json({ message: "New menu created successfully!" });
    }
  } catch (error) {
    console.error("Error adding menu:", error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};
