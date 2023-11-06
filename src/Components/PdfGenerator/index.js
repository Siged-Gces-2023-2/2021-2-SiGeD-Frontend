import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const generatePatrimonyPDF = (patrimonios) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const documentStyles = {
    header: {
      fontSize: 20,
      bold: true,
      alignment: 'center',
    },
    subheader: {
      color: 'black',
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
        { text: '--------------------------------------------------------------------------------------------------------------------------------------------------' },
        { text: '\n' },
      ]),
    ],
    styles: documentStyles,
  };
  pdfMake.createPdf(documentDefinition).print();
  return (null);
};

export default generatePatrimonyPDF;
