declare module 'react-leaflet-markercluster' {
  import { Component } from 'react';
  import { MarkerClusterGroupOptions } from 'leaflet.markercluster';

  interface MarkerClusterGroupProps extends MarkerClusterGroupOptions {
    children?: React.ReactNode;
    [key: string]: any;
  }

  export default class MarkerClusterGroup extends Component<MarkerClusterGroupProps> {}
} 