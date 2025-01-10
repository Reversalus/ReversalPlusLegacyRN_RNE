import React, { useState, useCallback } from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { COLORS, DeepLinks, LottieUrl } from '../../../Constants';
import LottieView from 'lottie-react-native';
import { handleDeepLinkNavigation, ScaleSize } from '../../../Utils';

interface GetStartedIntroModalWebProps {
  isVisible: boolean;
  onClose: () => void;
}

const GetStartedIntroModalWeb: React.FC<GetStartedIntroModalWebProps> = ({ isVisible, onClose }) => {
  const [activePage, setActivePage] = useState(0);

  const onCloseAction = useCallback(() => {
    setActivePage(0);
    onClose();
  }, [onClose]);

  const pages = [
    {
      title: 'Your Health, Our Priority',
      description: 'We put your well-being first with expert advice and personalized care.',
      animationUrl: LottieUrl.PREVENTIVE_HEALTH_CARE,
    },
    {
      title: 'Track Your Health Journey',
      description: 'Monitor your progress and achieve your wellness goals with ease.',
      animationUrl: LottieUrl.ANALYSIS_DIGITAL_MARKETING,
    },
    {
      title: 'Expert Care Anytime, Anywhere',
      description: 'Get advice from certified professionals without stepping outside your door.',
      animationUrl: LottieUrl.BUSINESS_TEAM,
    },
    {
      title: 'Get Medicines by Experts Recommendation',
      description: 'Get Medicine from certified professionals without stepping outside your door.',
      animationUrl: LottieUrl.ONLINE_DELIVERY_SERVICE_1,
    },
  ];

  if (!isVisible) return null;

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onCloseAction}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.slideContainer}>
              {pages.map(
                (page, index) =>
                  index === activePage && (
                    <View key={index} style={styles.slide}>
                      <LottieView source={{ uri: page.animationUrl }} autoPlay loop />
                      <View style={styles.content}>
                        <Text style={styles.title}>{page.title}</Text>
                        <Text style={styles.description}>{page.description}</Text>
                        <Text style={styles.pageCounter}>{`${index + 1}/${pages.length}`}</Text>
                      </View>
                    </View>
                  )
              )}
            </View>
            <View style={styles.paginationContainer}>
              {activePage === 0 ? (
                <Button buttonStyle={{ backgroundColor: COLORS.WHITE }} />
              ) : (
                <Button
                  title="Previous"
                  onPress={() => setActivePage((prev) => Math.max(prev - 1, 0))}
                  buttonStyle={styles.paginationButton}
                />
              )}
              {activePage === pages.length - 1 ? (
                <Button
                  title="Get Started"
                  onPress={() => {
                    onCloseAction();
                    handleDeepLinkNavigation.navigate(DeepLinks.LOGIN);
                  }}
                  buttonStyle={styles.getStartedButton}
                />
              ) : (
                <Button
                  title="Next"
                  onPress={() => setActivePage((prev) => Math.min(prev + 1, pages.length - 1))}
                  buttonStyle={styles.nextButton}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  modalContainer: {
    width: '50%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: '20%',
    justifyContent: 'center',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: ScaleSize(20),
  },
  slide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    textAlign: 'center',
    marginTop: ScaleSize(10),
  },
  title: {
    fontSize: ScaleSize(16),
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  description: {
    fontSize: ScaleSize(12),
    color: 'gray',
    marginTop: ScaleSize(5),
    alignSelf: 'center',
  },
  pageCounter: {
    fontSize: ScaleSize(10),
    color: 'gray',
    marginTop: ScaleSize(5),
    alignSelf: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: ScaleSize(10),
    paddingVertical: ScaleSize(10),
  },
  paginationButton: {
    borderWidth: 1,
    borderColor: COLORS.BLUE,
    borderRadius: ScaleSize(20),
    padding: ScaleSize(5),
  },
  getStartedButton: {
    backgroundColor: COLORS.PRIMARY_DARK_EXTRA,
    borderRadius: ScaleSize(20),
    padding: ScaleSize(5),
  },
  nextButton: {
    backgroundColor: COLORS.PINK_DARK,
    borderRadius: ScaleSize(15),
    paddingHorizontal: ScaleSize(15),
    alignSelf: 'flex-end',
  },
});

export { GetStartedIntroModalWeb };