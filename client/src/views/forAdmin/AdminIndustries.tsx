import {Button, Container} from '@mui/material';
import {areaCells} from '../../components/TableCells/cells';
import {Board} from '../../components/Board';
import TableCells from '../../components/TableCells/TableCells';
import {useGetNavigationQuery} from '../../redux/catalogApi';
import {useAppDispatch} from '../../redux/hooks';
import IndustryRow from '../../components/IndustryRow';
import EditIndustry from '../../components/EditIndustry/EditIndustry';
import {setShow} from '../../redux/dialogWithTitleSlice';

const AdminIndustries = () => {
  const dispatch = useAppDispatch();
  const {data, isSuccess} = useGetNavigationQuery();

  const handleCreateClick = () => {
    dispatch(setShow({title: 'Создание индустрии'}));
  };

  return (
    <>
      <Container maxWidth={false}>
        <Button variant="outlined" onClick={handleCreateClick} sx={{mt: 3}}>
          Создать индустрию
        </Button>
        {isSuccess ? (
          <Board
            tableHeadCells={<TableCells cells={areaCells} />}
            tableBodyCells={
              <>
                {data.industries.map((row) => (
                  <IndustryRow key={row.id} id={row.id} name={row.name} />
                ))}
              </>
            }
          />
        ) : null}
      </Container>
      <EditIndustry />
    </>
  );
};

export default AdminIndustries;
