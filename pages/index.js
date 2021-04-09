import Axios from "axios";
import React, { useEffect, useState } from "react";
import ServiciosSinAbonar from "../components/home/ServiciosSinAbonar";
import Layout from "../components/layouts/Layout";
import axios from 'axios'
import { ip } from '../config/config'

const index = () => {

  const [servicios, guardarServicios] = useState(null);


  useEffect(() => {
    traerServiciosSinPagar()

  }, []);


  const traerServiciosSinPagar = async () => {
    await axios.get(`${ip}api/servicios/listadosinpagar`)
      .then(res => {
        guardarServicios(res.data)

      })
      .catch(error => {
        console.log(error)
      })
  }



  return <Layout>
    <ServiciosSinAbonar listado={servicios} />
  </Layout>;
};

export default index;
