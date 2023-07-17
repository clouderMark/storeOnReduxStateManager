import {useEffect, useState} from 'react';
import {Typography} from '@mui/material';
import {EPath} from '../../enums/EPath';
import {useGetNavigationQuery} from '../../redux/catalogApi';
import {allNames} from './allNames';

interface IProps {
  name: string;
}

const Name = (props: IProps): JSX.Element => {
  const {name} = props;
  const {data, isSuccess} = useGetNavigationQuery();
  const [crumb, setCrumb] = useState<string>();
  const path = name.split('/');

  // if (path.includes(EPath.Shop.slice(1)) && +path.slice(-1) >= 0) {
  //   const item = catalog.products.find((el) => el.id === +path[2])?.name;

  //   if (item) {
  //     crumb = item.charAt(0).toUpperCase() + item.slice(1);
  //   } else {
  //     crumb = 'Самый лучший';
  //   }
  // } else
  useEffect(() => {
    setCrumb(() => {
      let result;

      if (path.includes(EPath.AdminMessages.split('/')[1]!) && +path.slice(-1) >= 0) {
        result = `Сообщение №${path.slice(-1)}`;
      } else if (path.includes(EPath.AdminOrders.split('/')[1]!) && +path.slice(-1) >= 0) {
        result = `Заказ №${path.slice(-1)}`;
      } else if (path.includes(EPath.Industries.slice(1)) && +path.slice(-1) >= 0) {
        result = isSuccess ? data.industries.find((el) => el.id === +path[2])?.name : '';

        if (path.length === 4) {
          result = isSuccess ? data.subIndustries.find((el) => el.id === +path[3])?.name : '';
        }
      } else if (path.includes(EPath.SolutionsItem.split('/')[1]) && +path.slice(-1) >= 0) {
        result = isSuccess ? data.solutions.find((el) => el.id === +path[2])?.name : '';
      } else {
        result = allNames[name];
      }

      return result;
    });
  }, []);

  return <Typography component="span">{crumb}</Typography>;
};

export default Name;
