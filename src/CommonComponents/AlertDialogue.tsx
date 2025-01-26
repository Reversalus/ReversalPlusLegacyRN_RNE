import React, { createContext, useState, useContext, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Dialog } from '@rneui/themed';
import { COLORS } from '../Constants';

interface ButtonProps {
    title: string;
    onPress: () => void;
    color?: string;
}

interface DialogProps {
    visible: boolean;
    title: string;
    subtitle?: string;
    content?: string;
    leftButton?: ButtonProps;
    rightButton?: ButtonProps;
}

interface ToastProps {
    message?: string;
    icon?: JSX.Element;
    type?: 'success' | 'failure' | 'normal';
    position?: 'top' | 'mid' | 'bottom';
    duration?: number;
}

interface DialogContextType {
    showDialog: (props: Omit<DialogProps, 'visible'>) => void;
    closeDialog: () => void;
    showToast: (props: ToastProps) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dialogProps, setDialogProps] = useState<DialogProps | null>(null);
    const [toastProps, setToastProps] = useState<ToastProps | null>(null);
    const [toastVisible, setToastVisible] = useState(false);
    const [animValue] = useState(new Animated.Value(0));

    const showDialog = (props: Omit<DialogProps, 'visible'>) => {
        setDialogProps({ ...props, visible: true });
    };

    const closeDialog = () => {
        setDialogProps(null);
    };

    const showToast = (props: ToastProps) => {
        const defaultToastProps: ToastProps = {
            type: 'normal',
            duration: 2000,
            position: 'top',
            icon: (
                <Animated.Image
                    source={{
                        uri: 'https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg',
                    }}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />
            ),
        };

        const mergedProps = { ...defaultToastProps, ...props };
        setToastProps(mergedProps);
        setToastVisible(true);

        Animated.timing(animValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(animValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setToastVisible(false);
            });
        }, mergedProps.duration);
    };

    const getToastBackgroundColor = (type: string | undefined): string => {
        switch (type) {
            case 'success':
                return COLORS.PRIMARY_DARK_EXTRA;
            case 'failure':
                return COLORS.CRIMSRON_RED_PINK;
            case 'normal':
                return COLORS.CHARCOAL_GRAY;
            default:
                return COLORS.WHITE;
        }
    };

    return (
        <DialogContext.Provider value={{ showDialog, closeDialog, showToast }}>
            {children}
            {dialogProps && (
                <Dialog isVisible={dialogProps.visible} onBackdropPress={closeDialog}>
                    <Dialog.Title title={dialogProps.title} />
                    {dialogProps.subtitle && <Text style={{ marginBottom: 10 }}>{dialogProps.subtitle}</Text>}
                    <View>
                        {dialogProps.content && <Text>{dialogProps.content}</Text>}
                    </View>
                    <View style={styles.buttonContainer}>
                        {dialogProps.leftButton ? (
                            <View style={styles.leftButton}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: dialogProps.leftButton.color || COLORS.WHITE }]}
                                    onPress={() => {
                                        dialogProps.leftButton.onPress();
                                        closeDialog();
                                    }}
                                >
                                    <Text style={styles.buttonText}>{dialogProps.leftButton.title}</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.leftButton} />
                        )}
                        {dialogProps.rightButton ? (
                            <View style={styles.rightButton}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: dialogProps.rightButton.color || COLORS.WHITE }]}
                                    onPress={() => {
                                        dialogProps.rightButton.onPress();
                                        closeDialog();
                                    }}
                                >
                                    <Text style={styles.buttonText}>{dialogProps.rightButton.title}</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.rightButton} />
                        )}
                    </View>
                </Dialog>
            )}

            {toastVisible && toastProps && (
                <Animated.View
                    style={[
                        styles.toast,
                        {
                            opacity: animValue,
                            backgroundColor: getToastBackgroundColor(toastProps.type),
                            transform: [
                                {
                                    translateY: animValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [50, 0],
                                    }),
                                },
                            ],
                        },
                        toastProps.position === 'top'
                            ? styles.toastTop
                            : toastProps.position === 'bottom'
                            ? styles.toastBottom
                            : styles.toastMid,
                    ]}
                >
                    <View style={styles.toastContent}>
                        {toastProps.icon && <View style={styles.toastIconContainer}>{toastProps.icon}</View>}
                        <Text style={styles.toastMessage} numberOfLines={0}>
                            {toastProps.message}
                        </Text>
                    </View>
                </Animated.View>
            )}
        </DialogContext.Provider>
    );
};

export const useDialog = (): DialogContextType => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    leftButton: {
        flex: 1,
        padding: 5,
    },
    rightButton: {
        flex: 1,
        padding: 5,
    },
    button: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: COLORS.PRIMARY,
        fontSize: 16,
        fontWeight: 'bold',
    },
    toast: {
        position: 'absolute',
        padding: 10,
        borderRadius: 15,
        elevation: 10,
        width: '95%',
        alignSelf: 'center',
    },
    toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toastIconContainer: {
        marginRight: 10,
    },
    toastMessage: {
        flex: 1,
        color: COLORS.WHITE,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500'
    },
    toastTop: {
        top: 40,
    },
    toastMid: {
        top: '50%',
        marginTop: -25,
    },
    toastBottom: {
        bottom: 50,
    },
});
