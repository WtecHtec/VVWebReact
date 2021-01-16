import React, { Component } from "react";
import Loadable from 'react-loadable';
import Loading from '@/components/loadingcom/loadingcom.js';

const loadable = ( loader) => {
  
   return  Loadable({
    loader,
    loading() {
      return Loading()
  },
  });
};
export default loadable;