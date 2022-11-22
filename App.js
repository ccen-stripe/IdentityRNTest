/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useCallback } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  useStripeIdentity,
  IdentityVerificationSheetOptions,
} from '@stripe/stripe-identity-react-native';

import logo from './assets/RocketRides.png';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [options, setOptions] = useState<VerificationSessionOptions>({
    requireMatchingSelfie: false,
    requireIdNumber: false,
    allowedTypes: {
      ['driving_license']: true,
      ['id_card']: true,
      ['passport']: true,
    },
    requireLiveCapture: false,
  });

  const fetchOptions = useCallback(async () => {
    return {
      sessionId: 'vs_1M73GDGMZYGNxJkBXchPkSD1',
      ephemeralKeySecret: 'ek_live_YWNjdF8xSDM0ZFhHTVpZR054SmtCLHRJc21CVEJYVDl5Y1lMNnpTVnBlVmhidVVLcVhyUlM_00uOuclWPR',
      brandLogo: Image.resolveAssetSource(logo),
    };
  }, [options]);

  const { status, present, loading } = useStripeIdentity(fetchOptions);

  const handlePress = useCallback(() => {
    present();
  }, [present]);

  const renderButton = useCallback(() => {
    if (loading) {
      return (
        <View testID="loading-spinner">
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <Button
        testID="verify-btn"
        title="Verify Identity"
        onPress={handlePress}
      />
    );
  }, [loading, handlePress]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
            <View style={styles.buttonContainer}>{renderButton()}</View>
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
