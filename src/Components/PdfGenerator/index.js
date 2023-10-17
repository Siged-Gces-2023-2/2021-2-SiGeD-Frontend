import * as pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';

const generatePatrimonyPDF = (patrimonios) => {
  const documentstyles = {
    header: {
      fontSize: 30,
      bold: true,
      alignment: 'center',
    },
    subTitle: {
      fontSize: 22,
      bold: true,
      alignment: 'center',
      decoration: 'underline',
    },
    filterTitle: {
      fontSize: 16,
    },
    filterStyle: {
      alignment: 'left',
    },
    dateStyle: {
      alignment: 'right',
    },
    leftAlign: {
      alignment: 'left',
    },
    title: {
      bold: true,
    },
    demandTitle: {
      fontSize: 16,
      marginTop: 30,
      bold: true,
    },
    important: {
      color: '#FF0000',
    },
    subTitleLeft: {
      fontSize: 14,
      bold: true,
      alignment: 'center',
    },
    sessionStyle: {
      background: '#ccc',
    },
    tableTitle: {
      bold: true,
      alignment: 'center',
    },
    tableLeftInfo: {
      alignment: 'center',
    },
    defaultStyle: {
      alignment: 'justify',
    },
  };

  const documentDefinition = {
    content: [
      { text: 'Lista de Patrimônios', style: 'header' },
      { text: '\n' },

      // Loop pelos patrimônios
      ...patrimonios.map((patrimonio) => [
        { text: `Nome: ${patrimonio.name}`, style: 'subheader' },
        { text: `Descrição: ${patrimonio.description}` },
        { text: '------------------------' },
        { text: '\n' },
      ]),
    ],
  };

  pdfMake.createPdf(documentDefinition.content, documentstyles).print();
  return (null);
};

export default generatePatrimonyPDF;
