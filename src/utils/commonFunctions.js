import toast from 'react-hot-toast';
import _ from 'lodash';
import { IconCircleX } from '@tabler/icons-react';

export const handleErrorMessage = (err) => {
  console.log('err', err);
  const dismissToast = () => {
    toast.dismiss();
  };

  const CustomToast = ({ message }) => (
    <div className="custom_toast_css">
      <IconCircleX color="red" onClick={dismissToast} />
      <span className="ms-2">{message}</span>
    </div>
  );
  if (
    err.response &&
    err.response.data &&
    (err.response.data.success === false || err.response.data.status !== 200) &&
    err.response.data.message
  ) {
    toast.custom((t) => <CustomToast message={err.response.data.message} />, {
      duration: 1000,
      position: 'top-right',
    });
  } else {
    toast.custom((t) => <CustomToast message={err.message} />, {
      duration: 1000,
      position: 'top-right',
    });
  }
};
