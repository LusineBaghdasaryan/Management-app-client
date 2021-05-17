import React, {useEffect, useState} from 'react';
//Redux
import * as actionTypes from "../redux/actionTypes";
import {useDispatch, useSelector} from "react-redux";
import {deleteClient, getClientById, deleteProvider, getClients, getProviders} from "../redux/actions";
//Components
import ClientModal from "./ClientModal"
import DialogModal from "./DialogModal";
import ClientsTable from "./ClientsTable";
import Loader from "react-loader-spinner";
//Bootstrap
import {Container, Row, Col} from "react-bootstrap";


function Clients() {
    
    const [showClientModal, setShowClientModal] = useState(false);
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteParameters, setDeleteParameters] = useState({title: 'Delete client ?', id: null});
    
    const dispatch = useDispatch();
    
    const {singleClient, providers, clients} = useSelector(state => state);
    
    useEffect(() => {
        !showClientModal &&
            dispatch(getClients());
            dispatch(getProviders());
        
    }, [showClientModal]);
    
    
    useEffect(() => {
        isEdit && setIsEdit(false);
        showClientModal && setShowClientModal(false)
        showDialogModal && setShowDialogModal(false)
    }, [clients]);
    
    useEffect(() => {
        !showClientModal && setIsEdit(false)
    }, [showClientModal]);
    
    useEffect(() => {
        showDialogModal && setShowDialogModal(false)
    }, [providers]);
    
    
    return (
            <>
                {showDialogModal && <DialogModal
                        question={deleteParameters.title}
                        show={showDialogModal}
                        onHide={() => setShowDialogModal(false)}
                        onRemove={() => {deleteParameters.id ?
                                dispatch(deleteProvider(deleteParameters.id))
                                : dispatch(deleteClient(singleClient?._id))
                        }}
                />}
                
                {((showClientModal && !isEdit) || (isEdit && singleClient))
                && <ClientModal
                        edit={isEdit}
                        show={showClientModal}
                        onHide={() =>
                        {setShowClientModal(false);
                        setIsEdit(false);
                            singleClient && dispatch(({type: actionTypes.GET_CLIENT_BY_ID, payload: null}));
                        }}
                        onDelete={(val, id) => {
                            setDeleteParameters({title: val, id: id});
                            setShowDialogModal(true);
                        }}
                />}
                
                
                <Container className='mt-5'>
                    <Row>
                        {!clients ? <div className='loader'>
                            <Loader
                                    type="Bars"
                                    color="#7056F1"
                                    height={80}
                                    width={80}
                            
                            />
                        </div> : !clients.length ?
                                <>
                                    <Col md={12}
                                         className='table-header p-2 d-flex justify-content-between align-items-center'>
                                        <p className='mb-0'>Clients</p>
                                        <button onClick={() => setShowClientModal(true)}>New Client</button>
                                    </Col>
                                    <p className='no-clients text-center'>No registered clients!</p>
                                </>
                                :
                                <>
                                    <Col md={12}
                                         className='table-header p-2 d-flex justify-content-between align-items-center'>
                                        <p className='mb-0'>Clients</p>
                                        <button onClick={() => setShowClientModal(true)}>New Client</button>
                                    </Col>
                                    <Col md={12} className='p-0 client-table'>
                                        <ClientsTable editClient={(id) => {
                                            dispatch(getClientById(id));
                                            setIsEdit(true);
                                            setShowClientModal(true);
                                        }}
                                                deleteClient={(id) => {
                                                    dispatch(getClientById(id));
                                                    setShowDialogModal(true);
                                                    setDeleteParameters({title: 'Delete client ?', id: null})
                                                }}
                                        />
                                    </Col>
                                </>
                        }
                        
                    </Row>
                </Container>
            </>
    );
}

export default Clients;
