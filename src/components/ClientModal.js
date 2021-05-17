import React, {useEffect, useState} from 'react';
//Redux
import {useDispatch, useSelector} from "react-redux";
import {addClient, addProvider, updateClient, updateProvider} from "../redux/actions";
//For validation
import {useForm} from 'react-hook-form';
import {emailPattern, phonePattern} from "../utils/validation.util";
//Bootstrap
import {Card, Modal, InputGroup, FormControl, Form} from "react-bootstrap";


function ClientModal({onHide, show, edit, onDelete}) {
    const dispatch = useDispatch();
    const {providers, singleClient} = useSelector(state => state);

    //useForm for validation
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: edit ? singleClient?.name : '',
            email: edit ? singleClient?.email : '',
            phone: edit ? singleClient?.phone : '',
        }
    });


    const singleClientProviders = singleClient?.providers.map(item => item._id);

    const [providerValue, setProviderValue] = useState('');
    const [providerValueForEdit, setProviderValueForEdit] = useState('');
    const [editProvider, setEditProvider] = useState(null);

    useEffect(() => {
        setProviderValue('');
    }, [providers]);
    
    const handleChange = (event) => {
        setProviderValue(event.target.value);
    }

    const handleChangeForProviderEdit = (event) => {
        setProviderValueForEdit(event.target.value);
    }

    const editClient = (value, id) => {
        let {name, phone, providers, email} = value;
        if (phone === singleClient?.phone && email === singleClient?.email) {
            dispatch(updateClient({name, providers}, id));
        }
        else if (email === singleClient?.email) {
            dispatch(updateClient({name, phone, providers}, id));
        }
        else if (phone === singleClient?.phone) {
            dispatch(updateClient({name, email, providers}, id));
        }
        else {
            dispatch(updateClient(value, id));
        }
    }

    if (!providers || (edit && !singleClient)) return null;

    return (
            <>
                <Modal  show={show}
                        onHide={onHide}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter modal-title">
                            {edit ? 'Edit Client' : 'New Client'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <InputGroup>
                                <InputGroup.Prepend className='pre-input'>
                                    <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                        {...register("name", {required: true})}
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        placeholder='e.g. John Doe'
                                        maxLength='30'
                                />
                            </InputGroup>
                            {errors.name && <p className='error-text text-center'>Name is required!</p>}
                            <InputGroup className='mt-3'>
                                <InputGroup.Prepend className='pre-input'>
                                    <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                        {...register("email", {
                                            required: true,
                                            pattern: emailPattern
                                        })}
                                        aria-label="Email"
                                        aria-describedby="basic-addon1"
                                        placeholder='e.g. address@example.ext'
                                        maxLength='35'

                                />
                            </InputGroup>
                            {errors.email && errors.email.type === 'required' &&
                            <p className='error-text text-center'>Email address is required!</p>}
                            {errors.email && errors.email.type === 'pattern' &&
                            <p className='error-text text-center'>Please enter a valid email address!</p>}
                            <InputGroup className='mt-3'>
                                <InputGroup.Prepend className='pre-input'>
                                    <InputGroup.Text id="basic-addon1">Phone</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                        {...register("phone", {required: true, pattern: phonePattern})}
                                        aria-label="Phone"
                                        aria-describedby="basic-addon1"
                                        type='text'
                                        placeholder='e.g. +374XXXXXXXX'
                                        maxLength='12'
                                        onInput={e => e.target.value = e.target.value.replace(/[^+\d]/g, '')}
                                />
                            </InputGroup>
                            {errors.phone && errors.phone.type === 'required' &&
                            <p className='error-text text-center'>Phone number is required!</p>}
                            {errors.phone && errors.phone.type === 'pattern' &&
                            <p className='error-text text-center'>Please enter a valid phone number!</p>}
                            <InputGroup className='mt-3'>
                                <InputGroup.Prepend className='pre-input'>
                                    <InputGroup.Text id="basic-addon1">Providers</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                        value={providerValue}
                                        onChange={handleChange}
                                        aria-label="Providers"
                                        aria-describedby="basic-addon1"
                                        maxLength='15'
                                />
                                <button className='add-provider-btn' onClick={(event) => {
                                    event.preventDefault()
                                    providerValue &&
                                    dispatch(addProvider(providerValue));
                                }} disabled={!providerValue}>Add Provider</button>
                            </InputGroup>
                        </Form>
                        <Card className={providers.length ? 'mx-auto border-top-0 providers-list' : 'd-none'}>
                            {!!providers.length && providers.map(provider => {
                                return (
                                        <div className='d-flex align-items-center justify-content-around'
                                             key={provider._id}>
                                            <Form inline>
                                                <Form.Check
                                                        defaultChecked={singleClientProviders?.includes(provider._id)}
                                                        {...register("providers")}
                                                        value={provider._id}
                                                        type="checkbox"
                                                        className="my-1 mr-sm-2"
                                                        disabled={provider._id === editProvider}
                                                />
                                            </Form>
                                            <input type="text" defaultValue={provider.name}
                                                   maxLength='15'
                                                   onChange={handleChangeForProviderEdit}
                                                   disabled={!(provider._id === editProvider) }/>
                                            <div>

                                                {editProvider && provider._id === editProvider ?
                                                        <>
                                                            <button className='edit-icon' onClick={() => {
                                                                (providerValueForEdit !== provider.name && providerValueForEdit) &&
                                                                dispatch(updateProvider(providerValueForEdit, provider._id));
                                                                setEditProvider(null);
                                                            }}>
                                                                <i className="fa fa-check-square"/>
                                                            </button>
                                                            <button className='delete-icon' onClick={() => {
                                                                setEditProvider(null)
                                                            }}>
                                                                <i className="fa fa-window-close"/>
                                                            </button>
                                                        </>
                                                        : <>
                                                            <button className='edit-icon' onClick={() => {
                                                                setEditProvider(provider._id)
                                                            }}>
                                                                <i className="fa fa-edit"/>
                                                            </button>
                                                            <button className='delete-icon'
                                                                    onClick={() => {
                                                                        onDelete('Delete provider ?', provider._id);
                                                                    }}
                                                            >
                                                                <i className="fa fa-trash"/>
                                                            </button>
                                                        </>
                                                }

                                            </div>
                                        </div>
                                )
                            })}
                        </Card>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-between'>
                        <div>
                            {edit && <button onClick={() => {
                                onDelete('Delete client ?', null);
                            }} className='delete-btn'>
                                Delete Client
                            </button>}
                        </div>
                        <div>
                            <button onClick={onHide} className='cancel-btn'>Cancel</button>
                            <button onClick={handleSubmit((value) => edit ? editClient(value, singleClient?._id) : dispatch(addClient(value)))}
                                    className='add-client-btn'>
                                {edit ? 'Save Client' : 'Add Client'}
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </>
    );
}

export default ClientModal;



