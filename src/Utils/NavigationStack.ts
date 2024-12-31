import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for storing navigation stack
const NAV_STACK_KEY = 'NAVIGATION_STACK';

// Push screen to stack
export const pushScreen = async (screenName: string) => {
    try {
        const stack = await getNavigationStack();
        stack.push(screenName);
        await AsyncStorage.setItem(NAV_STACK_KEY, JSON.stringify(stack));
    } catch (error) {
        console.error('Error pushing screen to stack:', error);
    }
};

// Pop screen from stack
export const popScreen = async (): Promise<string | null> => {
    try {
        const stack = await getNavigationStack();
        if (stack.length > 1) {
            stack.pop();
            await AsyncStorage.setItem(NAV_STACK_KEY, JSON.stringify(stack));
            return stack[stack.length - 1];
        }
        return null;
    } catch (error) {
        console.error('Error popping screen from stack:', error);
        return null;
    }
};

// Peek at the current screen (top of stack)
export const getCurrentScreen = async (): Promise<string | null> => {
    try {
        const stack = await getNavigationStack();
        return stack.length > 0 ? stack[stack.length - 1] : null;
    } catch (error) {
        console.error('Error getting current screen:', error);
        return null;
    }
};

// Clear the entire navigation stack
export const clearNavigationStack = async () => {
    try {
        await AsyncStorage.removeItem(NAV_STACK_KEY);
    } catch (error) {
        console.error('Error clearing navigation stack:', error);
    }
};

// Get the full navigation stack
const getNavigationStack = async (): Promise<string[]> => {
    try {
        const stack = await AsyncStorage.getItem(NAV_STACK_KEY);
        return stack ? JSON.parse(stack) : [];
    } catch (error) {
        console.error('Error retrieving navigation stack:', error);
        return [];
    }
};
