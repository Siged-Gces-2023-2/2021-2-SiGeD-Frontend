import React, { useEffect, useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import {
  Cell, ResponsiveContainer, Tooltip,
  BarChart, CartesianGrid, XAxis, Bar, YAxis,
} from 'recharts';
import moment from 'moment';
import { getClientByDemands } from '../../../Services/Axios/demandsServices';
import {
  Main, Title, Container, Card, TopDiv, MiddleDiv,
  FiltersDiv, SearchDiv, Button,
} from '../Style';
import { getSectors } from '../../../Services/Axios/sectorServices';
import { useProfileUser } from '../../../Context';
import { getClients, getFeatures } from '../../../Services/Axios/clientServices';
import activeClient from '../utils/alternateClient';
import { DemandStatisticsFeature } from '../../../Utils/reports/printDemandReport';
import StatisctsFilters from './style';

const StatisticScreen = () => {
  const { token, user, startModal } = useProfileUser();
  const [sectors, setSectors] = useState(['Todos']);
  const [sectorActive, setSectorActive] = useState('Todos');
  const [sectorID, setSectorID] = useState('');
  const [featureID, setFeatureID] = useState('');
  const [features, setFeatures] = useState(['Todas']);
  const [featureActive, setFeatureActive] = useState('Todas');
  const [initialDate, setInitialDate] = useState(moment('2021-01-01').format('YYYY-MM-DD'));
  const [finalDate, setFinalDate] = useState(moment().format('YYYY-MM-DD'));
  const [clientID, setClientID] = useState(null);
  const [clientList, setClientList] = useState([]);
  const [active, setActive] = useState('Todas');
  const [query, setQuery] = useState('all');
  const [clientGraphData, setClientGraphData] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);

  const getSectorsFromApi = async () => {
    await getSectors(startModal)
      .then((response) => {
        setSectors([...sectors, ...response.data]);
      });
  };

  const getClientsFromApi = async () => {
    await getClients(`clients?active=${null}`, startModal)
      .then((response) => {
        const clientSelectArray = activeClient(response.data).map((client) => (
          {
            name: client.name,
            _id: client._id,
            features: client.features,
          }));
        setClientList(clientSelectArray);
      });
  };

  const getFeaturesFromApi = async () => {
    await getFeatures('features', startModal)
      .then((response) => {
        const allFeatures = ['Todas', ...response.data];
        setFeatures(allFeatures);
      })
      .catch((error) => {
        console.error(`An unexpected error ocurred while getting features.${error}`);
      });
  };

  useEffect(() => {
    if (featureActive !== 'Todas') {
      const results = features.find((element) => element.name === featureActive);
      setFeatureID(results._id);
    } else {
      setFeatureID(null);
    }
  }, [featureActive]);

  useEffect(() => {
    if (active === 'Inativas') {
      setQuery(false);
    } else if (active === 'Ativas') {
      setQuery(true);
    } else {
      setQuery(null);
    }
  }, [active]);

  useEffect(() => {
    if (sectorActive !== 'Todos') {
      const results = sectors.find((element) => element.name === sectorActive);
      setSectorID(results._id);
    } else {
      setSectorID(null);
    }
  }, [sectorActive]);

  const getFeaturesStatistics = async (idFeature) => {
    const clientsGraph = [];
    const featureTotals = []; // Objeto para rastrear os totais das features

    await getClientByDemands(
      `statistic/feature?isDemandActive=${query}&idSector=${sectorID}&idFeature=${idFeature}&initialDate=${initialDate}&finalDate=${finalDate}&idClients=${clientID}`,
      startModal,
    ).then((response) => {
      response.data?.map((item) => {
        clientList.map((client) => {
          if (item._id === client?._id) {
            client.features.map((feature) => {
              const nomeFeature = features.find((element) => element._id === feature)?.name;
              const colorFeature = features.find((element) => element._id === feature)?.color;

              if ((idFeature != null && idFeature === feature) || (featureActive === 'Todas')) {
                if (nomeFeature) {
                  if (!featureTotals[nomeFeature]) {
                    featureTotals[nomeFeature] = {
                      name: nomeFeature,
                      total: 0,
                      features: client.features,
                      color: colorFeature,
                    };
                  }
                  featureTotals[nomeFeature].total += item.demandas;
                }
              }
              return true;
            });
          }
          return true;
        });
        return true;
      });
      // Converte o objeto em um array
      clientsGraph.push(...Object.values(featureTotals));
      setClientGraphData(clientsGraph);
    });
  };

  useEffect(() => {
    if (user && token) {
      getClientsFromApi();
      getSectorsFromApi();
      getFeaturesFromApi();
    }
  }, [token, user]);

  useEffect(() => {
    getFeaturesStatistics(featureID);
  }, [query, sectorID, featureID, finalDate, initialDate, clientID]);

  useEffect(() => {
    if (clientList.length > 0) {
      getFeaturesStatistics(null);
    }
    const clientsOptionsArr = clientList.map((client) => ({
      value: client._id,
      label: client.name,
    }));
    clientsOptionsArr.unshift({
      value: null,
      label: 'Todos',
    });
    setClientOptions(clientsOptionsArr);
  }, [clientList]);

  return (
    <Main>
      { user ? (
        <Container>
          <TopDiv>
            <Title>Estatísticas - Demandas por Caracteristica</Title>
            <FiltersDiv>
              <SearchDiv>
                <StatisctsFilters
                  setActive={setActive}
                  setClientID={setClientID}
                  setFeatureActive={setFeatureActive}
                  setSectorActive={setSectorActive}
                  features={features}
                  sectors={sectors}
                  clientList={clientOptions}
                  initialDate={initialDate}
                  setInitialDate={setInitialDate}
                  setFinalDate={setFinalDate}
                  finalDate={finalDate}
                />
              </SearchDiv>
            </FiltersDiv>
            {
              clientGraphData.length > 0
              && (
                <div style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-end',
                  margin: '10px 0',
                }}>
                  <Button onClick={() => DemandStatisticsFeature({
                    statisticsData: clientGraphData,
                    active,
                    featureActive,
                    initialDate,
                    sectorActive,
                    clientID,
                    finalDate,
                    startModal,
                    reportType: 'FEATURE',
                  })}>
                    Baixar relatório
                    <BsDownload />
                  </Button>
                </div>
              )
            }
          </TopDiv>
          <MiddleDiv>
            <Card>
              <ResponsiveContainer height="80%" width="100%">
                <BarChart
                  data={clientGraphData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 2,
                    bottom: 40,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" hide />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total">
                    {clientGraphData?.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="legenda">
                {clientGraphData.map((entry, index) => (
                  <div
                    key={`cell-${index}`}
                    style={{
                      display: 'flex', alignItems: 'center', margin: '0px 4px', fontSize: '1.5rem',
                    }}>
                    <div style={{ width: '20px', height: '10px', backgroundColor: entry.color }} />
                    <span style={{ margin: '0px 5px' }}>{entry.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </MiddleDiv>
        </Container>
      ) : <h1>Carregando...</h1> }
    </Main>
  );
};

export default StatisticScreen;
