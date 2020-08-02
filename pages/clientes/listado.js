import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import ListadoClientes from "../../components/clientes/ListadoClientes";
import toastr from "toastr";
import axios from "axios";

const listado = () => {
  const [list, guardarList] = useState(null);

  const traerClientes = async () => {
    await axios
      .get("http://192.168.1.102:5010/api/clientes/listado")
      .then((res) => {
        guardarList(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    traerClientes();
  }, []);

  return (
    <Layout>
      <ListadoClientes list={list} />
    </Layout>
  );
};

export default listado;
