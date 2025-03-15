import dbConnect from "@/lib/db";
import User, { IUser } from "@/models/User";
import { ObjectId } from "mongodb";

// Get user by ID
export async function getUserById(id: string) {
  await dbConnect();

  try {
    // Ensure valid ObjectID
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const user = await User.findById(id).select('-passwordHash -salt');

    if (!user) {
      return null;
    }

    // Convert Mongoose document to plain object
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

// Get user by email
export async function getUserByEmail(email: string) {
  await dbConnect();

  try {
    const user = await User.findOne({
      email: email.toLowerCase()
    }).select('-passwordHash -salt');

    if (!user) {
      return null;
    }

    // Convert Mongoose document to plain object
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

// Create a new user
export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'editor';
  avatar?: string;
}) {
  await dbConnect();

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      email: userData.email.toLowerCase()
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const user = new User({
      name: userData.name,
      email: userData.email.toLowerCase(),
      role: userData.role || 'editor',
      avatar: userData.avatar,
      isActive: true,
    });

    // Set password
    user.setPassword(userData.password);

    // Save user
    await user.save();

    // Return user without password fields
    const createdUser = user.toObject();
    delete createdUser.passwordHash;
    delete createdUser.salt;

    return createdUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Update user details
export async function updateUser(
  id: string,
  userData: Partial<{
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'editor';
    avatar: string;
    isActive: boolean;
  }>
) {
  await dbConnect();

  try {
    // Find user
    const user = await User.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    // Update fields
    if (userData.name) user.name = userData.name;
    if (userData.email) user.email = userData.email.toLowerCase();
    if (userData.role) user.role = userData.role;
    if (userData.avatar) user.avatar = userData.avatar;
    if (userData.isActive !== undefined) user.isActive = userData.isActive;

    // Update password if provided
    if (userData.password) {
      user.setPassword(userData.password);
    }

    // Save changes
    await user.save();

    // Return updated user without password fields
    const updatedUser = user.toObject();
    delete updatedUser.passwordHash;
    delete updatedUser.salt;

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Get all users (admin function)
export async function getAllUsers() {
  await dbConnect();

  try {
    const users = await User.find()
      .select('-passwordHash -salt')
      .sort({ createdAt: -1 });

    // Convert Mongoose documents to plain objects
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
}

// Delete a user
export async function deleteUser(id: string) {
  await dbConnect();

  try {
    const result = await User.findByIdAndDelete(id);

    if (!result) {
      throw new Error('User not found');
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Change password
export async function changePassword(
  id: string,
  currentPassword: string,
  newPassword: string
) {
  await dbConnect();

  try {
    // Find user
    const user = await User.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    if (!user.validatePassword(currentPassword)) {
      throw new Error('Current password is incorrect');
    }

    // Set new password
    user.setPassword(newPassword);

    // Save changes
    await user.save();

    return { success: true };
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
}
