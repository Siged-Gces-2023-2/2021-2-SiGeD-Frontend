import moment from 'moment-timezone';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa';
import {
  DemandDiv, SectorNameDiv, CategoriesDiv, CategoryTag, styles,
} from './Style';
import {
  DemandTitle, ProcessNumber, DemandCreatedAt, Button, Icon,
} from '../DemandData/Style';
import { DemandReport } from '../../Utils/reports/printDemandReport';
import { useProfileUser } from '../../Context';

const ClientDemandData = ({ demand, sectors, style }) => {
  const history = useHistory();
  const sectorName = sectors?.filter((sectorByID) => (sectorByID._id
    === demand.sectorHistory[demand.sectorHistory.length - 1].sectorID));
  const renderDemandCategories = () => (demand.categoryID?.map((category) => (
    <CategoryTag color={category.color}>{category.name}</CategoryTag>
  )));
  const { user, startModal } = useProfileUser();

  useEffect(() => {
  }, [sectorName]);

  return (
    <DemandDiv onClick={() => history.push(`/visualizar/${demand._id}`)} style={style}>
      <Button onClick={() => DemandReport(demand._id, user, startModal)}>
        <Icon color="#000">
          <FaPrint />
        </Icon>
      </Button>
      <DemandTitle>
        {demand.name}
      </DemandTitle>
      <SectorNameDiv>
        Setor:
        {'\t'}
        {sectorName[sectorName.length - 1]?.name}
      </SectorNameDiv>
      <div style={styles.divStyle}>
        <ProcessNumber>
          Nº de Processos:
          {'\t'}
          {demand.process.filter((p) => p !== '').length}
        </ProcessNumber>
        <DemandCreatedAt>
          { moment.parseZone(demand.updatedAt).local(true).format('DD/MM/YYYY') }
        </DemandCreatedAt>
      </div>
      <CategoriesDiv>
        {renderDemandCategories()}
      </CategoriesDiv>
    </DemandDiv>
  );
};

export default ClientDemandData;
