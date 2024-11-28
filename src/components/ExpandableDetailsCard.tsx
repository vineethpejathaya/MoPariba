import {Box, Divider, HStack, Pressable, Text, VStack} from 'native-base';
import React, {ReactNode, useEffect, useState} from 'react';
import {LayoutAnimation, Platform, StyleSheet, UIManager} from 'react-native';
import theme from '../themes/theme';

interface ExpandableDetailsCardProps {
  title: string;
  children: ReactNode;
  keepExpanded?: boolean;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ExpandableDetailsCard({
  title,
  keepExpanded = false,
  children,
}: ExpandableDetailsCardProps) {
  const [isExpanded, setIsExpanded] = useState(keepExpanded);

  const toggleDetails = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setIsExpanded(keepExpanded);
  }, [keepExpanded]);

  return (
    <Box style={styles.container}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="md" fontWeight="bold">
          {title}
        </Text>
        <Pressable onPress={toggleDetails}>
          <Text fontSize="sm" color="blue.500" fontWeight="bold">
            {isExpanded ? 'Show Less' : 'Show More'}
          </Text>
        </Pressable>
      </HStack>
      <Divider my={3} />
      {isExpanded && <VStack space={2}>{children}</VStack>}
    </Box>
  );
}

export default ExpandableDetailsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
