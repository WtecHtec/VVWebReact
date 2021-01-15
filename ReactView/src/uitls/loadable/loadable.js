import React, { Component } from "react";
import Loadable from 'react-loadable';

const Loading = function(props) {
    console('Loading:', props)
    return <div>Loading...</div>
}
const loadable = ({ loader, loading: Loading }) => {
   console.log('loader', loader)
   return  Loadable({
    loader,
   Loading
  });
};
export default loadable;