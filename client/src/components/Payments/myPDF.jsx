import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fdf0d5",
    padding: "20px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    border: "1px solid black",
  },
  order: {
    margin: "10px 0",
    fontSize: "30px",
  },
  title: {
    margin: "10px 0",
    fontSize: "24px",
    textDecoration: "underline",
  },
  subtitle: {
    marginBottom: "25px",
  },
  subtitle_total: {
    margin: "20px 0",
  },
});

const myPDF = ({ orderNumber, cart, total_Price }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.order}>Nro Orden: {orderNumber}</Text>
        <Text style={styles.title}>COMPRA REALIZADA CON ÉXITO</Text>
        <Text style={styles.subtitle}>
          Su compra fue realizada con éxito, su pedido detallado es:
        </Text>
        <View style={styles.content}>
          {cart.map((item, index) => (
            <Text
              key={index}
            >{`Producto: ${item.name} - Cantidad: ${item.quantity} x $${item.price}u`}</Text>
          ))}
        </View>
        <Text style={styles.subtitle_total}>Su total es: {total_Price}$</Text>
        <Text></Text>
      </View>
    </Page>
  </Document>
);

export default myPDF;
