import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Prisma, User } from '../generated/prisma';
import { z } from 'zod';

// ✅ Schema: Register
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(1).max(50),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(date => {
    const birth = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 18;
  }, { message: "Must be at least 18 years old" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;

// ✅ Schema: Login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET not defined");
}

// ✅ Register User
export const registerUser = async (
  data: RegisterInput
): Promise<{ user: Omit<User, 'password_hash'>; token: string }> => {
  const validationResult = registerSchema.safeParse(data);
  if (!validationResult.success) {
    throw new Error(`Invalid input: ${validationResult.error.errors.map(e => e.message).join(', ')}`);
  }

  const { email, password, displayName, birthDate } = validationResult.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const password_hash = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password_hash,
      display_name: displayName,
      birth_date: new Date(birthDate),
      looking_for_gender: [],
      relationship_type: [],
    },
  });

  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const { password_hash: _, ...userWithoutPassword } = newUser;

  return { user: userWithoutPassword, token };
};

// ✅ Login User
export const loginUser = async (
  data: LoginInput
): Promise<{ user: Omit<User, 'password_hash'>; token: string }> => {
  const validationResult = loginSchema.safeParse(data);
  if (!validationResult.success) {
    throw new Error(`Invalid input: ${validationResult.error.errors.map(e => e.message).join(', ')}`);
  }

  const { email, password } = validationResult.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const { password_hash: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};
