import { getPublicPath } from '../utils/paths.js';

export const PROJECTS = [
  {
    num: '01',
    title: 'Booqi - Sistema de Gestión de Reservas de Eventos',
    images: [
      getPublicPath('/proyectos/booqui-images/BOOQI001.png'),
      getPublicPath('/proyectos/booqui-images/BOOQI002.png'),
      getPublicPath('/proyectos/booqui-images/BOOQI003.png'),
      getPublicPath('/proyectos/booqui-images/BOOQI004.png'),
      getPublicPath('/proyectos/booqui-images/BOOQI005.png'),
      getPublicPath('/proyectos/booqui-images/BOOQI006.png')
    ],
    desc: 'Sistema de gestión de reservas de eventos desarrollado con arquitectura de microservicios, que permite a los usuarios explorar eventos, realizar reservas y gestionar pagos de manera eficiente.',
    badges: ['Java', 'Spring Boot', 'Docker', 'MySQL', 'Microservicios', 'React'],
    demo: '#',
    repo: 'https://github.com/RenzoRamosDEV/Booqui'
  },
  {
    num: '02',
    title: 'Sistema de Gestión de Inventario de Productos',
    images: [
      getPublicPath('/proyectos/inventario-imagenes/001INVENTARIO.png'),
      getPublicPath('/proyectos/inventario-imagenes/002INVENTARIO.png'),
      getPublicPath('/proyectos/inventario-imagenes/003INVENTARIO.png')
    ],
    desc: 'Sistema de gestión de inventario de prodcutos, que permite a los usuarios gestionar sus productos de manera eficiente',
    badges: ['Java', 'Spring Boot', 'Docker', 'MySQL', 'React', 'Claude Design'],
    demo: '#',
    repo: 'https://github.com/RenzoRamosDEV/Inventario'
  }
];
