import React, { Component } from 'react';
import ComponentMenuAdmin from '../components/Admin/compMenuAdmin';
import FormProfile from '../components/Admin/compFormProfile';

const Profile: React.FC = () => {
    return (
    <>
        <ComponentMenuAdmin pageName="Cadastro de Profile" />,
        <FormProfile/>
    </>
    );
}

export default Profile;