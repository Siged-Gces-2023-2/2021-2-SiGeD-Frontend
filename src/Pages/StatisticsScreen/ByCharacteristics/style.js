import React from 'react';
import Select from 'react-select';
import {
  DropdownDiv, TextLabel, styles, customStyles,
} from '../Style';
import colors from '../../../Constants/colors';
import DropdownComponent from '../../../Components/DropdownComponent';
import Dropdown from '../utils/Dropdown';

export default function StatisctsFilters({
  setActive,
  setClientID,
  setFeatureActive,
  setSectorActive,
  setFinalDate,
  features,
  sectors,
  clientList,
  initialDate,
  setInitialDate,
  finalDate,
}) {
  return (
    <>
      <DropdownDiv>
        <TextLabel>
          Demandas:
        </TextLabel>
        <DropdownComponent
          OnChangeFunction={(Option) => setActive(Option.target.value)}
          style={styles.dropdownComponentStyle}
          optionStyle={{
            backgroundColor: `${colors.secondary}`,
          }}
          optionList={['Todas', 'Ativas', 'Inativas']}
        />
      </DropdownDiv>
      <DropdownDiv>
        <TextLabel>
          Cliente:
        </TextLabel>
        <div style={{ display: 'flex', width: '100%' }}>
          <Select
            onChange={(e) => setClientID(e.value)}
            defaultValue={null}
            options={clientList}
            styles={customStyles}
            placeholder="Nome do cliente"
          />
        </div>
      </DropdownDiv>
      <DropdownDiv>
        <TextLabel>
          Caracteristica:
        </TextLabel>
        <div style={{ display: 'flex', width: '100%' }}>
          <Select
            onChange={(e) => setFeatureActive(e.value)}
            defaultValue="Todas"
            options={features.map((feature) => ({
              value: feature.name || feature,
              label: feature.name || feature,
            }))}
            styles={customStyles}
            placeholder="Nome da caracteristica"
          />
        </div>
      </DropdownDiv>
      <DropdownDiv>
        <TextLabel>
          Setor:
        </TextLabel>
        <div style={{ display: 'flex', width: '100%' }}>
          <Select
            onChange={(e) => setSectorActive(e.value)}
            defaultValue="Todos"
            options={sectors.map((sector) => ({
              value: sector.name || sector,
              label: sector.name || sector,
            }))}
            styles={customStyles}
            placeholder="Nome do setor"
          />
        </div>
      </DropdownDiv>
      <Dropdown
        initialDate={initialDate}
        setInitialDate={setInitialDate}
        finalDate={finalDate}
        setFinalDate={setFinalDate}
      />
    </>
  );
}
