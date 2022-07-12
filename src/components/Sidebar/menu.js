import { faHouse, faUserGraduate, faBook, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';

export const menu = [
    {
        icon: faHouse,
        title: 'Trang Chủ',
        to: '/',
        items: [],
    },
    {
        icon: faUserGraduate,
        title: 'Quản lý đơn vị',
        items: [
            // {
            //     title: 'Thêm user',
            //     icon: faBook,
            //     to: '/unit/add-user',
            // },
            // {
            //     title: 'Thêm đơn vị',
            //     icon: faBook,
            //     to: '/unit/add-unit',
            // },
            // {
            //     title: 'User trong đơn vị',
            //     icon: faBook,
            //     to: '/unit/list-user',
            // },
            {
                title: 'Danh sách file',
                icon: faChalkboardTeacher,
                to: '/unit/list-file',
            },
        ],
    },
];
