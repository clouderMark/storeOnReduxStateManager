import {Container} from '@mui/material';
import EditIndustry from '../../components/EditIndustry/EditIndustry';
import IndustriesTable from '../../components/IndustriesTable';

const AdminIndustries = () => (
  <>
    <Container maxWidth={false}>
      <IndustriesTable />
    </Container>
    <EditIndustry />
  </>
);

export default AdminIndustries;
