import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDemands } from '../../Services/Axios/demandsServices';
import ViewDemandSidebar from '../../Components/ViewDemandSidebar';
import ViewDemandCard from '../../Components/ViewDemandCard';
import SectorDropdown from '../../Components/SectorDropdown';
import { Main, CardsContainer } from './Style';
import { getClients } from '../../Services/Axios/clientServices';
import { getUser } from '../../Services/Axios/userServices';

const ViewDemandsScreen = () => {
  const [client, setClient] = useState('');
  const [demand, setDemand] = useState('');
  const [user, setUser] = useState('');
  const { id } = useParams();

  const getDemandApi = async () => {
    await getDemands(`demand/${id}`)
      .then((response) => setDemand(response.data));
  };

  const getClientApi = async () => {
    await getClients(`clients/${demand.clientID}`)
      .then((response) => setClient(response.data));
  };

  const getUserApi = async () => {
    await getUser(`users/${demand.userID}`)
      .then((response) => { setUser(response.data); });
  };

  useEffect(() => {
    if (demand) {
      getClientApi();
      getUserApi();
    } else {
      getDemandApi();
    }
  }, [demand]);

  return (
    <>
      { demand && client && user
      && (
      <Main>
        <CardsContainer>
          <ViewDemandCard
            demand={demand}
          />
        </CardsContainer>
        <ViewDemandSidebar clientName={client.name} userName={user.name}>
          <div style={{ width: '100%' }}>
            <SectorDropdown />
          </div>
        </ViewDemandSidebar>
      </Main>
      )}
    </>
  );
};

export default ViewDemandsScreen;
