import {useNavigation} from '@react-navigation/native';
import {Box, StatusBar, Text, theme} from 'native-base';
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
      <Box style={{flex: 1, backgroundColor: '#121223'}}>
        <ImageBackground
          source={require('../../../assets/images/pngs/LoginBackground.png')}
          style={Styles.backgroundImage}>
          <StatusBar hidden />
          {!disableBackBtn && (
            <CustomIconButton
              BtnStyles={Styles.backBtn}
              iconName={'chevron-left'}
              iconSize={25}
              onPress={() => navigation.goBack()}
            />
          )}
          <Box style={Styles.header}>
            <Text variant={'heading2'} style={Styles.title}>
              {title}
            </Text>
            <Text variant={'title2'} style={Styles.subTitle}>
              {subTitle}
            </Text>
          </Box>
          <Box style={Styles.footer}>{children}</Box>
        </ImageBackground>
      </Box>
    </>
  );
}

export default LoginScreenTemplate;

export const Styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    height: Dimensions.get('window').height * 0.3,
  },
  backgroundImage: {
    resizeMode: 'contain',
    height: Dimensions.get('window').height * 0.4,
  },
  title: {
    color: theme.colors.white,
  },
  subTitle: {
    color: theme.colors.white,
    lineHeight: 26,
  },

  footer: {
    height: Dimensions.get('window').height * 0.7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 30,
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
