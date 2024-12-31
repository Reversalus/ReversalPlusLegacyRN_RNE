/**
 * DeepLinks.ts
 *
 * This file contains the centralized configuration for all the deep links used in the application.
 * Each deep link follows a specific format and is associated with a screen in the application.
 *
 * Format:
 * reversalplus://ScreenName=<screenName>&&Params={key:value,key:value}
 *
 * Example:
 * - reversalplus://ScreenName=intro
 * - reversalplus://ScreenName=login&&Params={'userId':'123','token':'abc'}
 *
 * Usage:
 * - Import and use the predefined deep links for navigation within the app.
 * - These constants ensure consistency across the app and help manage the deep link structure.
 */

export const DeepLinks = {
    INTRO: 'reversalplus://ScreenName=intro',
    LOGIN: 'reversalplus://ScreenName=login',
    DASHBOARD: 'reversalplus://ScreenName=dashboard',
};
