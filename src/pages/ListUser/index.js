import { Table } from 'react-bootstrap';
import Title from '../../components/Title';

function ListUser() {
    return (
        <>
            <Title title={'Danh sách user trong đơn vị'} />
            <Table striped style={{ minHeight: '200px', minWidth: '100px', overflowX: 'scroll' }}>
                <thead>
                    <tr>
                        <td>STT</td>
                        <td>Tên </td>
                        <td>Email</td>
                        <td>Chức vụ</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Văn Hoàng Phúc</td>
                        <td>vhp01@localhost.com</td>
                        <td>director</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Văn Hoàng Phúc 02</td>
                        <td>vhp02@localhost.com</td>
                        <td>officer</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default ListUser;
