import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
  useToast,
} from 'native-base';
import {InterfaceAlertProps} from 'native-base/lib/typescript/components/composites/Alert/types';

export type ToastAlertProps = {
  id: any;
  status: string;
  isClosable?: boolean;
  title?: string;
  description?: string;
} & InterfaceAlertProps;

const ToastAlert = ({
  id,
  status,
  variant,
  title,
  description,
  isClosable = false,
  ...rest
}: ToastAlertProps) => {
  const toast = useToast();
  return (
    <>
      <Alert
        style={{width: 350}}
        alignSelf="center"
        flexDirection="row"
        status={status ? status : 'info'}
        variant={variant}
        {...rest}>
        <VStack space={1} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            alignItems="center"
            justifyContent="space-between">
            {title && (
              <HStack space={2} flexShrink={1} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  flexShrink={1}
                  color={
                    variant === 'solid'
                      ? 'lightText'
                      : variant !== 'outline'
                      ? 'darkText'
                      : null
                  }>
                  {title}
                </Text>
              </HStack>
            )}

            {isClosable ? (
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: variant === 'solid' ? 'lightText' : 'darkText',
                }}
                onPress={() => toast.close(id)}
              />
            ) : null}
          </HStack>
          {description && (
            <Text
              px="6"
              color={
                variant === 'solid'
                  ? 'lightText'
                  : variant !== 'outline'
                  ? 'darkText'
                  : null
              }>
              {description}
            </Text>
          )}
        </VStack>
      </Alert>
    </>
  );
};

export default ToastAlert;
