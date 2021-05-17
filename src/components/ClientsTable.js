import React from 'react';
//Redux
import {useSelector} from "react-redux";
//Bootstrap
import {Table} from "react-bootstrap";

function ClientsTable({editClient, deleteClient}) {
    
    const {clients} = useSelector(state => state);
    
    
    return (
            <>
                <Table striped bordered hover className='text-center'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Providers</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody className='client-table'>
                    {!!clients.length && clients.map(client => {
                        const providers = client.providers.length
                                ? client.providers.map(item => item.name).join(',')
                                : '';
                        return (
                                <tr key={client._id}>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone}</td>
                                    <td>{providers}</td>
                                    <td className='d-flex align-items-center justify-content-center'>
                                        <button className='edit-icon'
                                                onClick={() => editClient(client._id)}
                                        >
                                            <i className="fa fa-edit"/>
                                        </button>
                                        <button className='delete-icon'
                                                onClick={() => deleteClient(client._id)}>
                                            <i className="fa fa-trash"/>
                                        </button>
                                    </td>
                                </tr>
                        )
                    })}
                    </tbody>
                </Table>
            
            </>
    );
}

export default ClientsTable;
