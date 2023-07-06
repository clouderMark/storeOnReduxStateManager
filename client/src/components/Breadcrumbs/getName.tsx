import {EPath} from '../../enums/EPath';
import {useGetIndustriesQuery, useGetSolutionsQuery, useGetSubIndustriesQuery} from '../../redux/catalogApi';
import {allNames} from './allNames';

const getName = (name: string): string | undefined => {
  const {data: industriesData, isSuccess: successIndustries} = useGetIndustriesQuery();
  const {data: subIndustriesData, isSuccess: successSubIndustries} = useGetSubIndustriesQuery();
  const {data: solutionsData, isSuccess: successSolutions} = useGetSolutionsQuery();

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
    // EPath.AdminMessages.split('/').at(-1)!
    crumb = `Сообщение №${path.slice(-1)}`;
  } else if (path.includes(EPath.AdminOrders.split('/')[1]!) && +path.slice(-1) >= 0) {
    // EPath.AdminOrders.split('/').at(-1)!
    crumb = `Заказ №${path.slice(-1)}`;
  } else if (path.includes(EPath.Industries.slice(1)) && +path.slice(-1) >= 0) {
    crumb = successIndustries ? industriesData.find((el) => el.id === +path[2])?.name : '';

    if (path.length === 4) {
      crumb = successSubIndustries ? subIndustriesData.find((el) => el.id === +path[3])?.name : '';
    }
  } else if (path.includes(EPath.SolutionsItem.split('/')[1]) && +path.slice(-1) >= 0) {
    crumb = successSolutions ? solutionsData.find((el) => el.id === +path[2])?.name : '';
  } else {
    crumb = allNames[name];
  }

  return crumb;
};

export default getName;
