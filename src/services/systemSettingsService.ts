import { SystemSetting } from '../generated/prisma';
import prisma from '../lib/prisma';
import { ApiError } from '../errors/ApiError';

// Default settings with their types
export type DefaultSettings = {
  minAge: number;
  maxAge: number;
  defaultMaxDistance: number;
  defaultCallDurationSeconds: number;
  defaultVideoCallDurationSeconds: number;
  matchInactivityTimeoutDays: number;
  appMaintenanceMode: boolean;
  enableEmailVerification: boolean;
  maxProfilePhotos: number;
};

// Default system settings
const DEFAULT_SETTINGS: DefaultSettings = {
  minAge: 18,
  maxAge: 100,
  defaultMaxDistance: 50,
  defaultCallDurationSeconds: 300,
  defaultVideoCallDurationSeconds: 300,
  matchInactivityTimeoutDays: 14,
  appMaintenanceMode: false,
  enableEmailVerification: true,
  maxProfilePhotos: 6,
};

/**
 * Get all system settings
 */
export const getSystemSettings = async (): Promise<DefaultSettings> => {
  try {
    const settingsRecord = await prisma.systemSetting.findUnique({
      where: { key: 'app_settings' },
    });

    if (!settingsRecord) {
      // If no settings exist, create default settings
      await prisma.systemSetting.create({
        data: {
          key: 'app_settings',
          value: DEFAULT_SETTINGS,
        },
      });
      return DEFAULT_SETTINGS;
    }

    return settingsRecord.value as DefaultSettings;
  } catch (error) {
    console.error('Error fetching system settings:', error);
    throw new ApiError(500, 'Failed to fetch system settings');
  }
};

/**
 * Update system settings
 */
export const updateSystemSettings = async (newSettings: Partial<DefaultSettings>): Promise<DefaultSettings> => {
  try {
    const currentSettings = await getSystemSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };

    const result = await prisma.systemSetting.upsert({
      where: { key: 'app_settings' },
      update: { value: updatedSettings },
      create: {
        key: 'app_settings',
        value: updatedSettings,
      },
    });

    return result.value as DefaultSettings;
  } catch (error) {
    console.error('Error updating system settings:', error);
    throw new ApiError(500, 'Failed to update system settings');
  }
}; 