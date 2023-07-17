import {EPath} from '../../enums/EPath';
import {useGetNavigationQuery} from '../../redux/catalogApi';
import {allNames} from './allNames';

const getName = (name: string): string | undefined => {
  const {data, isSuccess} = useGetNavigationQuery();

  let crumb;
  const path = name.split('/');

  // if (path.includes(EPath.Shop.slice(1)) && +path.slice(-1) >= 0) {
  //   const item = catalog.products.find((el) => el.id === +path[2])?.name;

  //   if (item) {
  //     crumb = item.charAt(0).toUpperCase() + item.slice(1);
  //   } else {
  //     crumb = 'Самый лучший';
  //   }
  // } else
  if (path.includes(EPath.AdminMessages.split('/')[1]!) && +path.slice(-1) >= 0) {
    crumb = `Сообщение №${path.slice(-1)}`;
  } else if (path.includes(EPath.AdminOrders.split('/')[1]!) && +path.slice(-1) >= 0) {
    crumb = `Заказ №${path.slice(-1)}`;
  } else if (path.includes(EPath.Industries.slice(1)) && +path.slice(-1) >= 0) {
    crumb = isSuccess ? data.industries.find((el) => el.id === +path[2])?.name : '';

    if (path.length === 4) {
      crumb = isSuccess ? data.subIndustries.find((el) => el.id === +path[3])?.name : '';
    }
  } else if (path.includes(EPath.SolutionsItem.split('/')[1]) && +path.slice(-1) >= 0) {
    crumb = isSuccess ? data.solutions.find((el) => el.id === +path[2])?.name : '';
  } else {
    crumb = allNames[name];
  }

  return crumb;
};

export default getName;
