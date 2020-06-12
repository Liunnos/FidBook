import JsBarcode from 'jsbarcode';

export const renderBarcode = (codenumber) => {
  JsBarcode('#barcode', codenumber, {
    format: 'EAN13',
  });
};
