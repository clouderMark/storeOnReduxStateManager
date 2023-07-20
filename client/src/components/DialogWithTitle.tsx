import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import {selectDialogWithTitle, setShow} from '../redux/dialogWithTitleSlice';
import {useAppDispatch, useAppSelector} from '../redux/hooks';

interface IProps {
  child: JSX.Element;
}

const DialogWithTitle = (props: IProps) => {
  const {child} = props;
  const {title} = useAppSelector(selectDialogWithTitle);
  const dispatch = useAppDispatch();

  return (
    <Dialog open={Boolean(title)} onClose={() => dispatch(setShow(''))} PaperProps={{sx: {minWidth: '94%'}}}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{child}</DialogContent>
    </Dialog>
  );
};

export default DialogWithTitle;
