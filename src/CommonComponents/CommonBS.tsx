import React, { useEffect, useRef, useMemo, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  Animated, 
  TouchableWithoutFeedback, 
  TouchableOpacity 
} from 'react-native';
import { Icon } from '@rneui/themed'; 
import { COLORS } from '../Constants';
import useResponsiveDimensions from '../Hooks/useResponsiveDimensions';

interface CommonBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCrossIcon?: boolean;
  onCrossIcon?: () => void;
  showLeftIcon?: boolean
  onLeftIconPress?: () => void;
  headerText?: string;
  headerView?: React.ReactNode;
  height?: number;
}

const CommonBS: React.FC<CommonBottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  showCrossIcon = true,
  onCrossIcon,
  headerText,
  headerView,
  height = 300,
  showLeftIcon = false,
  onLeftIconPress
}) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const [showSheet, setShowSheet] = useState(isVisible);
  const {
    getResponsiveDimension,
    getResponsiveHeight,
    getResponsiveWidth,
    isWeb,
  } = useResponsiveDimensions();

  const styles = useMemo(
    () =>
      generateStyles({
        getResponsiveDimension,
        getResponsiveHeight,
        getResponsiveWidth,
        isWeb,
      }),
    [getResponsiveDimension, getResponsiveHeight, getResponsiveWidth, isWeb],
  );

  useEffect(() => {
    if (isVisible) {
      setShowSheet(true); // Show sheet before animation starts
      Animated.timing(translateY, {
        toValue: 0,
        duration: 550,
        easing: (t) => t * (2 - t), // Smooth ease-out effect
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 200,
        easing: (t) => t * (2 - t),
        useNativeDriver: true,
      }).start(() => setShowSheet(false)); // Hide sheet after animation
    }
  }, [isVisible]);

  const renderBottomSheet = useMemo(() => {
    if (!showSheet) return null;
    return (
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View 
              style={[styles.bottomSheet, { height, transform: [{ translateY }] }]}
            >
              {/* Sticky Header */}
              <View style={styles.headerWrapper}>
                {headerView}
                <TouchableOpacity onPress={onLeftIconPress}>
                  <Icon 
                    name="close" 
                    type="ionicon" 
                    color={showLeftIcon ? COLORS.BLACK : COLORS.SHADE_WHITE} 
                    containerStyle={styles.closeButton} 
                  />
                </TouchableOpacity>
                {headerText && <Text style={styles.modalHeaderText}>{headerText}</Text>}
                {showCrossIcon && (
                  <TouchableOpacity onPress={onCrossIcon || onClose}>
                    <Icon 
                      name="close" 
                      type="ionicon" 
                      color={COLORS.BLACK} 
                      containerStyle={styles.closeButton} 
                    />
                  </TouchableOpacity>
                )}
              </View>

              {/* Scrollable Content */}
              <ScrollView style={styles.scrollView} contentContainerStyle={[styles.contentContainer, styles.scrollViewContent]}>
                {children}
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }, [showSheet, translateY, children, isVisible]);

  return renderBottomSheet;
};

const generateStyles = ({
    getResponsiveDimension,
    getResponsiveHeight,
    getResponsiveWidth,
    isWeb,
  }: any) =>
    StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    borderTopLeftRadius: getResponsiveDimension(15,10),
    borderTopRightRadius: getResponsiveDimension(15,10),
    elevation: 5,
    overflow: 'hidden',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: getResponsiveDimension(15,10),
    backgroundColor: COLORS.SHADE_WHITE,
    borderTopLeftRadius: getResponsiveDimension(15,10),
    borderTopRightRadius: getResponsiveDimension(15,10),
  },
  modalHeaderText: {
    fontSize: getResponsiveDimension(16,12),
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: getResponsiveDimension(10,8),
  },
  contentContainer: {
    padding: getResponsiveDimension(10,8),
    backgroundColor: COLORS.WHITE,
    flexGrow: 1, 
  },
  scrollView: {
    flex: 1, 
  },
  scrollViewContent: {
    paddingTop: getResponsiveDimension(15,10),
    flex: 1,
    flexDirection: 'column',
  }
});

export default CommonBS;