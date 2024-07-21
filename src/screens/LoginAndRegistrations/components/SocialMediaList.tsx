import {IconButton, Stack} from 'native-base';
import {StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

function SocialMediaList() {
  return (
    <>
      <Stack direction={'row'} space={4} style={{margin: 'auto'}}>
        <IconButton
          icon={<FontAwesomeIcon name="facebook" size={35} color="white" />}
          style={[iconStyle.style, {backgroundColor: '#395998'}]}
        />
        <IconButton
          icon={<FontAwesomeIcon name="twitter" size={35} color="white" />}
          style={[iconStyle.style, {backgroundColor: '#169CE8'}]}
        />
        <IconButton
          icon={<FontAwesomeIcon name="apple" size={35} color="white" />}
          style={[iconStyle.style, {backgroundColor: '#1B1F2F'}]}
        />
      </Stack>
    </>
  );
}

export default SocialMediaList;

const iconStyle = StyleSheet.create({
  style: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 62,
    height: 62,
    borderRadius: 100,
  },
});
