import {useNavigation} from '@react-navigation/native';
import {Box, ScrollView, StatusBar, Text, theme} from 'native-base';
import {ReactNode} from 'react';
import {Dimensions, ImageBackground, StyleSheet} from 'react-native';
import CustomIconButton from '../../../components/Buttons/IconButton';

function LoginScreenTemplate({
  title,
  subTitle,
  children,
  disableBackBtn = false,
}: {
  title: string;
  subTitle: string;
  children: ReactNode;
  disableBackBtn?: boolean;
}) {
  const navigation = useNavigation();
  return (
    <>
      <Box style={styles.container}>
        <ImageBackground
          source={require('../../../assets/images/pngs/LoginBackground.png')}
          style={styles.backgroundImage}>
          <StatusBar hidden />
          {!disableBackBtn && (
            <CustomIconButton
              BtnStyles={styles.backBtn}
              iconName={'chevron-left'}
              iconSize={25}
              onPress={() => navigation.goBack()}
            />
          )}
          <Box style={styles.header}>
            <Text variant={'heading2'} style={styles.title}>
              {title}
            </Text>
            <Text variant={'subTitle2'} fontSize={'xl'} style={styles.subTitle}>
              {subTitle}
            </Text>
          </Box>

          <Box style={styles.footer}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          </Box>
        </ImageBackground>
      </Box>
    </>
  );
}

export default LoginScreenTemplate;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121223',
  },

  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
    height: Dimensions.get('window').height * 0.25,
  },
  backgroundImage: {
    objectFit: 'contain',
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
  },
  title: {
    color: theme.colors.white,
    fontFamily: 'Sen-Bold',
  },
  subTitle: {
    color: theme.colors.white,
    lineHeight: 26,
    fontFamily: 'Sen-Regular',
    textAlign: 'center',
  },

  footer: {
    height: Dimensions.get('window').height * 0.75,
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 25,
  },

  backBtn: {
    position: 'absolute',
    width: 45,
    height: 45,
    left: 30,
    top: 40,
    borderRadius: 50,
    backgroundColor: theme.colors.white,
  },
});
