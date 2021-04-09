import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import ListadoClientes from "../../components/clientes/ListadoClientes";
import toastr from "toastr";
import axios from "axios";
import { ip } from '../../config/config'

const listado = () => {
  const [list, guardarList] = useState(null);

  const traerClientes = async () => {
    await axios
      .get(`${ip}api/clientes/listado`)
      .then((res) => {
        guardarList(res.data);
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
