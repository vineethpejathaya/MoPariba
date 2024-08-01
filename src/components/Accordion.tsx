import {Box, Collapse, Divider, HStack, IconButton} from 'native-base';
import {ReactNode, useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import {ExpandMore} from '../assets/icons/Icons';
import theme from '../themes/theme';

interface AccordionProps {
  content: ReactNode;
  summary: ReactNode;
  startIcon?: ReactNode;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
}
function Accordion({
  content,
  summary,
  startIcon,
  leftAction,
  rightAction,
}: AccordionProps) {
  const [isExpanded, setExpand] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const animatedIconStyle = {
    transform: [{rotate}],
  };

  const handleToggle = () => {
    setExpand(!isExpanded);
  };

  return (
    <>
      <Box style={styles.mainContainer}>
        {leftAction && <Box style={styles.leftActions}>{leftAction}</Box>}
        {rightAction && <Box style={styles.rightActions}>{rightAction}</Box>}
        <AccordionSummary
          icon={
            <Animated.View style={animatedIconStyle}>
              <ExpandMore />
            </Animated.View>
          }
          isExpanded={isExpanded}
          onPress={handleToggle}
          startIcon={startIcon}>
          {summary}
        </AccordionSummary>
        <AccordionContent isOpen={isExpanded}>{content}</AccordionContent>
      </Box>
    </>
  );
}

export default Accordion;

interface AccordionSummaryProp {
  children: ReactNode;
  icon: JSX.Element;
  isExpanded: boolean;
  onPress: () => void;
  startIcon: ReactNode;
}

const AccordionSummary = ({
  children,
  icon,
  onPress,
  isExpanded,
  startIcon,
}: AccordionSummaryProp) => {
  return (
    <>
      <Box style={styles.header}>
        <HStack alignItems={'center'} space={2}>
          {startIcon && startIcon}
          <Box>{children}</Box>
        </HStack>
        <IconButton onPress={onPress} icon={icon} />
      </Box>
      {isExpanded && (
        <Divider
          style={{marginVertical: 20, borderColor: theme.colors.gray[30]}}
        />
      )}
    </>
  );
};

interface AccordionContent {
  children: ReactNode;
  isOpen: boolean;
}

const AccordionContent = ({children, isOpen}: AccordionContent) => {
  return (
    <>
      <Collapse isOpen={isOpen}>
        <Box style={styles.content}>{children}</Box>
      </Collapse>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    paddingVertical: 22,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  content: {
    padding: 10,
    backgroundColor: theme.colors.white,
  },

  leftActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  rightActions: {
    position: 'absolute',
    top: 10,
    right: 5,
    zIndex: 1,
  },
  defaultText: {
    fontSize: 10,
    color: theme.colors.primary[900],
  },
});
