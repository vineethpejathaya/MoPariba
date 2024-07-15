import {Box, Modal, Text} from 'native-base';
import {ReactNode, useState} from 'react';

const SCROLLBAR_DARK = {};
interface ModalButtonProps {
  anchor: (props: {open: () => void}) => ReactNode;
  content: (props: {close: () => void}) => ReactNode;
  title?: string;
  dialogProps?: Omit<React.ComponentProps<typeof Modal>, 'isOpen'>;
  onDialogClose?: () => void;
}

function ModalButton({
  content,
  title,
  dialogProps,
  onDialogClose,
  anchor,
}: ModalButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    onDialogClose && onDialogClose();
    setShowModal(false);
  };

  const onOpen = () => {
    setShowModal(true);
  };

  return (
    <>
      {anchor({
        open: onOpen,
      })}
      <CustomDialog
        open={showModal}
        content={content}
        dialogProps={dialogProps}
        onClose={onClose}
        title={title}
      />
    </>
  );
}
export default ModalButton;

interface CustomDialogProps {
  content: (props: {close: () => void}) => ReactNode;
  title?: string;
  onClose: () => void;
  open: boolean;
  dialogProps?: Omit<React.ComponentProps<typeof Modal>, 'isOpen'>;
}

export const CustomDialog = ({
  onClose,
  dialogProps,
  title,
  content,
  open,
}: CustomDialogProps) => {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      {...dialogProps}
      size="full"
      justifyContent="flex-end"
      bottom="0">
      <Modal.Content maxWidth="400px" borderRadius="10px">
        {title && (
          <Modal.Header>
            <Text variant={'subheader1'}> {title}</Text>
          </Modal.Header>
        )}
        <Modal.Body>
          <StyledDialogContent>{content({close: onClose})}</StyledDialogContent>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const StyledDialogContent = ({children}: {children: ReactNode}) => (
  <Box width="100%" maxHeight={500} overflow="scroll" {...SCROLLBAR_DARK}>
    {children}
  </Box>
);
