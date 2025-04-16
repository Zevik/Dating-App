/**
 * Utility functions for geographic calculations
 */

/**
 * Calculate the distance between two geographic coordinates using the Haversine formula
 * 
 * @param lat1 Latitude of first point in degrees
 * @param lon1 Longitude of first point in degrees
 * @param lat2 Latitude of second point in degrees
 * @param lon2 Longitude of second point in degrees
 * @returns Distance in kilometers
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  // If any of the coordinates are null or undefined, return a large distance
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
    return Number.MAX_SAFE_INTEGER;
  }

  // Earth radius in kilometers
  const earthRadius = 6371;
  
  // Convert latitude and longitude from degrees to radians
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  // Haversine formula
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = earthRadius * c;
  
  return distance;
}

/**
 * Convert degrees to radians
 * 
 * @param degrees Value in degrees
 * @returns Value in radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Check if the distance between two coordinates is within a given radius
 * 
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @param maxDistanceKm Maximum distance in kilometers
 * @returns True if distance is within maxDistanceKm
 */
export function isWithinDistance(
  lat1: number | null | undefined,
  lon1: number | null | undefined,
  lat2: number | null | undefined,
  lon2: number | null | undefined,
  maxDistanceKm: number
): boolean {
  // If any coordinates are missing, treat as not within distance
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
    return false;
  }
  
  const distance = calculateDistance(lat1, lon1, lat2, lon2);
  return distance <= maxDistanceKm;
} 