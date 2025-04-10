import { registerUser, RegisterInput, loginUser, LoginInput } from '../authService';
import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// מוקים לתלויות
jest.mock('../../lib/prisma', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

const mockedPrisma = prisma as unknown as {
  user: {
    findUnique: jest.Mock;
    create: jest.Mock;
  };
};
const mockedBcrypt = bcrypt as unknown as {
  hash: jest.Mock;
  compare: jest.Mock;
};
const mockedJwt = jwt as unknown as {
  sign: jest.Mock;
};

describe('Auth Service - registerUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  const validInput: RegisterInput = {
    email: 'test@example.com',
    password: 'password123',
    displayName: 'Test User',
    birthDate: '2000-01-01',
  };

  it('should register a new user successfully', async () => {
    mockedPrisma.user.findUnique.mockResolvedValue(null);
    mockedBcrypt.hash.mockResolvedValue('hashed_password');

    const mockNewUser = {
      id: 1,
      email: validInput.email,
      password_hash: 'hashed_password',
      display_name: validInput.displayName,
      birth_date: new Date(validInput.birthDate),
      created_at: new Date(),
      updated_at: new Date(),
      last_active_at: new Date(),
      gender: null,
      looking_for_gender: [],
      relationship_type: [],
      city: null,
      location: null,
      bio: null,
      profile_image_url: null,
      additional_photos: null,
      preferred_age_min: 18,
      preferred_age_max: 99,
      preferred_distance_km: 50,
      is_active: true,
      is_paid: false,
      paid_until: null,
      verified_email: false,
      consents: {},
    };

    mockedPrisma.user.create.mockResolvedValue(mockNewUser);
    mockedJwt.sign.mockReturnValue('test_token');

    const result = await registerUser(validInput);

    expect(result.token).toBe('test_token');
    expect(result.user.email).toBe(validInput.email);
    expect((result.user as any).password_hash).toBeUndefined(); // לוודא שלא מוחזר
  });

  it('should throw an error if email already exists', async () => {
    mockedPrisma.user.findUnique.mockResolvedValue({ id: 2, email: validInput.email });

    await expect(registerUser(validInput)).rejects.toThrow('User with this email already exists');
  });

  it('should throw an error for invalid input (e.g., age < 18)', async () => {
    const invalidInput = { ...validInput, birthDate: '2010-01-01' };
    await expect(registerUser(invalidInput)).rejects.toThrow(/at least 18 years old/);
  });

  it('should throw an error if JWT_SECRET is not defined', async () => {
    delete process.env.JWT_SECRET;
    await expect(registerUser(validInput)).rejects.toThrow('JWT_SECRET is not defined');
  });
});

// --- Login Tests ---
describe('Auth Service - loginUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  const loginInput: LoginInput = {
    email: 'test@example.com',
    password: 'password123',
  };

  const mockUser = {
    id: 1,
    email: loginInput.email,
    password_hash: 'hashed_password', // Needs to match the hash bcrypt.compare will receive
    displayName: 'Test User',
    birth_date: new Date('2000-01-01'),
    created_at: new Date(),
    updated_at: new Date(),
    last_active_at: new Date(),
    // ... other fields ...
  };

  it('should login successfully with correct credentials', async () => {
    mockedPrisma.user.findUnique.mockResolvedValue(mockUser as any);
    mockedBcrypt.compare.mockResolvedValue(true); // Simulate correct password
    mockedJwt.sign.mockReturnValue('test_login_token');

    const result = await loginUser(loginInput);

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: loginInput.email } });
    expect(mockedBcrypt.compare).toHaveBeenCalledWith(loginInput.password, mockUser.password_hash);
    expect(mockedJwt.sign).toHaveBeenCalledWith(
      { userId: mockUser.id, email: mockUser.email },
      'test-secret',
      { expiresIn: '7d' }
    );
    expect(result.token).toBe('test_login_token');
    expect(result.user).toBeDefined();
    expect((result.user as any).password_hash).toBeUndefined();
    expect(result.user.email).toBe(loginInput.email);
  });

  it('should throw error for incorrect password', async () => {
    mockedPrisma.user.findUnique.mockResolvedValue(mockUser as any);
    mockedBcrypt.compare.mockResolvedValue(false); // Simulate incorrect password

    await expect(loginUser(loginInput)).rejects.toThrow('Invalid email or password');

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: loginInput.email } });
    expect(mockedBcrypt.compare).toHaveBeenCalledWith(loginInput.password, mockUser.password_hash);
    expect(mockedJwt.sign).not.toHaveBeenCalled();
  });

  it('should throw error for non-existent email', async () => {
    mockedPrisma.user.findUnique.mockResolvedValue(null); // Simulate user not found

    await expect(loginUser(loginInput)).rejects.toThrow('Invalid email or password');

    expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: loginInput.email } });
    expect(mockedBcrypt.compare).not.toHaveBeenCalled();
    expect(mockedJwt.sign).not.toHaveBeenCalled();
  });

  it('should throw error for invalid input (e.g., invalid email format)', async () => {
    const invalidInput = { email: 'not-an-email', password: 'password123' };
    await expect(loginUser(invalidInput)).rejects.toThrow(/Invalid input:/);
  });
});
