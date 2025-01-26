import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageUtils = {
  /**
   * Save data to AsyncStorage
   * @param {string} key - The key under which the data will be stored.
   * @param {any} value - The data to store, automatically stringified if not already a string.
   * @returns {Promise<void>}
   */
  async saveData(key: string, value: any): Promise<void> {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
      console.log(`Data saved successfully with key: ${key}`);
    } catch (error) {
      console.error(`Error saving data with key: ${key}`, error);
    }
  },

  /**
   * Retrieve data from AsyncStorage
   * @param {string} key - The key of the data to retrieve.
   * @returns {Promise<any>} - The parsed data if it is in JSON format, or raw string otherwise.
   */
  async getData(key: string): Promise<any> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error retrieving data with key: ${key}`, error);
      return null;
    }
  },

  /**
   * Update data in AsyncStorage
   * @param {string} key - The key of the data to update.
   * @param {any} newValue - The new data to store, automatically merged with the existing value if it's an object.
   * @returns {Promise<void>}
   */
  async updateData(key: string, newValue: any): Promise<void> {
    try {
      const existingValue = await this.getData(key);
      const updatedValue = existingValue && typeof existingValue === 'object' && typeof newValue === 'object'
        ? { ...existingValue, ...newValue }
        : newValue;
      await this.saveData(key, updatedValue);
      console.log(`Data updated successfully with key: ${key}`);
    } catch (error) {
      console.error(`Error updating data with key: ${key}`, error);
    }
  },

  /**
   * Delete data from AsyncStorage
   * @param {string} key - The key of the data to delete.
   * @returns {Promise<void>}
   */
  async deleteData(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Data deleted successfully with key: ${key}`);
    } catch (error) {
      console.error(`Error deleting data with key: ${key}`, error);
    }
  },
};

export default AsyncStorageUtils;
