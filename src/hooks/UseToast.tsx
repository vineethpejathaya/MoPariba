import {Toast} from 'native-base';
import {useCallback} from 'react';
import CustomToast from '../components/CustomToast';

const useToast = () => {
  const showErrorToast = useCallback((description: string, title?: string) => {
    Toast.show({
      render: () => (
        <CustomToast title={title} description={description} status={'error'} />
      ),
      placement: 'top',
    });
  }, []);

  const showSuccessToast = useCallback((title: string, description: string) => {
    Toast.show({
      render: () => (
        <CustomToast
          title={title}
          description={description}
          status={'success'}
        />
      ),
      placement: 'top',
    });
  }, []);

  const showWarningToast = useCallback((title: string, description: string) => {
    Toast.show({
      render: () => (
        <CustomToast
          title={title}
          description={description}
          status={'warning'}
        />
      ),
      placement: 'top-right',
    });
  }, []);

  const showInfoToast = useCallback((title: string, description: string) => {
    Toast.show({
      render: () => (
        <CustomToast title={title} description={description} status={'info'} />
      ),
      placement: 'top-right',
    });
  }, []);

  return {showErrorToast, showWarningToast, showSuccessToast, showInfoToast};
};

export default useToast;
