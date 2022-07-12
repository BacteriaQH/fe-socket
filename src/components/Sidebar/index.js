import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hasChildren } from './utils';
import { menu } from './menu';
import Button from '../Button';
import Role from '../Role';

const Sidebar = ({ user }) => {
    return (
        <SidebarMenu>
            <SidebarMenu.Header>
                <Role user={user} />
            </SidebarMenu.Header>
            <SidebarMenu.Body>
                {menu.map((subMenu, index) => (
                    <MenuItem item={subMenu} key={index} />
                ))}
            </SidebarMenu.Body>
        </SidebarMenu>
    );
};
const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component items={item} />;
};
const SingleLevel = ({ items }) => {
    return (
        <SidebarMenu.Nav.Link as={Button} to={items.to}>
            <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={items.icon} />
            </SidebarMenu.Nav.Icon>{' '}
            <SidebarMenu.Nav.Title>{items.title}</SidebarMenu.Nav.Title>
        </SidebarMenu.Nav.Link>
    );
};

const MultiLevel = ({ items }) => {
    return (
        <SidebarMenu.Sub>
            <SidebarMenu.Sub.Toggle className="btn">
                <SidebarMenu.Nav.Icon>
                    <FontAwesomeIcon icon={items.icon} />
                </SidebarMenu.Nav.Icon>{' '}
                <SidebarMenu.Nav.Title>{items.title}</SidebarMenu.Nav.Title>
            </SidebarMenu.Sub.Toggle>
            <SidebarMenu.Sub.Collapse>
                {items.items.map((item, index) => (
                    <SidebarMenu.Nav key={index}>
                        <SidebarMenu.Nav.Link as={Button} to={item.to}>
                            <SidebarMenu.Nav.Icon>
                                <FontAwesomeIcon icon={item.icon} />
                            </SidebarMenu.Nav.Icon>{' '}
                            <SidebarMenu.Nav.Title>{item.title}</SidebarMenu.Nav.Title>
                        </SidebarMenu.Nav.Link>
                    </SidebarMenu.Nav>
                ))}
            </SidebarMenu.Sub.Collapse>
        </SidebarMenu.Sub>
    );
};
export default Sidebar;
