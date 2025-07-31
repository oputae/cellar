import 'leaflet';

declare module 'leaflet' {
  namespace control {
    function fullscreen(options?: {
      position?: string;
      title?: {
        'false': string;
        'true': string;
      };
    }): Control;
  }
} 